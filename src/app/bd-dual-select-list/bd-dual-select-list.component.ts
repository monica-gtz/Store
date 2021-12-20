import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { sortBy, forEach } from 'lodash';
import {
  BDSelectListOptions,
  BDSelectListItem,
  BDSelectListFilterOptions,
  ItemMoveEventData
} from './bd-select-list.models';

@Component({
  selector: 'bd-dual-select-list',
  templateUrl: 'bd-dual-select-list.component.html',
  styleUrls: ['bd-dual-select-list.component.css']
})
export class BdDualSelectListComponent implements OnChanges {
  @Input() public allItems: BDSelectListItem[] = [];
  @Input() public selectedItemsSource: BDSelectListItem[] = [];
  @Input('availableOptions') public availableOpts: BDSelectListOptions = {};
  @Input('selectedOptions') public selectedOpts: BDSelectListOptions = {};
  @Input() public selectedLimitReached: boolean;
  @Input() public maintainOrder: boolean = false;
  @Input() public disabledTitleText: string;
  @Input() public containerHeight: number;
  @Input() public lookupFieldInternalColumn: string;
  @Input() public disabled: boolean;
  @Output() public onSelectedChange: EventEmitter<BDSelectListItem[]> = new EventEmitter<BDSelectListItem[]>();

  public availableItems: BDSelectListItem[] = [];
  public selectedItems: BDSelectListItem[] = [];
  public availableMoveAllEnabled: boolean = true;
  public selectedMoveAllEnabled: boolean = true;

  private _defaultFilterOptions: BDSelectListFilterOptions;
  private _defaultAvailableOptions: BDSelectListOptions;
  private _defaultSelectedOptions: BDSelectListOptions;

  constructor() {
    this._defaultFilterOptions = {
      enableFilter: true,
      filterDebounce: 150,
      placeholderText: "si holaaa aa"
    };
    this._defaultAvailableOptions = {
      moveOptions: {
        headerTitle: 'Common_AvailableItems escoge aqui todos',
        moveAllButtonTemplate: '<span class="bdicon-arrow-forward"></span> <span style="background-color:green;">si holaaaaaaaa</span><span class="bdicon-arrow-forward"></span>',
        moveAllButtonTitleText: 'Common_AddAllItems todos los items',
        moveItemButtonClasses: ['bdicon-arrow-forward']
      },
      filterOptions: this._defaultFilterOptions
    };
    this._defaultSelectedOptions = {
      moveOptions: {
        headerTitle: 'Common_SelectedItems selecionados todos',
        moveAllButtonTemplate: '<span class="bdicon-arrow-forward osvi"></span> <span style="background-color:green;">si hola arrow</span><span class="bdicon-arrow-forward"></span>',
        moveAllButtonTitleText: 'Common_RemoveAllItems remover tpdps items',
        moveItemButtonClasses: ['bdicon-arrow-back']
      },
      filterOptions: this._defaultFilterOptions
    };
  }

  public ngOnChanges(changes: SimpleChanges): void {
    /** for each property of `current`, fill in missing sub-properties from `defaults` */
    let fillInDefaults = (current: {}, defaults: {}) => {
      Object.keys(current).forEach(key => {
        current[key] = Object.assign(defaults[key], current[key]);
      });
    };

    if (changes['allItems']) {
      this.buildListItems();
    }
    if (changes['selectedItemsSource']) {
      this.buildListItems();
    }
    if (changes['availableOpts'] && this.availableOpts) {
      fillInDefaults(this.availableOpts, this._defaultAvailableOptions);
    }
    if (changes['selectedOpts'] && this.selectedOpts) {
      fillInDefaults(this.selectedOpts, this._defaultSelectedOptions);
    }
  }

  public buildListItems(): void {
    let newAvailableItems = this.allItems.map<BDSelectListItem>(
      group => ({ ...group, subItems: group.subItems.slice() })
    );

    if (this.maintainOrder) {
      this.selectedItemsSource.forEach(selectedItem => {
        newAvailableItems.forEach(availableGroup => {
          if (availableGroup.subItems && availableGroup.subItems.length) {
            let matchingAvailableItem = availableGroup.subItems.find(arrayItem => arrayItem.identifier === selectedItem.identifier);
            if (matchingAvailableItem) {
              this.removeListItem(newAvailableItems, matchingAvailableItem); // Remove the selected item
            }
          }
        });
      });
    } else {
      this.selectedItemsSource.forEach(selectedGroup => {
        let matchingAvailableGroup = newAvailableItems.find(arrayItem => arrayItem.identifier === selectedGroup.identifier);
        if (matchingAvailableGroup) {
          if (matchingAvailableGroup.subItems.length === selectedGroup.subItems.length) { // The entire group is selected...
            this.removeListItem(newAvailableItems, selectedGroup); // Remove the group
            selectedGroup.showSubItems = true;
          }
          else {
            selectedGroup.subItems.forEach(item => {
              this.removeListItem(newAvailableItems, item); // Remove the selected items
            });
          }
        }
      });
    }

    // Resort the lists
    this.availableItems = this.sortList(newAvailableItems);
    this.selectedItems = this.maintainOrder ? this.selectedItemsSource : this.sortList(this.selectedItemsSource);
  }


  public onAllItemsMove_AvailableList(selectedItems: BDSelectListItem[]): void {

    for (let index = selectedItems.length - 1; index >= 0; index--) {
      let item = selectedItems[index];
      item.showSubItems = false;
      this.moveItem(item, null, this.availableItems, this.selectedItems, (movedItem, destinationList) => false);
    }

    // Resort the lists
    this.availableItems = this.sortList(this.availableItems);
    this.selectedItems = this.maintainOrder ? this.selectedItems : this.sortList(this.selectedItems);

    this.onSelectedChange.emit(this.selectedItems);
  }

  public onItemMove_AvailableList(eventData: ItemMoveEventData): void {
    if (eventData.selectedItem.isGroup) {
      eventData.selectedItem.showSubItems = false;
    }


    this.moveItem(eventData.selectedItem, eventData.parentItem, this.availableItems, this.selectedItems,
      (movedItem, destinationList) => {
        return !movedItem.isGroup && eventData.parentItem.subItems.length > 0;
      }
    );

    // Resort the lists
    this.availableItems = this.sortList(this.availableItems);
    this.selectedItems = this.maintainOrder ? this.selectedItems : this.sortList(this.selectedItems);

    this.onSelectedChange.emit(this.selectedItems);
  }

  public onFilterChanged_AvailableList(newFilter: string): void {}
  
  public onAllItemsMove_SelectedList(selectedItems: BDSelectListItem[]): void {
    for (let index = selectedItems.length - 1; index >= 0; index--) {
      let item = selectedItems[index];
      item.showSubItems = true;
      this.moveItem(item, null, this.selectedItems, this.availableItems, (movedItem, destinationList) => true);
    }
    this.availableItems = this.sortList(this.availableItems);
    this.selectedItems = this.maintainOrder ? this.selectedItems : this.sortList(this.selectedItems);

    this.onSelectedChange.emit([]);
  }

  public onItemMove_SelectedList(eventData: ItemMoveEventData): void {
    if (eventData.selectedItem.isGroup) {
      eventData.selectedItem.showSubItems = true;
    }

    this.moveItem(eventData.selectedItem, eventData.parentItem, this.selectedItems, this.availableItems, (movedItem, destinationList) => true);

    this.availableItems = this.sortList(this.availableItems);
    this.selectedItems = this.maintainOrder ? this.selectedItems : this.sortList(this.selectedItems);

    this.onSelectedChange.emit(this.selectedItems);
  }

  public onFilterChanged_SelectedList(newFilter: string): void {}

  public removeListItem(source: BDSelectListItem[], item: BDSelectListItem): BDSelectListItem {
    const itemIndex = source.findIndex(arrayItem => arrayItem.identifier === item.identifier);

    if (itemIndex >= 0) {
      return source.splice(itemIndex, 1)[0];
    }

    for (let idx = 0; idx < source.length; ++idx) {
      const parent = source[idx];
      const removedItem = this.removeListItem(parent.subItems, item);
      if (removedItem) {
        if (parent.subItems.length === 0) {
          source.splice(idx, 1);
        }
        return removedItem;
      }
    }
    return null;
  }


  public moveItem(
    valueItem: BDSelectListItem,
    parentItem: BDSelectListItem,
    sourceList: BDSelectListItem[],
    destinationList: BDSelectListItem[],
    collapseItemInDestination: (movedItem: BDSelectListItem, destinationList: BDSelectListItem[]) => boolean
  ): void {
    let itemToMove: BDSelectListItem = this.removeListItem(sourceList, valueItem);
    let groupItem: BDSelectListItem = null;

    if (itemToMove.isGroup) {
      groupItem = destinationList.find(arrayItem => arrayItem.identifier === itemToMove.identifier);

      if (groupItem) {
        itemToMove.subItems.forEach(item => {
          groupItem.subItems.push(item);
        });
      } else {
        groupItem = itemToMove;
        destinationList.push(itemToMove);
      }
    } else if (parentItem) {
      groupItem = destinationList.find(arrayItem => arrayItem.identifier === parentItem.identifier);

      if (!groupItem) {
        groupItem = Object.assign({}, parentItem);
        groupItem.subItems = [];
        destinationList.push(groupItem);
      }

      groupItem.subItems.push(itemToMove);
    } else {
      destinationList.push(itemToMove);
    }

    if (groupItem) {
      groupItem.showSubItems = collapseItemInDestination(itemToMove, destinationList);
    }
  }

  public sortList(unsortedList: BDSelectListItem[]): BDSelectListItem[] {
    unsortedList = forEach(unsortedList, group => group.subItems = this.sortList(group.subItems));
    if (this.lookupFieldInternalColumn === "76fac4d1-5072-43a7-9c7a-d4d95e7cf06c.NewValue") {
      unsortedList = sortBy(unsortedList, item => item.resourceId ? Number(item.resourceId.replace(/[^0-9]+/ig, "")) : new Date("01-01-2018 " + item.displayName));
    } else {
      unsortedList = sortBy(unsortedList, item => item.displayName.toUpperCase());
    }

    return unsortedList;
  }


  ngOnInit(): void {
  }

}
