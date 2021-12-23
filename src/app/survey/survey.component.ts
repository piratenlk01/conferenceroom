import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem, Message } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';

import { SurveyService } from '../service/survey.service';
import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SurveyComponent implements OnInit, OnDestroy {
    localSubscription = new Subscription();

    items: MenuItem[];
    dropdownroomtype: Select2Item[] = []

    quetionmodel: models.QuestionGroupViewModel[] = []
    quetion1 = <models.QuestionGroupViewModel>{}
    quetion2 = <models.QuestionGroupViewModel>{}
    quetion3 = <models.QuestionGroupViewModel>{}
    quetion4 = <models.QuestionGroupViewModel>{}
    insertsurvey = <models.SurveyModel>{}
    insertsurvey1: models.SurveyDetailModel[] = []  // เอาไว้เช็ค validate
    insertsurvey2: models.SurveyDetailModel[] = []  // เอาไว้เช็ค validate
    insertsurvey3: models.SurveyDetailModel[] = []  // เอาไว้เช็ค validate
    insertsurvey4: models.SurveyDetailModel[] = []  // เอาไว้เช็ค validate

    msgsuccess: Message[] = [];
    msgerror: Message[] = [];
    datestart: Date
    timestart: any

    isCompleted: boolean = false
    BtbDone_insertsuccess:string = 'block'
    blocked = false;
    
    constructor(
        private surveyService: SurveyService
    ) { }

    ngOnInit(): void {
        
        this.GetRoom()
        this.GetQuestion()
        this.insertsurvey.RoomId = 0
        this.timestart = 0
        this.msgsuccess = []
        this.msgsuccess.push({severity: 'success', summary: '', detail: 's.Message' });         //เพิ่มMsgs error
    }

    GetRoom() {
        this.dropdownroomtype = [
            { id: '1', text: 'ทรงวาด' },
            { id: '2', text: 'รัชดา' },
            { id: '3', text: 'สาทร' },
            { id: '4', text: 'ราชวงศ์' }
        ]
    }

    GetQuestion() {
        this.insertsurvey.Answers = []

        // this.localSubscription.add(
        //     this.surveyService.GetQuestion().subscribe(
        //         (s) => {
        //             this.quetionmodel = s.Data
        //             s.Data.forEach(i => {
        //                 i.Question.forEach(ii => {
        //                     this.insertsurvey.Answers.push(<models.SurveyDetailModel>{       // แมพ id score เข้า model insertsurvey
        //                         Id: ii.Id,
        //                         Score: 0
        //                     })
        //                 })
        //                 if (i.GroupId == 1) {
        //                     this.quetion1 = {                   // แมพ quetion หัวข้อที่ 1 
        //                         GroupId: i.GroupId,
        //                         GroupDescription: i.GroupDescription,
        //                         Question: i.Question
        //                     }
        //                     this.quetion1.Question.forEach(i => {          // แมพ validate quetion1 
        //                         this.insertsurvey1.push({
        //                             Id: i.Id,
        //                             Score: null
        //                         })
        //                     })
        //                 }
        //                 if (i.GroupId == 2) {
        //                     this.quetion2 = {                 // แมพ quetion หัวข้อที่ 2
        //                         GroupId: i.GroupId,
        //                         GroupDescription: i.GroupDescription,
        //                         Question: i.Question
        //                     }
        //                     this.quetion2.Question.forEach(i => {          // แมพ validate quetion2
        //                         this.insertsurvey2.push({
        //                             Id: i.Id,
        //                             Score: null
        //                         })
        //                     })
        //                 }
        //                 if (i.GroupId == 3) {
        //                     this.quetion3 = {                 // แมพ quetion หัวข้อที่ 3
        //                         GroupId: i.GroupId,
        //                         GroupDescription: i.GroupDescription,
        //                         Question: i.Question
        //                     }
        //                     this.quetion3.Question.forEach(i => {          // แมพ validate quetion3
        //                         this.insertsurvey3.push({
        //                             Id: i.Id,
        //                             Score: null
        //                         })
        //                     })
        //                 }
        //                 if (i.GroupId == 4) {
        //                     this.quetion4 = {                 // แมพ quetion หัวข้อที่ 4
        //                         GroupId: i.GroupId,
        //                         GroupDescription: i.GroupDescription,
        //                         Question: i.Question
        //                     }
        //                     this.quetion4.Question.forEach(i => {          // แมพ validate quetion4
        //                         this.insertsurvey4.push({
        //                             Id: i.Id,
        //                             Score: null
        //                         })
        //                     })
        //                 }
        //             })
        //         }
        //     )
        // )

        this.surveyService.GetQuest().then(s => {
            if(s){
                this.quetionmodel = s
                s.forEach(i => {
                    i.Question.forEach(ii => {
                        this.insertsurvey.Answers.push(<models.SurveyDetailModel>{       // แมพ id score เข้า model insertsurvey
                            Id: ii.Id,
                            Score: 0
                        })
                    })
                    if (i.GroupId == 1) {
                        this.quetion1 = {                   // แมพ quetion หัวข้อที่ 1 
                            GroupId: i.GroupId,
                            GroupDescription: i.GroupDescription,
                            Question: i.Question
                        }
                        this.quetion1.Question.forEach(i => {          // แมพ validate quetion1 
                            this.insertsurvey1.push({
                                Id: i.Id,
                                Score: null
                            })
                        })
                    }
                    if (i.GroupId == 2) {
                        this.quetion2 = {                 // แมพ quetion หัวข้อที่ 2
                            GroupId: i.GroupId,
                            GroupDescription: i.GroupDescription,
                            Question: i.Question
                        }
                        this.quetion2.Question.forEach(i => {          // แมพ validate quetion2
                            this.insertsurvey2.push({
                                Id: i.Id,
                                Score: null
                            })
                        })
                    }
                    if (i.GroupId == 3) {
                        this.quetion3 = {                 // แมพ quetion หัวข้อที่ 3
                            GroupId: i.GroupId,
                            GroupDescription: i.GroupDescription,
                            Question: i.Question
                        }
                        this.quetion3.Question.forEach(i => {          // แมพ validate quetion3
                            this.insertsurvey3.push({
                                Id: i.Id,
                                Score: null
                            })
                        })
                    }
                    if (i.GroupId == 4) {
                        this.quetion4 = {                 // แมพ quetion หัวข้อที่ 4
                            GroupId: i.GroupId,
                            GroupDescription: i.GroupDescription,
                            Question: i.Question
                        }
                        this.quetion4.Question.forEach(i => {          // แมพ validate quetion4
                            this.insertsurvey4.push({
                                Id: i.Id,
                                Score: null
                            })
                        })
                    }
                })
            }
            
        })

    }

    onComplete(event: any) {
        this.blocked = true;
        let _datestart = moment(this.datestart).format('YYYY-MM-DD');
        let _timestart = moment(this.timestart).format('HH:mm');
        let _mapstartdate = `${_datestart}T${_timestart}`;
        let _BookingDatetime = new Date(`${_mapstartdate}`).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });

        this.Insert(_BookingDatetime)
        
    }

    Insert(date) {
        this.insertsurvey.BookingDatetime = date;
            
            setTimeout(()=> {
                this.msgsuccess = []
                this.msgsuccess.push({severity: 'success', summary: '', detail: 'Success' });         //เพิ่มMsgs error
                this.blocked = false;
                this.isCompleted = true;
                this.BtbDone_insertsuccess="none"
            }, 1500)
    }

    selectValue(event: any, id) {
        if (this.insertsurvey.Answers.findIndex(i => i.Id == id) != -1) {
            let _index = this.insertsurvey.Answers.findIndex(i => i.Id == id)
            this.insertsurvey.Answers[_index].Score = event.target.value
        }
    }

    onNext(page?) {
        if (page == 1) {
            let _datestart = moment(this.datestart).format('YYYY-MM-DD');
            let _timestart = moment(this.timestart).format('HH:mm');
            let _mapstartdate = `${_datestart}T${_timestart}`;
            let _BookingDatetime = new Date(`${_mapstartdate}`);
        }
        $('#pjsurvey').scrollTop("1");

    }

    ngOnDestroy() {
        this.localSubscription.unsubscribe();
    }

}


class Select2Item {
    id: any;
    text: any;
}

// class models.QuestionGroupViewModel
//     {
//         GroupId: number;
//         GroupDescription: string;
//         Question: ConferenceQuestionModel[];
//     }

// class ConferenceQuestionModel
//     {
//         Id : number;
//         Description : string;
//         OrderNo : number;
//         Child : ConferenceQuestionModel[]
//         Score : number;
//         Score5 : number;
//         Score4 : number;
//         Score3 : number;
//         Score2 : number;
//         Score1 : number;
//         Avg : number; // ค่าเฉลี่ย
//         AvgDescription : string; //ระดับความพึงพอใจ
//     }

// class InsertConferenceSurveyModel
//     {
//         BookingDatetime : string;
//         Gender : string;
//         RoomId : any;
//         Remark : string;
//         Answers : InsertConferenceSurveyDetailModel[];
//     }

// class InsertConferenceSurveyDetailModel
//     {
//         Id : number;
//         Score : number;
//     }

// class GetListSurveyParameterModel
//     {
//         DateFrom : string;
//         DateTo : string;
//         RoomId : number;
//         Gender : string;
//     }

// class GetSurveyModel
//     {
//         ListSurvey : GetListSurveyModel;
//         IsValid : boolean;
//         Msg : string;
//     }

// class GetListSurveyModel
//     {
//         Id : number;
//         BookingDatetime : string;
//         Gender : string;
//         RoomId : number;
//         RoomName : string;
//         TotalScore : number;
//         Remark : string;
//     }

// class GetSurveyByIdModel
//     {
//         SurveyMaster : GetListSurveyModel;
//         SurveyDetail : QuestionGroupViewModel;
//         IsValid : boolean;
//         Msg : string;
//     }