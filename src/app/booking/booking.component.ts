import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import * as baguetteBox from 'baguetteBox.js';
import * as moment from 'moment';
import { BookingService } from '../service/booking.service';
import { Subscription } from 'rxjs/internal/Subscription';
declare var $: any;

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit,OnDestroy {
    localSubscription = new Subscription();
    datestart: Date;   //วันที่จองห้อง
    timestart: string = '0';   //ช่วงเวลาจองห้อง

    reserve = <models.ReserveModel>{};
    conferenceoption: InsertOptionModel2[] = []
    optiondetail = <OptionDetail>{}

    optionroom: models.OptionModel[] = []
    optionother: InsertOptionModel2[] = []
    roomviewmodel = <models.RoomViewModel>{}

    //--option startdate------------------------------
    minDate: string;
    maxDate: Date;
    //--time------------------------------

    isactiveDateBook: boolean = false;
    isactiveTimeBook: boolean = false;

    Bookingform: FormGroup


    constructor(
        private fb: FormBuilder,
        private location: Location,
        private _Router: Router,
        private _ActivedRoute: ActivatedRoute,
        private conferenService: BookingService
    ) {  }

    ngOnInit(): void {
        $(document).scrollTop("0");
        baguetteBox.run('.compact-gallery');

        this._ActivedRoute.params.subscribe(
            (s) => {
                this.reserve.RoomId = parseInt(s.id)
                if (this.reserve.RoomId) {
                    this.GetRoomById(this.reserve.RoomId);
                }
            },
            (e) => {
                this._Router.navigate(['/home']);
            }
        )

        this.Bookingform = this.fb.group({
            DateBook: new FormControl('', Validators.required),
            TimeBook: new FormControl('0', Validators.required),
            Purpose: new FormControl('', Validators.required),
            BookBy: new FormControl('', Validators.required),
            BookDepartment: new FormControl('', Validators.required),
            BookCompany: new FormControl('', Validators.required),
            AddressNo: new FormControl('', Validators.required),
            ContactPhone: new FormControl('', Validators.required),
            Email: new FormControl('', Validators.required),
            TotalPerson: new FormControl('', Validators.required),
            Remark: new FormControl('')
        })

        let reserve = sessionStorage.getItem('reserve')
        if (reserve) {
            this.reserve = JSON.parse(reserve);
            this.Bookingform.get('Purpose').setValue(this.reserve.Purpose)
            this.Bookingform.get('BookBy').setValue(this.reserve.BookBy)
            this.Bookingform.get('BookDepartment').setValue(this.reserve.BookDepartment)
            this.Bookingform.get('BookCompany').setValue(this.reserve.BookCompany)
            this.Bookingform.get('AddressNo').setValue(this.reserve.AddressNo)
            this.Bookingform.get('ContactPhone').setValue(this.reserve.ContactPhone)
            this.Bookingform.get('Email').setValue(this.reserve.Email)
            this.Bookingform.get('TotalPerson').setValue(this.reserve.TotalPerson)
            this.Bookingform.get('Remark').setValue(this.reserve.Remark)

            let bookdatet = moment(this.reserve.StartDateTime).format('YYYY-MM-DD')
            let _timestart = moment(this.reserve.StartDateTime).format('hh:mm')
            let _timeend = moment(this.reserve.EndDateTime).format('hh:mm')

            if (_timestart == '08:00' && _timeend == '12:00') {
                this.Bookingform.get('DateBook').setValue(bookdatet)
                this.Bookingform.get('TimeBook').setValue('1')
            } else if (_timestart == '13:00' && _timeend == '17:00') {
                this.Bookingform.get('DateBook').setValue(bookdatet)
                this.Bookingform.get('TimeBook').setValue('2')
            } else {
                this.Bookingform.get('DateBook').setValue(bookdatet)
                this.Bookingform.get('TimeBook').setValue('3')
            }
        }
    }


    get purpose() { return this.Bookingform.get('Purpose'); }
    get bookby() { return this.Bookingform.get('BookBy'); }
    get bookdepartment() { return this.Bookingform.get('BookDepartment'); }
    get bookcompany() { return this.Bookingform.get('BookCompany'); }
    get addressno() { return this.Bookingform.get('AddressNo'); }
    get contactphone() { return this.Bookingform.get('ContactPhone'); }
    get email() { return this.Bookingform.get('Email'); } TotalPerson
    get totalperson() { return this.Bookingform.get('TotalPerson'); }
    get datebook() { return this.Bookingform.get('DateBook'); }
    get timebook() { return this.Bookingform.get('TimeBook'); }


    Booking() {
        
        if (this.Bookingform.status == "INVALID") {
            this.Bookingform.markAllAsTouched()
            return false;
        }
        
        this.reserve.Purpose = this.Bookingform.get('Purpose').value
        this.reserve.BookBy = this.Bookingform.get('BookBy').value
        this.reserve.BookDepartment = this.Bookingform.get('BookDepartment').value
        this.reserve.BookCompany = this.Bookingform.get('BookCompany').value
        this.reserve.AddressNo = this.Bookingform.get('AddressNo').value
        this.reserve.ContactPhone = this.Bookingform.get('ContactPhone').value
        this.reserve.Email = this.Bookingform.get('Email').value
        this.reserve.TotalPerson = this.Bookingform.get('TotalPerson').value
        this.reserve.Remark = this.Bookingform.get('Remark').value

        let _datestart = moment(this.Bookingform.get('DateBook').value).format('yyyy-MM-DD');
        if (this.Bookingform.get('TimeBook').value === '1') {
            this.reserve.StartDateTime = new Date(`${_datestart} 08:00`);
            this.reserve.EndDateTime = new Date(`${_datestart} 12:00`);
        } else if (this.Bookingform.get('TimeBook').value === '2') {
            this.reserve.StartDateTime = new Date(`${_datestart} 13:00`);
            this.reserve.EndDateTime = new Date(`${_datestart} 17:00`);
        } else if (this.Bookingform.get('TimeBook').value === '3') {
            this.reserve.StartDateTime = new Date(`${_datestart} 08:00`);
            this.reserve.EndDateTime = new Date(`${_datestart} 17:00`);
        }
        
        this.reserve.Option = [];
        this.optionother.forEach(i => {
            if (i.isActive == true) {
                this.reserve.Option.push(<models.OptionModel>{
                    Id: i.Id,
                    Description: i.Description,
                    Destination: i.Destination
                })
            }
        })
        sessionStorage.setItem('reserve', JSON.stringify(this.reserve));
        this._Router.navigate(["/bookdetail"]);

    }


    goBack(event: Event) {
        event.preventDefault();
        this.location.back();
    }

    numKeyOnly(event: any) {
        const ew = event.keyCode
        if (48 <= ew && ew <= 57) {
            return true;
        } else {
            return false;
        }
    }

    GetRoomById(id: number) {
        // this.localSubscription.add(
        //     this.conferenService.GetRoomById(id).subscribe(
        //         (s) => {
        //             if (s.StatusCode == '200') {
        //                 this.roomviewmodel = s.Data
        //                 this.reserve.TotalPerson = this.roomviewmodel.TotalPerson
        //                 this.optionroom = this.roomviewmodel.OptionRoom
        //                 this.roomviewmodel.Option.forEach(i => {
        //                     this.optionother.push(<InsertOptionModel2>{
        //                         Id: i.Id,
        //                         Description: i.Description,
        //                         Destination: null,
        //                         isActive: false
        //                     })
        //                 })
        //                 this.getSession()
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
                this.reserve.TotalPerson = room[0].TotalPerson
                this.optionroom = room[0].OptionRoom
                room[0].Option.forEach(i => {
                    this.optionother.push(<InsertOptionModel2>{
                        Id: i.Id,
                        Description: i.Description,
                        Destination: null,
                        isActive: false
                    })
                })
                this.getSession()
            }
            
        })
    }

    getSession() {
        let reserve = sessionStorage.getItem('reserve')
        if (reserve) {
            this.reserve = JSON.parse(reserve);
            if (this.reserve.Option) {
                this.reserve.Option.forEach(i => {
                    let _index = this.optionother.findIndex(optionother => optionother.Id === i.Id)
                    if (_index != -1) {
                        this.optionother[_index].isActive = true
                        // tele conference number
                        if (i.Id == 3) {
                            this.optionother[_index].Destination = i.Destination
                        }
                    }
                })
            }
        }
    }

    Toggleitem(id: any, isActive: boolean) {
        if (id == 3) {
            let _index = this.optionother.findIndex(optionother => optionother.Id === id)
            if (isActive == true) {
                this.optionother[_index].Destination = ''
            } else {
                this.optionother[_index].Destination = null
            }
        }
    }

    ngOnDestroy() {
        this.localSubscription.unsubscribe();
    }


}
class InsertOptionModel2 {
    Id: number;
    Description: string;
    Destination: string;
    isActive: boolean;
}

class OptionDetail{
    option1Id: number;
    option1Description: string;
    option1Destination: string;
    option2Id: number;
    option2Description: string;
    option2Destination:string;
    option3Id: number;
    option3Description: string;
    option3Destination: string;
}