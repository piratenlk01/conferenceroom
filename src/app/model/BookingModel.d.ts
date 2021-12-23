

declare namespace models {
    export class OptionViewModel {
        public Id: number;
        public Description: string;
    }
    export class OptionModel {
        public Id: number;
        public Description: string;
        public Destination: string;
    }
    export class RoomViewModel {
        public Id: number;
        public RoomName: string;
        public Description: string;
        public TotalPerson: number;
        public Option: OptionModel[];
        public OptionRoom: OptionModel[];
    }
    export class BookingViewModel {
        public Id: number;
        public BookingNo: string;
        public RoomId: number;
        public RoomName: string;
        public ConferenceTypeId: number;
        public ConferenceTypeDescription: string;
        public StartDate: string;
        public StartTime: string;
        public EndDate: string;
        public EndTime: string;
        public BookBy: string;
        public BookDateTime: string;
        public BookDepartment: string;
        public BookCompany: string;
        public AddressNo: string;
        public ContactPhone: string;
        public Email: string;
        public TotalPerson: number;
        public BookStatus: string;
        public BookStatusDescription: string;
        public BookStatusColor: string;
        public NetAmount: number;
        public Discount: number;
        public TotalAmount: number;
        public ApproveById: number;
        public ApproveByName: string;
        public ApproveDateTime: string;
        public CustomerType: string;
        public CancelById: number;
        public CancelBy: string;
        public CancelDateTime: string;
        public CancelReasons: string;
        public Purpose: string;
        public Remark: string;
        public Guid: string;
        public Option: OptionModel[];
        public OptionRoom: OptionModel[];
    }
    export class ReserveModel {
        public RoomId: number;
        public ConferenceTypeId?: number;
        public StartDateTime: Date;
        public EndDateTime: Date;
        public BookBy: string;
        public BookDepartment: string;
        public BookCompany: string;
        public AddressNo: string;
        public ContactPhone: string;
        public Email: string;
        public TotalPerson: number;
        public Purpose: string;
        public NetAmount: number;
        public Discount: number;
        public TotalAmount: number;
        public Remark: string;
        public Option: OptionModel[];
        public Token: string;
    }
    export class FullCalendarModel {
        public title: string;
        public start: Date;
        public end: Date;
        public color: string;
        public allDay: boolean;
    }
    export class FullCalendarParameterModel {
        public StartDate: Date;
        public EndtDate: Date;
        public RoomId: number;
    }
    export class CancelParameterModel {
        public Id: number;
        public CancelReasons: string;
    }
}

