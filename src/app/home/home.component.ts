import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { BookingService } from '../service/booking.service';
declare var $: any

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {
    localSubscription = new Subscription();
    personsongwad: number = 0;
    personratchada: number = 0;
    personsathorn: number = 0;
    personratchawong: number = 0;

    constructor(
        private _Router: Router,
        private conferenService: BookingService
    ) { }

    ngOnInit(): void {
        let _ok_promotion = sessionStorage.getItem("ok_promotion")
        if(!JSON.parse(_ok_promotion)){
            $('#promotion').modal('show')
            sessionStorage.setItem("ok_promotion", JSON.stringify(true))
        }

        

        // const urlSongwad = this.conferenService.GetRoomById(1)
        // const urlRatchada = this.conferenService.GetRoomById(2)
        // const urlSathorn = this.conferenService.GetRoomById(3)
        // const urlRatchawong = this.conferenService.GetRoomById(4)


        // this.localSubscription.add(
        //     forkJoin([urlSongwad,urlRatchada,urlSathorn,urlRatchawong]).subscribe( s =>{
        //         if(s.length > 0){
        //             if(s[0].StatusCode == '200'){
        //                 this.personsongwad = s[0].Data.TotalPerson
        //             }
        //             if(s[1].StatusCode == '200'){
        //                 this.personratchada = s[1].Data.TotalPerson
        //             }
        //             if(s[2].StatusCode == '200'){
        //                 this.personsathorn = s[2].Data.TotalPerson
        //             }
        //             if(s[3].StatusCode == '200'){
        //                 this.personratchawong = s[3].Data.TotalPerson
        //             }
        //         }
        //     })
        // )

        this.conferenService.GetRoom().then(s => {
            this.personsongwad = s[0].TotalPerson
            this.personratchada = s[1].TotalPerson
            this.personsathorn = s[2].TotalPerson
            this.personratchawong = s[3].TotalPerson
        })


        sessionStorage.removeItem('reserve');
        sessionStorage.removeItem('optiondetail');

    }

    select(event: Event, project: any) {
        event.preventDefault();
         this._Router.navigate([project]);
    }

    Booking(id: number, name: string) {
        this._Router.navigate(['/booking', id, 'name', name]);
    }

    ngOnDestroy() {
        this.localSubscription.unsubscribe();
    }
}
