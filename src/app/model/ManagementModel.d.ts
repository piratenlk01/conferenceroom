

declare namespace models {
    export class ManagementParameterModel {
        public StartDate: Date;
        public EndDate: Date;
        public ConferenceTypeId: number;
        public RoomId: number;
        public BookStatus: string;
    }
    export class ManagementApproveParameterModel {
        public Id: number;
        public CustomerType: string;
    }
    export class LineNotifyLogModel {
        public LogDescription: string;
        public SenderTo: string;
        public LogType: string;
    }
}

