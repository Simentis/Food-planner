import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter,CalendarView, } from 'angular-calendar';
import { Subject } from 'rxjs';
import {isSameDay,isSameMonth,addHours, addMinutes,} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import{CalendarEventService} from'../shared/calendar-event.service';
import {HttpClient} from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { Polish } from 'flatpickr/dist/l10n/pl.js';
import { registerLocaleData } from '@angular/common';
import flatpickr from 'flatpickr';
import { UserService } from '../shared/user.service';
import { MealDetailService } from '../shared/meal-detail.service';
import { MealDetail } from '../shared/meal-detail.model';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import { MealDetailComponentService } from '../shared/meal-detail-component.service';
import { ComponentDetailService } from '../shared/component-detail.service';
import locale from '@angular/common/locales/pl';
registerLocaleData(locale);
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#a0523a',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-calendar',

  styles: [ 
    `
      h3 {
        margin: 0 0 10px;
      }
      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: 'calendar.component.html',
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],	

}
)
export class CalendarComponent implements OnInit{
  showAll = false;

  readonly baseURL = 'http://localhost:36779/api/CalendarEvent/';
  userDetail: Object;
selectedMeal:MealDetail;

  constructor(public serviced:MealDetailComponentService,public servicee:ComponentDetailService,public servicec:MealDetailService,public services:UserService,public service:CalendarEventService,private http:HttpClient,private modal: NgbModal,public toastr:ToastrService) { flatpickr.localize(Polish);}
  items:CalendarEvent[]=[];
filtring;  
locale = "pl";
ref(){ 
  return this.http.get<Array<CalendarEvent>>(this.baseURL)
.toPromise()
.then(res=>{
  this.items=[];
 for (let i in res)
 {
  this.items.push({
    id:(res[i].id),
    
    color:colors.blue,
  start:new Date(res[i].start),
    end:new Date(res[i].end),
    title:(res[i].title),
    actions: this.actions,
    allDay: false,
  });   
  this.events=this.items;
  
  
}
;       
        })
};
userDetails;
  ngOnInit(): void {
    this.servicec.refreshList(); 
    this.serviced.refreshList();
    this.servicee.refreshList(); 
  this.ref();
  this.events=this.items;
  this.filtring=new Date();
  }
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[];
  refresh = new Subject<void>();
  updatedatas?:UpdateEvent;
  update(id,updatedata:UpdateEvent){
    this.updatedatas=
    {id: updatedata.id,
      start:addHours(new Date(updatedata.start),1),
      end:addHours(addMinutes(new Date(updatedata.start),10),1),
      title:updatedata.title};
      return this.http.put(this.baseURL+id,this.updatedatas)
      .subscribe(
      res => {
        this.ref();
    
        
        
      },
      err =>{console.log(err);}
        )
        ;
  }
  events:CalendarEvent[]=
     [
         {
           start: new Date('2022-02-04T10:48:36.253'),
          end: new Date(	'2022-02-04T15:48:36.253'),
           title: 'A 3 day event',
          color: colors.red,
           allDay: true,
    
       },];
    
  activeDayIsOpen: boolean = true;
  bok: any[]; 

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
      
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    
     this.service.postContentDetail().subscribe(
       res => {
       
         this.toastr.success('Dodano','Dodano nowy posiłek do kalendarza')
       },
       err =>{console.log(err);}
         );
       
        location.reload();
  
   }

  deleteEvent(eventToDelete: CalendarEvent, id) {
    
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.service.deleteContentDetail(id) .subscribe(
      res =>{
    this.service.refreshList();
    this.toastr.error("Usunięto","Usunięto zaplanowany posiłek z kalendarza")
      },
      err => {console.log(err)}
      )
    

  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
export interface UpdateEvent{
  id?: string | number;
  start: Date;
  end?: Date;
  title: string;
}

