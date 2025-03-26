import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  imports: [IonicModule]
})
export class UserProfileComponent  implements OnInit {

  constructor(private router: Router) {}

  userId: string = ''; 

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';
  }

  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/tab-login']);
  }
  
}
