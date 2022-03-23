import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentDetailsComponent } from '../component-details/component-details.component';
import { UserComponent } from '../user/user.component';
import { RegistrationComponent } from '../user/registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../user/login/login.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../auth/auth.guard';
import { MealDetailsComponent } from '../meal-details/meal-details.component';
import { MealDetailComponent } from '../meal-details/meal-detail/meal-detail.component';
import { CalendarComponent } from '../calendar/calendar.component';

const routes: Routes = [
 {path:'',redirectTo:'/home',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children:[
    
        {path:'registration',component:RegistrationComponent},
        { path: 'login', component: LoginComponent }
      
    ]
  },
  
  {path:'components',component:ComponentDetailsComponent,canActivate:[AuthGuard]},
  {path:'meals',component:MealDetailsComponent,canActivate:[AuthGuard]},
  {path:'meals/detail/:id',component:MealDetailComponent,canActivate:[AuthGuard]},
  {path:'home',component:CalendarComponent,canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ }