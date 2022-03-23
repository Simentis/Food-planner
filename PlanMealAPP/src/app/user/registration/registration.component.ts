import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Form } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService,private router: Router) { }

  ngOnInit() {
    this.service.formMode.reset();
  }

  onSubmit() {

      
  
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formMode.reset();
          this.toastr.success('Nowy użytkownik!', 'Możesz się teraz zalogować.');
          this.router.navigateByUrl('/user/login');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Taki użytkownik już istnieje','Rejestracja nie powiodła sie.');
                break;

              default:
              this.toastr.error(element.description,'Rejestracja nie powiodła sie.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }

    );
  }

}
