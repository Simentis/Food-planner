import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ComponentDetail } from '../shared/component-detail.model';
import { ComponentDetailService } from '../shared/component-detail.service';
import { UserService } from 'src/app/shared/user.service';
@Component({
  selector: 'app-component-details',
  templateUrl: './component-details.component.html',
  styles: [
  ]
})
export class ComponentDetailsComponent implements OnInit {

  constructor(public service: ComponentDetailService, public toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();

  }
populateForm(selectedRecord:ComponentDetail)
{
  this.service.formData = Object.assign({},selectedRecord);
  
}
onDelete(id:number){
  if(confirm('Czy jesteś pewny że chcesz usunąć składnik?')){
  this.service.deleteContentDetail(id)
  .subscribe(
  res =>{
this.service.refreshList();
this.toastr.error("Usunięto","Usunięto składnik")
  },
  err => {console.log(err)}
  )
}}
}
