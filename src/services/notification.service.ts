import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { environment } from 'src/environments/environment';
import OneSignal from 'onesignal-cordova-plugin';
import { Browser } from '@capacitor/browser';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  init(){

    const isPushNotificationAvailable = Capacitor.isPluginAvailable('PushNotifications');

    if(isPushNotificationAvailable){
      PushNotifications.requestPermissions().then( (result) => {
        if (result.receive){
          OneSignal.initialize(environment.oneSignalID);
          OneSignal.Notifications.addEventListener('click',
            (e: { notification: any; })=>{
              const notification = e.notification;
              
            }
          );
        }
      }
    );
    }
  }
  
}
