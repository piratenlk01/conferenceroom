import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(
        private http:HttpClient
    ) { }

    DoughnutChartByRoom(){
        return this.http.get<any>('assets/json/doughnutchart.json')
        .toPromise()
        .then(res => res.data );
    }

    Total(){
        return this.http.get<any>('assets/json/totalroom.json')
        .toPromise()
        .then(res => res.data );
    }

}
