export interface BDSelectListOptions {
    filterOptions?: BDSelectListFilterOptions;
    moveOptions?: BDSelectListMoveOptions;
}

export interface BDSelectListMoveOptions {
    headerTitle?: string;
    moveAllButtonTemplate?: string;
    moveAllButtonTitleText?: string;
    moveItemButtonClasses?: string[];
}

export interface ItemMoveEventData {
    selectedItem?: BDSelectListItem;
    parentItem?: BDSelectListItem;
}

export interface BDSelectListFilterOptions {
    enableFilter?: boolean;
    filterDebounce?: number;
    placeholderText?: string;
}

export class BDSelectListItem {
    public showSubItems: boolean = true;

    constructor(
        public identifier: string,
        public value: string,
        public displayName: string = value,
        public isGroup: boolean = false,
        public subItems: BDSelectListItem[] = [],
        public resourceId?: string
    ) {
        if (!identifier) {
            throw new Error(`Invalid id argument passed into the BDListItemConstructor. Id: ${identifier}`);
        }
    }
}
