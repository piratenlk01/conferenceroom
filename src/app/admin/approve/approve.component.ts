import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { DateService } from 'src/app/shared/date.service';
import { ConferencemanagementService } from '../service/conferencemanagement.service';
declare var $:any;

@Component({
    selector: 'app-approve',
    templateUrl: './approve.component.html',
    styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements OnInit {
    localSubscription = new Subscription();
    Msgs: Message[] = [];
    msgsbyid: Message[] = [];

    DateStart = this._date.DateString
    DateEnd = this._date.DateString


    databookbyid = <models.BookingViewModel>{}
    getlistbook = <models.ManagementParameterModel>{}
    databook: models.BookingViewModel[] = []
    cancelbookingmodel = <models.CancelParameterModel>{}

    isErrorCustomerType: boolean = false;
    isActiveReason: boolean = false;


    @ViewChild('pdfData', { static: false }) pdfData: ElementRef


    constructor(
        private ConferenceService: ConferencemanagementService,
        private _date: DateService
    ) { }

    ngOnInit(): void {
        this.GetListBooking();
    }

    GetListBooking() {
        this.Msgs = [];
        this.databook = []
        if (this.DateStart == null || this.DateEnd == null) {
            this.Msgs = []
            this.Msgs.push({ severity: 'error', summary: '', detail: 'กรุณากรอกวันที่' });
        } else {
            this.getlistbook.StartDate = new Date(this.DateStart)
            this.getlistbook.EndDate = new Date(this.DateEnd)
            this.ConferenceService.Get().then(s => {
                this.databook = s
            })

            // this.ConferenceService.Get().subscribe(
            //     (s) => {
            //         if (s.StatusCode == '200') {
            //             this.databook = s.Data
            //         } else {
            //             this.databook = []
            //         }
            //     },
            //     (e) => {
            //         this.databook = []
            //         this.msgsbyid = []
            //         this.msgsbyid.push({ severity: 'error', summary: '', detail: e });             //เพิ่มMsgs error
            //     }
            // )
        }
    }

    GetByBooking(Id, event?: any) {
        if (event) {
            event.preventDefault();
        }
        this.msgsbyid = []
        this.isErrorCustomerType = false
        this.isActiveReason = false
        this.cancelbookingmodel.CancelReasons = null
        // this.ConferenceService.GetById(Id).subscribe(
        //     (s) => {
        //         $('#bookingdetail').modal('show')
        //         this.databookbyid = s.Data
        //     },
        //     (e) => {
        //         this.msgsbyid = []
        //         this.msgsbyid.push({ severity: 'error', summary: '', detail: e });             //เพิ่มMsgs error
        //     }
        // )
        if(Id){
            let _databook =  this.databook.filter(i => i.Id == Id)
            if(_databook.length > 0){
                this.databookbyid = _databook[0]
                $('#bookingdetail').modal('show')
            }
        }
    }

    ApproveBooking(id: number) {
        let _model = <models.ManagementApproveParameterModel>{
            CustomerType: '1',
            Id: id
        }
        this.localSubscription.add(
            // this.ConferenceService.ApproveBooking(_model).subscribe(
            //     s => {
            //         this.GetByBooking(this.databookbyid.Id, null)
            //         setTimeout(() => { this.GetListBooking() }, 1000)
            //     },
            //     e => {
            //         this.msgsbyid = []
            //         this.msgsbyid.push({ severity: 'error', summary: '', detail: e });               //เพิ่มMsgs error
            //     }
            // )
        )
    }

    CancelBookingByStaff(id: number) {
        this.isErrorCustomerType = false
        if (this.cancelbookingmodel.CancelReasons == null || this.cancelbookingmodel.CancelReasons == '') {
            this.isActiveReason = true
        } else {
            this.isActiveReason = false
            this.cancelbookingmodel.Id = id
            // this.ConferenceService.CancelBookingByStaff(this.cancelbookingmodel).subscribe(
            //     (s) => {
            //         this.GetByBooking(this.databookbyid.Id, null)
            //         setTimeout(() => { this.GetListBooking() }, 1000)
            //     },
            //     (e) => {
            //         this.msgsbyid = []
            //         this.msgsbyid.push({ severity: 'error', summary: '', detail: e });               //เพิ่มMsgs error
            //     }
            // )
        }
    }

    printBooking() {
        let printContents, popupWin;
        printContents = this.pdfData.nativeElement.innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.write(`
        <html>
        <head>
        <title>Panjathani Conference Center</title>
        <style>
            @media print {
                @page { 
                    size : A4, A4 landscape ; 
                }
                .page {
                    margin: auto auto;
                }
                label {
                    margin-bottom: 0.0rem !important;
                }
                p {
                    margin-bottom: 0px!important;
                }
                .form-row {
                    margin-bottom: -10px;
                }
            }
        </style>
        <link rel="stylesheet" media="print" href="assets/css/bootstrap.css">
        <link rel="stylesheet" media="print" href="assets/css/styleprintPDF.css">
    </head>
    <body onload="window.print();window.close()">${printContents}</body>
    </html>

    `);
        popupWin.document.close();

    }


}
