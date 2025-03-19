import { Component, OnInit, Input, Inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  imports: [IonicModule]
})
export class UserProfileComponent  implements OnInit {

  ngOnInit() {}

  @Input() userId: string = 'ID-123456'; 

  constructor() {}


}
