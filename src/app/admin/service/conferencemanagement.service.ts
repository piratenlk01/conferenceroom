import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConferencemanagementService {

    constructor(
        private http:HttpClient
    ) { }

    Get(){
        return this.http.get<any>('assets/json/book.json')
        .toPromise()
        .then(res => res.data );
    }
}
