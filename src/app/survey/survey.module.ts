import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormWizardCustomModule } from '../shared/step-wizard-form/step-wizard-form.module';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey.component';

import { CalendarModule } from 'primeng/calendar';
import { BlockUIModule } from 'primeng/blockui';
import { MessagesModule } from 'primeng/messages';

@NgModule({
    declarations: [
        SurveyComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SurveyRoutingModule,
        FormWizardCustomModule,
        BlockUIModule,
        MessagesModule,
        CalendarModule
    ]
})
export class SurveyModule { }


