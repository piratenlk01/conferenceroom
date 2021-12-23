

declare namespace models {
    export class SurveyParameterModel {
        public DateFrom: Date;
        public DateTo: Date;
        public RoomId: number;
        public Gender: string;
    }
    export class SurveyViewModel {
        public Id: number;
        public BookingDatetime: string;
        public Gender: string;
        public RoomId: number;
        public RoomName: string;
        public TotalScore: number;
        public Remark: string;
        public SurveyDetail: QuestionGroupViewModel[];
    }
    export class QuestionGroupViewModel {
        public GroupId: number;
        public GroupDescription: string;
        public Question: QuestionViewModel[];
    }
    export class QuestionViewModel {
        public Id: number;
        public Description: string;
        public OrderNo: number;
        public Child: QuestionViewModel[];
        public Score: number;
        public Score5: number;
        public Score4: number;
        public Score3: number;
        public Score2: number;
        public Score1: number;
        public Avg: number;
        public AvgDescription: string;
    }
    export class SurveyDasboardModel {
        public ConferenceSurveyGeneralData: SurveyGeneralDataModel;
        public ListConferenceQuestion: QuestionGroupViewModel[];
        public ConferenceSurveyRemark: string[];
    }
    export class SurveyGeneralDataModel {
        public TotalAll: number;
        public TotalFemale: number;
        public TotalMale: number;
        public RoomName: string[];
    }
    export class SurveyModel {
        public BookingDatetime: Date;
        public Gender: string;
        public RoomId: number;
        public Remark: string;
        public Answers: SurveyDetailModel[];
    }
    export class SurveyDetailModel {
        public Id: number;
        public Score: number;
    }
}

