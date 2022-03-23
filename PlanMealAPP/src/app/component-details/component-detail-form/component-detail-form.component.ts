import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ComponentDetailService } from 'src/app/shared/component-detail.service';
import { ComponentDetail } from 'src/app/shared/component-detail.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-component-detail-form',
  templateUrl: './component-detail-form.component.html',
  styles: [
  ]
})
export class ComponentDetailFormComponent implements OnInit {
  
  constructor(private router: Router,public service:ComponentDetailService,private toastr:ToastrService) { }

  ngOnInit(): void {
  
  }
onSubmit(form:NgForm){
 
  if(this.service.formData.componentId == 0)
  this.insertRecord(form);
  
  else
  this.updateRecord(form);
 
}
 

insertRecord(form:NgForm){
  this.service.postContentDetail().subscribe(
    res => {
      this.resetForm(form);
      this.service.refreshList();
      this.toastr.success('Dodano','Dodano nowy składnik')
    },
    err =>{console.log(err);}
      );
    }

updateRecord(form:NgForm){
  this.service.putContentDetail().subscribe(
    res => {
      this.resetForm(form);
      this.service.refreshList();
      this.toastr.info('Zaaktualizowano','Zaaktualizowano składnik')
    },
    err =>{console.log(err);}
      );
}

    resetForm(form:NgForm){
      form.form.reset();
      this.service.formData = new ComponentDetail();
    }
}
