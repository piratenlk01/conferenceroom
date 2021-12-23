

declare namespace models {
    export class BaseResponseModel {
        public StatusCode: string;
        public MessageCode: number;
        public Message: string;
    }
    export class BaseResponseDataModel<T> {
        public StatusCode: string;
        public MessageCode: number;
        public Message: string;
        public Data: T;
    }
}

