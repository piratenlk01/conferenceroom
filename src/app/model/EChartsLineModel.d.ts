

declare namespace models {
    export class EChartsLineModel {
        public tooltip: EChartsLineTooltipModel;
        public title: EChartsLineTitleModel;
        public legend: EChartsLineLegendModel;
        public xAxis: EChartsLineXAxisModel;
        public yAxis: EChartsLineYAxisModel;
        public color: string[];
        public series: EChartsLineSeriesModel[];
    }
    export class EChartsLineTooltipModel {
        public trigger: string;
        public axisPointer: EChartsLineTooltipAxisPointerModel;
    }
    export class EChartsLineTooltipAxisPointerModel {
        public type: string;
    }
    export class EChartsLineTitleModel {
        public text: string;
    }
    export class EChartsLineLegendModel {
        public data: string[];
    }
    export class EChartsLineXAxisModel {
        public type: string;
        public boundaryGap: boolean;
        public data: string[];
    }
    export class EChartsLineYAxisModel {
        public type: string;
    }
    export class EChartsLineSeriesModel {
        public name: string;
        public type: string;
        public stack: string;
        public data: number[];
    }
}

