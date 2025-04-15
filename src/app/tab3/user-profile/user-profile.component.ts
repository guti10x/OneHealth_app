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
  
  downloadPrivacyPolicy() {
    const link = document.createElement('a');
    link.href = '/assets/docs/UE Consentimiento informado Proyecto App marzo 25.pdf';
    link.download = 'privacy-policy.pdf';
    link.click();
  }

  copyUserId() {
    if (this.userId) {
      navigator.clipboard.writeText(this.userId).then(() => {
        console.log('User ID copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy User ID: ', err);
      });
    } else {
      console.warn('No User ID to copy');
    }
  }
}
