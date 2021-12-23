import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    constructor(
        private http:HttpClient,
    ) { }

    GetRoom(){
        return this.http.get<any>('assets/json/room.json')
        .toPromise()
        .then(res => res.data );
    }

    GetCalendar(){
        return this.http.get<any>('assets/json/calendar.json')
        .toPromise()
        .then(res => res.data );
    }

}




class InsertOptionModel {
    Id: number;
    Description: string
    Destination: string;
}