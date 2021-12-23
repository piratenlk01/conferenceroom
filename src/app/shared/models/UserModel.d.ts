

declare namespace models {
    export class UserModel {
        public Id: number;
        public UserName: string;
        public FirstName: string;
        public LastName: string;
        public Position: string;
        public NavDefault: string;
        public BirthDay: Date;
        public LocationCode: string;
        public sectionCode: string;
        public sectionName: string;
        public InOut: string;
        public DefaultCompany: string;
        public DefaultCompanyName: string;
        public CompanyList: string[];
    }
    export class ReadProjectModel {
        public Code: string;
        public Name: string;
        public Icon: string;
        public OrderNo: number;
        public RouterLink: string;
    }
    export class ReadNavModel {
        public Code: string;
        public Name: string;
        public OrderNo: number;
        public Icon: string;
        public RouterLink: string;
        public NavTypeCode: string;
        public Children: ReadNavModel[];
        public Scopes: string[];
        public CompCode: string[];
    }
    export class ReadSectionModel {
        public ID: number;
        public SectionName: string;
        public SectionCode: string;
        public InOut: string;
    }
    export class ReadTitleModel {
        public ID: number;
        public Titlename: string;
        public TitleCode: string;
    }
}

