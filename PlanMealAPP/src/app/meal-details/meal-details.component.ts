import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MealDetail } from '../shared/meal-detail.model';
import { MealDetailService } from '../shared/meal-detail.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styles: [
  ]
})
export class MealDetailsComponent implements OnInit {

  constructor(public service: MealDetailService, private router: Router,public toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
    
  }
populateForm(selectedRecord:MealDetail)
{
  this.service.formData = Object.assign({},selectedRecord);
  
}
onAddComponents(mealId:number){
 
  this.service.OpenMealDetail(mealId)
  this.router.navigate(['meals/detail/'+mealId]);

  }
onDelete(id:number){
  if(confirm('Czy jesteś pewny że chcesz usunąć posiłek?')){
  this.service.deleteMealDetail(id)
  .subscribe(
  res =>{
this.service.refreshList();
this.toastr.error("Usunięto","Usunięto posiłek")
  },
  err => {console.log(err)}
  )
}}
}
