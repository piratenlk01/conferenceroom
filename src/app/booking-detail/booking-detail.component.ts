import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Message } from 'primeng/api/message';
import { Subscription } from 'rxjs/internal/Subscription';
import { BookingService } from '../service/booking.service';
import { MessageService } from 'primeng/api';
import { DateService } from '../shared/date.service';
import * as moment from 'moment';

declare var $: any;

@Component({
    selector: 'app-booking-detail',
    templateUrl: './booking-detail.component.html',
    styleUrls: ['./booking-detail.component.scss'],
    providers : [MessageService]
})
export class BookingDetailComponent implements OnInit, OnDestroy {
    localSubscription = new Subscription();
    Msgs: Message[] = [];     //เพิ่มMsgs error
    reserve = <models.ReserveModel>{}
    optiondetail = <OptionDetail>{}
    room_name: string;
    ConferenceTypename: string
    isToggle: boolean;
    blocked: boolean = false;
    roomviewmodel = <models.RoomViewModel>{}
    isActiveAccept = true;
    ActiveCaptcha: boolean;

    constructor(
        private location: Location,
        private _Router: Router,
        private conferenService: BookingService,
        private messageService: MessageService,
        private _date:DateService
    ) { }

    ngOnInit() {
        $(document).scrollTop("0");

        this.blocked = false;
        this.getSession()
    }

    getSession() {
        let reserve = sessionStorage.getItem('reserve')
        this.reserve = JSON.parse(reserve);
        if (this.reserve) {
            this.GetRoomById(this.reserve.RoomId)
        }else{
            this._Router.navigate(['']);
        }
    }

    GetRoomById(id: number) {
        // this.localSubscription.add(
        //     this.conferenService.GetRoomById(id).subscribe(
        //         (s) => {
        //             if (s.StatusCode == '200') {
        //                 this.roomviewmodel = s.Data
        //             }
        //         }
        //     )
        // )
        this.conferenService.GetRoom().then(s => {
            let room = s.filter(i => i.Id === id)
            if(room){
                this.roomviewmodel = s
            }
        })
    }

    confirmBooking() {
        this.blocked = true;
        this.Msgs = [];
        $('#modal1').modal('hide')
        
        const str = new Date(this.reserve.StartDateTime).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
        const end = new Date(this.reserve.EndDateTime).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });

        // this.insert(str,end)
        setTimeout(()=> {
            this.blocked = false;
            $('#modal1').modal('hide')
            this.messageService.add({ key: 'myKey1',severity: 'success', summary: 'Success', detail: 'Booking success' });
            if (this.reserve.RoomId == 1) {
                this._Router.navigate(["songwad"])
            } else if (this.reserve.RoomId == 2) {
                this._Router.navigate(["ratchada"])
            } else if (this.reserve.RoomId == 3) {
                this._Router.navigate(["sathorn"])
            } else if (this.reserve.RoomId == 4) {
                this._Router.navigate(["ratchawong"])
            }
        }, 1500)
    }

    Toggleitem() {
        this.isToggle = !this.isToggle;
        this.AcceptBtn()
    }

    OkResponse(event): void {
        if (event) {
            this.ActiveCaptcha = true
            this.AcceptBtn()
            
            this.reserve.Token = event
        } else {
            this.ActiveCaptcha = false
            this.AcceptBtn()
        }
    }

    AcceptBtn() {
        if (this.isToggle == true && this.ActiveCaptcha == true) {
            this.isActiveAccept = false
        } else {
            this.isActiveAccept = true
        }
    }

    goBack(event: Event) {
        event.preventDefault();
        this.location.back();
    }

    ngOnDestroy() {
        this.localSubscription.unsubscribe();
    }

}

class OptionDetail {
    option1Id: number;
    option1Description: string;
    option1Destination: string;
    option2Id: number;
    option2Description: string;
    option2Destination: string;
    option3Id: number;
    option3Description: string;
    option3Destination: string;
}