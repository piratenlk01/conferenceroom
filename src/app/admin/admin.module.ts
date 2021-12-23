import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LayoutModule } from '../shared/layout/layout.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MainLayoutComponent } from '../shared/main-layout/main-layout';
import { ApproveComponent } from './approve/approve.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SurveyscoreComponent } from './surveyscore/surveyscore.component';

import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { ChartModule } from 'primeng/chart';

// import { PanelModule } from 'primeng/panel';
@NgModule({
    declarations: [
        AdminComponent,
        MainLayoutComponent,
        ApproveComponent,
        DashboardComponent,
        SurveyscoreComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AdminRoutingModule,
        LayoutModule,
        TableModule,
        MessagesModule,
        ChartModule
    ]
})
export class AdminModule { }
