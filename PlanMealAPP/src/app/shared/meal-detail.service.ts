import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { MealDetail } from './meal-detail.model';

@Injectable({
  providedIn: 'root'
})
export class MealDetailService {

  constructor(private http:HttpClient) { }
  readonly baseURL = 'http://localhost:36779/api/MealDetail/'  
  formData:MealDetail = new MealDetail();
  formDatas:MealDetail=new MealDetail();
  list:MealDetail[];
  postMealDetail(){
    return this.http.post(this.baseURL,this.formData)
}
putMealDetail(){
    return this.http.put(this.baseURL+this.formData.mealId,this.formData)
}
deleteMealDetail(id:number){
      return this.http.delete(this.baseURL+id)
}
refreshList(){
      return this.http.get(this.baseURL)
.toPromise()
.then(res=>this.list = res as MealDetail[])
}
OpenMealDetail(id:number) {
return this.http.get(this.baseURL + id)
.toPromise()
}

}

