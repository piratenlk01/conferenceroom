import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/shared/date.service';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    conferenceDashborad = <models.DasboardParameterModel>{}
    doughnutChart = <models.DashboardModel>{}
    descriptionPie:Description[]=[]
    
    customerTypemodel=<ConferenceCustomerTypeModel>{}

    DateStart = this._date.DateString
    DateEnd = this._date.DateString

    constructor(
        private dashboardService:DashboardService,
        private _date:DateService
    ) { }

    ngOnInit(): void {
        this.conferenceDashborad.RoomId = 0

        this.selectChart()


        
    }

    selectChart(){
        this.doughnutChart=<models.DashboardModel>{}

        this.conferenceDashborad.DateFrom = new Date(this.DateStart)
        this.conferenceDashborad.DateTo = new Date(this.DateEnd)

        // const urlcustomertype = this._dashboardService.ConferenceCustomerType(this.conferenceDashborad)
        // const urldoughnutchart = this._dashboardService.DoughnutChartByRoom(this.conferenceDashborad)
        // const urlbarchart = this._dashboardService.BarChartByTime(this.conferenceDashborad)

        // forkJoin([urlcustomertype,urldoughnutchart,urlbarchart]).subscribe( s=> {
        //     if(s.length > 0){
        //         // CustomerType
        //         this.ConferenceCustomerType(s[0].Data)

        //         // DoughnutChartByRoom
        //         this.DoughnutChartByRoom(s[1])

        //         // BarChartByTime
        //         this.barChart = s[2]
        //     }
        // })
        this.dashboardService.DoughnutChartByRoom().then(s => {
            this.DoughnutChartByRoom(s)
        })
        this.dashboardService.Total().then(s => {
            if(s[0].Description == 'ทั้งหมด'){
                this.customerTypemodel = {
                    Description:s[0].Description,
                    Total: s[0].Total,
                    Color: '#8DC3E3'
                }
            }
        })
    }


    DoughnutChartByRoom(res1:models.DashboardModel){
        this.doughnutChart = res1[0]
        console.log(this.doughnutChart);
    }

}

class Select2Item {
    id: any;
    text: any;
}

class ConferenceCustomerTypeModel {
    Description: string;
    Total: number;
    Color: string;
}


//BarChart
export interface BarChartModel {
    Title: string;
    BarChart: BarChartDataModel;
}

class Description {
    color: string;
    data: any;
    labels: string;
    percent: any;
}

//DoughnutChart


class BarChartDataModel {
    labels: string[];
    datasets: BarChartDataSetsModel[];
}

class BarChartDataSetsModel {
    label: string;
    backgroundColor: string;
    borderColor: string;
    data: number[];
}

class DoughnutChartDescriptionModel {
    labels: string[];
    percent: number[];
    data: number[];
    color: string[];
    total: number;
}

class DoughnutChartModel {
    labels: string[];
    datasets: Datasets[];
}

class Datasets {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
}
