import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component'
import { ApproveComponent } from './approve/approve.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SurveyscoreComponent } from './surveyscore/surveyscore.component'

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children:[
            {path: 'approve', component: ApproveComponent},
            {path: 'dashboard',component: DashboardComponent},
            {path: 'surveyscore',component: SurveyscoreComponent}
        ]
    },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
