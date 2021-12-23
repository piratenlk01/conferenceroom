import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { RatchadaComponent } from './ratchada/ratchada.component';
import { RatchawongComponent } from './ratchawong/ratchawong.component';
import { SathornComponent } from './sathorn/sathorn.component';
import { SongwadComponent } from './songwad/songwad.component';
import { BookingComponent } from './booking/booking.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';

import { RecaptchaModule } from "ng-recaptcha";

import { BlockUIModule } from 'primeng/blockui';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { BookingByidComponent } from './booking-byid/booking-byid.component';
import { CashingInterceptor } from './interceptor/cashing.interceptor';


// import { FullCalendarModule } from '@fullcalendar/angular';
// import dayGridPlugin from '@fullcalendar/daygrid';          // a plugin!
// import interactionPlugin from '@fullcalendar/interaction';  // a plugin!
// import timePlugin from '@fullcalendar/timegrid';            // a plugin!
// import listPlugin from '@fullcalendar/list';            // a plugin!


// FullCalendarModule.registerPlugins([
//     dayGridPlugin,
//     interactionPlugin,
//     timePlugin,
//     listPlugin 
// ]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CopyrightComponent,
    RatchadaComponent,
    RatchawongComponent,
    SathornComponent,
    SongwadComponent,
    BookingComponent,
    BookingDetailComponent,
    BookingByidComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BlockUIModule,
    MessagesModule,
    RecaptchaModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    ButtonModule,
    TabViewModule,
    FullCalendarModule,
    ToastModule
  ],
  providers: [
        // {provide:HTTP_INTERCEPTORS,useClass:CashingInterceptor,multi:true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
