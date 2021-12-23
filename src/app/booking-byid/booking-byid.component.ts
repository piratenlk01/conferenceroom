import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/api/message';
import { Subscription } from 'rxjs';
import { BookingService } from '../service/booking.service';

@Component({
    selector: 'app-booking-byid',
    templateUrl: './booking-byid.component.html',
    styleUrls: ['./booking-byid.component.scss']
})
export class BookingByidComponent implements OnInit,OnDestroy {
    localSubscription = new Subscription();
    Msgs: Message[] = [];     //เพิ่มMsgs error
    id:string;
    bookingmodel=<models.BookingViewModel>{}

    constructor(
        private route: ActivatedRoute,
        private bookService:BookingService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            
            // this.GetBookingByLink()
        });
        
    }

    // GetBookingByLink(){
    //     this.localSubscription.add(
    //         this.bookService.GetByLink(this.id).subscribe(
    //             s => {
    //                 if(s.StatusCode == '200'){
    //                     this.bookingmodel = s.Data
    //                 }else{

    //                 }
    //             }
    //         )
    //     )
    // }
    

    ngOnDestroy() {
        this.localSubscription.unsubscribe();
    }

}
