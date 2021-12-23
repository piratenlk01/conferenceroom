import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RatchadaComponent } from './ratchada/ratchada.component';
import { RatchawongComponent } from './ratchawong/ratchawong.component';
import { SathornComponent } from './sathorn/sathorn.component';
import { SongwadComponent } from './songwad/songwad.component';
import { BookingComponent } from './booking/booking.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component'
import { BookingByidComponent } from './booking-byid/booking-byid.component'

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'ratchada', component: RatchadaComponent },
    { path: 'ratchawong', component: RatchawongComponent },
    { path: 'sathorn', component: SathornComponent },
    { path: 'songwad', component: SongwadComponent },
    { path: 'booking/:id/name/:room_name', component: BookingComponent},
    { path: 'bookdetail', component: BookingDetailComponent},
    { path: 'bookdetail/:id', component: BookingByidComponent},
    { path: 'survey', loadChildren: () => import('src/app/survey/survey.module').then(m => m.SurveyModule) },
    { path: 'admin', loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
