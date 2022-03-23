import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MealDetailService } from 'src/app/shared/meal-detail.service';
import { UserService } from 'src/app/shared/user.service';
import { MealDetail } from 'src/app/shared/meal-detail.model';

@Component({
  selector: 'app-meal-details-form',
  templateUrl: './meal-details-form.component.html',
  styles: [
  ]
})
export class MealDetailsFormComponent implements OnInit {

  constructor(private router: Router,public service:MealDetailService,public services:UserService,private toastr:ToastrService) { }

  ngOnInit(): void {
   
  }
onSubmit(form:NgForm){

  if(this.service.formData.mealId == 0)
  this.insertRecord(form);
  
  else
  this.updateRecord(form);
 
}
 

insertRecord(form:NgForm){
  this.service.postMealDetail().subscribe(
    res => {
      this.resetForm(form);
      this.service.refreshList();
      this.toastr.success('Dodano','Dodano nowy posiłek')
    },
    err =>{console.log(err);}
      );
    }

updateRecord(form:NgForm){
  this.service.putMealDetail().subscribe(
    res => {
      this.resetForm(form);
      this.service.refreshList();
      this.toastr.info('Zaaktualizowano','Zaaktualizowano posiłek')
    },
    err =>{console.log(err);}
      );
}

    resetForm(form:NgForm){
      form.form.reset();
      this.service.formData = new MealDetail();
    }
}
