

declare namespace models {
    export class PagingModel {
        public Skip: number;
        public Take: number;
    }
    export class DataPagingResult<T> {
        public Total: number;
        public Rows: T[];
    }
}

