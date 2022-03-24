import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  userDetails;
  items: MenuItem[];
  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Kalendarz', routerLink: ['/calendar'],
         
      },
      {
        label: 'Posiłki', routerLink: ['/meals'],
         
      }, {
        label: 'Składniki', routerLink: ['/components'],
         
      },
  ];
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );
  }


  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
