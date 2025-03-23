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

  userId: string = '';

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/tabs']); 
  }
  
  redirectToNewID() {
    window.location.href = 'https://onehealth-dowload.vercel.app';
  }

}
