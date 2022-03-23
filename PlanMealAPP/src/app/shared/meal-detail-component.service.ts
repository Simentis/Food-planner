import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentDetailMealDetail } from './component-detail-meal-detail.model';

@Injectable({
  providedIn: 'root'
})
export class MealDetailComponentService {

  constructor(private http:HttpClient) { }
  readonly baseURL = 'http://localhost:36779/api/ComponentDetailMealDetails/' 
  formDataa:ComponentDetailMealDetail = new ComponentDetailMealDetail();
  list:ComponentDetailMealDetail[];
  postContentDetail(){
      return this.http.post(this.baseURL,this.formDataa)
  }
  putContentDetail(){
      return this.http.put(this.baseURL+this.formDataa.componentId,this.formDataa)
  }
  deleteContentDetail(){
        return this.http.delete(this.baseURL+this.formDataa.componentId+'%2C'+this.formDataa.mealId+'?id='+this.formDataa.componentId+'&idt='+this.formDataa.mealId)
  }
  refreshList(){
        return this.http.get(this.baseURL)
  .toPromise()
  .then(res=>this.list = res as ComponentDetailMealDetail[])
  }
  
}
