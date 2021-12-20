import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { debounce, sortBy, forEach } from "lodash";
import { BDSelectListOptions, BDSelectListItem, ItemMoveEventData } from '../bd-select-list.models';
import { Guid } from '../bd-select-list/guid';

@Component({
  selector: 'bd-select-list',
  templateUrl: 'bd-select-list.component.html',
  styleUrls: ['bd-select-list.component.css']
})
export class BdSelectListComponent implements OnInit {

  @Output('onMoveAll') public onMoveAllEmitter: EventEmitter<BDSelectListItem[]> = new EventEmitter<BDSelectListItem[]>();
  @Output('onItemMove') public onItemMoveEmitter: EventEmitter<ItemMoveEventData> = new EventEmitter<ItemMoveEventData>();
  @Output('onFilterChanged') public onFilterChangedEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Input() public filterEnabled: boolean = true;
  @Input() public items: BDSelectListItem[];
  @Input() public options: BDSelectListOptions;
  @Input() public moveAllEnabled: boolean = true;
  @Input() public moveOneDisabled: boolean = false;
  @Input() public disabledTitleText: string;
  @Input() public containerHeight: number;
  @Input() public disabled: boolean;

  public disabledTitle: string = '';
  public filterText: string = '';
  public displayedItems: BDSelectListItem[] = [];
  public onFilterInputChanged: () => void;

  constructor() { }

  public ngOnInit(): void {
    if (!this.items) {
      throw new Error('Invalid value passed in for the "allItems" parameter. The value must be defined');
    }

    this.onFilterInputChanged = debounce(this.onFilterChanged, this.options.filterOptions.filterDebounce || 500);
    this.configureOptions();
    this.refreshDisplayItems();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.refreshDisplayItems();
    }
    if (changes['disabled'] || changes['moveOneDisabled'] || changes['disabledTitleText']) {
      this.disabledTitle = this.disabled || this.moveOneDisabled ? this.disabledTitleText : '';
    }
  }

  public configureOptions(): void {
    if (!this.options) {
      console.warn('No reference provided for the grid options. Unable to bind options for the parent to use');
      this.options = {};
    }
  }

  public refreshDisplayItems(expandAllItems: boolean = false): void {
    if (!this.filterText) {
      this.displayedItems = this.items;
      return;
    }

    const adjustedfilterText = this.filterText.trim().toLowerCase();

    const newDisplayedItems: BDSelectListItem[] = [];
    this.items.forEach(group => {
      if (group.displayName.toLowerCase().indexOf(adjustedfilterText) >= 0) {
        newDisplayedItems.push(group);
        return;
      }

      group.subItems
        .filter(item => item.displayName.toLowerCase().indexOf(adjustedfilterText) !== -1)
        .forEach(item => {
          let existingGroup = newDisplayedItems.find(arrayItem => Guid.equals(arrayItem.identifier, group.identifier));

          if (!existingGroup) {
            existingGroup = Object.assign({}, group);
            existingGroup.subItems = [];
            newDisplayedItems.push(existingGroup);
          }

          existingGroup.subItems.push(item);
        });
    });

    if (expandAllItems) {
      newDisplayedItems.forEach(group => group.showSubItems = true);
    }
    this.displayedItems = newDisplayedItems;
  }

  public onMoveAllClicked(): void {
    this.onMoveAllEmitter.emit(this.displayedItems);
  }

  public onMoveItem(selectedItem: BDSelectListItem, parentItem: BDSelectListItem): void {
    if (this.disabled || this.moveOneDisabled) {
      return;
    }
    this.onItemMoveEmitter.emit({ selectedItem, parentItem });
  }

  public onFilterChanged(): void {
    let validFilter = (this.filterText !== null && typeof (this.filterText) !== 'undefined' && this.filterText.trim().length > 0);
    this.onFilterChangedEmitter.emit(this.filterText);
    this.refreshDisplayItems(validFilter);
  }

}
