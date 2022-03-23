import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { CalendarEvent } from 'angular-calendar';
import { addDays, addHours, addMinutes, startOfDay } from 'date-fns';


@Injectable({
  providedIn: 'root'
})
export class CalendarEventService {
  formData;

  constructor(private http:HttpClient) { }
  readonly baseURL = 'http://localhost:36779/api/CalendarEvent/'
  list:CalendarEvent[];
  Data={
title: '',
start: addHours(addDays(startOfDay(new Date()),1),10),
end: addHours(addDays(addMinutes(startOfDay(new Date()),15),1),1),
color: "blue",
id:0,
allDay:false,
};
  refreshList(){
    return this.http.get<Array<CalendarEvent>>(this.baseURL)
.toPromise()
.then(res=>this.list = res as Array<CalendarEvent>)
}

deleteContentDetail(id){
  return this.http.delete(this.baseURL+id)
}
postContentDetail(){
  return this.http.post(this.baseURL,this.Data)
}


}
