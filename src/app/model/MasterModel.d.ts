

declare namespace models {
    export class DashboardModel {
        public Title: string;
        public DoughnutChart: DoughnutChartModel;
        public Description: DoughnutChartDescriptionModel;
    }
    export class DoughnutChartDescriptionModel {
        public labels: string[];
        public percent: number[];
        public data: number[];
        public color: string[];
        public total: number;
    }
    export class DoughnutChartModel {
        public labels: string[];
        public datasets: Datasets[];
    }
    export class Datasets {
        public data: number[];
        public backgroundColor: string[];
        public hoverBackgroundColor: string[];
    }
    export class BarChartModel {
        public Title: string;
        public BarChart: BarChartDataModel;
        public Options: BarChartOptionsModel;
    }
    export class BarChartDataModel {
        public labels: string[];
        public datasets: BarChartDataSetsModel[];
    }
    export class BarChartDataSetsModel {
        public label: string;
        public backgroundColor: string;
        public borderColor: string;
        public data: number[];
    }
    export class ServerNameModel {
        public Id: string;
        public LocalIpAddress: string;
        public LocalPort: string;
        public RemoteIpAddress: string;
        public RemotePort: string;
    }
    export class OrganizationChartModel {
        public label: string;
        public data: string;
        public children: OrganizationChartModel[];
        public expanded: boolean;
        public type: string;
        public styleClass: string;
        public Id: number;
        public Code: string;
        public nodelevel: boolean;
    }
    export class FindUserCreateUpdateModel {
        public UserName: string;
        public Datetime: string;
    }
    export class FileUploaded {
        public Id: number;
        public PathTemp: string;
        public FileName: string;
        public ContentType: string;
        public Length: number;
        public State: string;
    }
    export class FilePathViewModel {
        public Id: number;
        public Filename: string;
        public FilePath: string;
        public FileType: string;
        public IdReadFile: string;
    }
    export class BarChartOptionsModel {
        public scales: BarChartOptionsScalesModel;
    }
    export class BarChartOptionsScalesModel {
        public yAxes: BarChartOptionsYAxesModel[];
    }
    export class BarChartOptionsYAxesModel {
        public ticks: BarChartOptionsTicksModel;
    }
    export class BarChartOptionsTicksModel {
        public beginAtZero: boolean;
        public max: number;
        public min: number;
        public stepSize: number;
    }
}

