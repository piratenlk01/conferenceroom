import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as baguetteBox from 'baguetteBox.js';
import { BookingService } from '../service/booking.service';
import { Subscription } from 'rxjs/internal/Subscription';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

declare var $: any;
import * as moment from 'moment';


@Component({
    selector: 'app-sathorn',
    templateUrl: './sathorn.component.html',
    styleUrls: ['./sathorn.component.scss']
})
export class SathornComponent implements OnInit, OnDestroy {
    localSubscription = new Subscription();
    startdate: Date;
    enddate: Date;

    events: any[] = [];

    options = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        defaultView: "dayGridMonth",
        header: {
            left: 'prev,next,today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        views: {
            timeGridWeek: {
                titleFormat: function (date) {
                    let _start = moment(date.start).format('D MMM')
                    let _end = moment(date.end).format('D MMM')
                    let _year = moment(date.end).format('YYYY')
                    return `${_start} - ${_end} ${_year}`
                },
                columnHeaderText: (d) => {
                    return `${moment(d.toString()).format('ddd DD/MMM')}`;
                }
            }
        },
        datesRender: (e) => {
            let _startdate = new Date(e.view.activeStart).toUTCString();
            _startdate = _startdate.split(' ').slice(0, 4).join(' ');

            let _enddate = new Date(e.view.activeEnd).toUTCString();
            _enddate = _enddate.split(' ').slice(0, 4).join(' ');

            this.GetCalendarByRoomId(_startdate, _enddate, 3)
        },
        selectable: true,
        editable: false
    }

    //-----------------------------------------------------
    optionother: models.OptionModel[] = []
    optionroom: models.OptionModel[] = []
    roomviewmodel = <models.RoomViewModel>{}
    reserve = <models.ReserveModel>{};
    //------------------------------------------------------

    constructor(
        private location: Location,
        private _Router: Router,
        private conferenService: BookingService
    ) { }

    ngOnInit(): void {
        this.GetRoomById(3)

        baguetteBox.run('.compact-gallery');
        $(document).scrollTop("0");
        sessionStorage.removeItem('reserve');
        sessionStorage.removeItem('optiondetail');
    }

    GetRoomById(id: number) {
        // this.localSubscription.add(
        //     this.conferenService.GetRoomById(id).subscribe(
        //         (s) => {
        //             if (s.StatusCode == '200') {
        //                 this.roomviewmodel = s.Data
        //                 this.optionroom = this.roomviewmodel.OptionRoom
        //                 this.optionother = this.roomviewmodel.Option
        //             } else {

        //             }
        //         },
        //         (e) => {

        //         }
        //     )
        // )

        this.conferenService.GetRoom().then(s => {
            let room = s.filter(i => i.Id === id)
            if(room){
                this.roomviewmodel = room[0]
                this.optionroom = room[0].OptionRoom
                this.optionother = room[0].Option
            }
            
        })
    }

    GetCalendarByRoomId(_startdate, _enddate, RoomId) {
        // let data = <models.FullCalendarParameterModel>{
        //     StartDate: _startdate,
        //     EndtDate: _enddate,
        //     RoomId: RoomId
        // }
        // this.localSubscription.add(
        //     this.conferenService.GetCalendarByRoomId(data).subscribe(
        //         (s) => {
        //             this.events = s.Data
        //         },
        //         (e) => {

        //         }
        //     )
        // )

        this.conferenService.GetCalendar().then(s => {
            this.events = s
        })
    }

    Booking() {
        this._Router.navigate(['/booking', 3, 'name', 'สาทร']);
    }

    goBack(event: Event) {
        event.preventDefault();
        this.location.back();
    }

    ngOnDestroy() {
        this.localSubscription.unsubscribe();
    }

}
