

declare namespace models {
    export class EChartsBarModel {
        public tooltip: EChartsBarTooltipModel;
        public legend: EChartsBarLegendModel;
        public xAxis: EChartsBarXAxisModel;
        public yAxis: EChartsBarYAxisModel;
        public color: string[];
        public series: EChartsBarSeriesModel[];
    }
    export class EChartsBarTooltipModel {
        public trigger: string;
        public axisPointer: EChartsBarTooltipAxisPointerModel;
    }
    export class EChartsBarTooltipAxisPointerModel {
        public type: string;
    }
    export class EChartsBarLegendModel {
        public show: boolean;
    }
    export class EChartsBarTitleModel {
        public text: string;
    }
    export class EChartsBarXAxisModel {
        public type: string;
        public data: string[];
    }
    export class EChartsBarYAxisModel {
        public type: string;
        public show: boolean;
        public data: string[];
    }
    export class EChartsBarSeriesModel {
        public name: string;
        public type: string;
        public barGap: number;
        public data: number[];
        public stack: string;
        public label: EChartsBarLabelModel;
        public showBackground: boolean;
        public backgroundStyle: EChartsBarBackgroundStyleModel;
        public emphasis: EChartsBarEmphasisModel;
    }
    export class EChartsBarLabelModel {
        public show: boolean;
        public position: string;
        public distance: number;
        public align: string;
        public verticalAlign: string;
        public rotate: number;
        public formatter: string;
        public fontSize: number;
        public rich: EChartsBarRichModel;
    }
    export class EChartsBarRichModel {
        public name: any;
    }
    export class EChartsBarBackgroundStyleModel {
        public color: string;
    }
    export class EChartsBarEmphasisModel {
        public focus: string;
    }
}

