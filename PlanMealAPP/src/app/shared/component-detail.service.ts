import { Injectable } from '@angular/core';
import { ComponentDetail } from './component-detail.model';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class ComponentDetailService {

  constructor(private http:HttpClient) { }
  readonly baseURL = 'http://localhost:36779/api/ComponentDetail/' 
  formData:ComponentDetail = new ComponentDetail();
  list:ComponentDetail[];
  postContentDetail(){
      return this.http.post(this.baseURL,this.formData)
  }
  putContentDetail(){
      return this.http.put(this.baseURL+this.formData.componentId,this.formData)
  }
  deleteContentDetail(id:number){
        return this.http.delete(this.baseURL+id)
  }
  refreshList(){
        return this.http.get(this.baseURL)
  .toPromise()
  .then(res=>this.list = res as ComponentDetail[])
  }
  
}
