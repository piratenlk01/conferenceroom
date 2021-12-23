

declare namespace models {
    export class SearchDropDownBoxModel {
        public SearchText: string;
        public Paging: PagingModel;
        public Sorting: SortingModel;
        public Code: string;
    }
    export class ResponseDropDownBoxModel {
        public Code: string;
        public Value: string;
    }
}

