import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MealDetail } from 'src/app/shared/meal-detail.model';
import { ComponentDetail } from 'src/app/shared/component-detail.model';
import { MealDetailService } from 'src/app/shared/meal-detail.service';
import { UserService } from 'src/app/shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentDetailService } from 'src/app/shared/component-detail.service';
import { MealDetailComponentService } from 'src/app/shared/meal-detail-component.service';
import { NgForm } from '@angular/forms';
import { ComponentDetailMealDetail } from 'src/app/shared/component-detail-meal-detail.model';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styles: [
  ]
})
export class MealDetailComponent implements OnInit {
  userDetail;
  componentId: number;
  constructor(public serviced:MealDetailComponentService,public servicec:ComponentDetailService,public service: MealDetailService, public toastr:ToastrService,private router: Router,
    private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
  
    let mealId = this.currentRoute.snapshot.paramMap.get('id');
    if (mealId == null)
    {}
  else {
    this.service.OpenMealDetail(parseInt(mealId)).then(res => {
      this.service.formDatas = Object.assign({mealId},);
    })
  };
  this.servicec.refreshList();
  this.serviced.refreshList();
  this.service.refreshList(); 
}
populateForm(selectedRecord:ComponentDetail)
{
  this.serviced.formDataa.componentId = selectedRecord.componentId;
  this.serviced.formDataa.mealId=this.service.formDatas.mealId;

  
     this.serviced.postContentDetail().subscribe(
    res => {
       this.serviced.refreshList();
      this.toastr.success('Dodano','Dodano nowy składnik')
    }
      );
}

insertRecord(formDataa:NgForm){
  this.serviced.postContentDetail().subscribe(
    res => {
      
      this.service.refreshList();
      this.toastr.success('Dodano','Dodano nowy składnik')
    },
    err =>{console.log(err);}
      );
    }

    onDelete(selectedRecord:ComponentDetail){
      this.serviced.formDataa.componentId = selectedRecord.componentId;
      this.serviced.formDataa.mealId=this.service.formDatas.mealId;
      this.serviced.deleteContentDetail().subscribe(
        res => {
           this.serviced.refreshList();
          this.toastr.error('Usunięto','Usunięto składnik')
        }
          );
     
    }

// onDelete(selectedRecord:ComponentDetailMealDetail){
//   if(confirm('Czy jesteś pewny że chcesz usunąć składnik?')){
//     this.serviced.formDataa.componentId = selectedRecord.componentId;
//     this.serviced.deleteContentDetail(this.serviced.formDataa.componentId)
//   .subscribe(
//   res =>{
// this.service.refreshList();
// this.toastr.error("Usunięto","Usunięto składnik")
//   },
//   err => {console.log(err)}
//   )
// }}
}
