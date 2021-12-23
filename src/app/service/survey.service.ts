import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

    constructor(
        private http:HttpClient,
    ) { }

    GetQuest(){
        return this.http.get<any>('assets/json/question.json')
        .toPromise()
        .then(res => res.data );
    }
}
