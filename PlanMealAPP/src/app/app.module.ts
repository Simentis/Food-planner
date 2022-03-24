import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ComponentDetailsComponent } from './component-details/component-details.component';
import { ComponentDetailFormComponent } from './component-details/component-detail-form/component-detail-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './shared/user.service';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealDetailsFormComponent } from './meal-details/meal-details-form/meal-details-form.component';
import { MealDetailComponent } from './meal-details/meal-detail/meal-detail.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {AccordionModule} from 'primeng/accordion';     
import {MenuItem} from 'primeng/api';   
import {MenubarModule} from 'primeng/menubar';
@NgModule({
  declarations: [
    AppComponent,
    ComponentDetailsComponent,
    ComponentDetailFormComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    MealDetailsComponent,
    MealDetailsFormComponent,
    MealDetailComponent,
    CalendarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
      }),
      TableModule,DropdownModule,AccordionModule,MenubarModule
    ],
    
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  exports:[CalendarComponent],
})
export class AppModule { }
