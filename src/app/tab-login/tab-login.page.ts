import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-login',
  templateUrl: './tab-login.page.html',
  styleUrls: ['./tab-login.page.scss'],
  standalone: false
})
export class TabLoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/tabs']); 
  }
  

}
