import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { environment } from 'src/environments/environment';
import OneSignal from 'onesignal-cordova-plugin';
import { AuthService } from './auth.service'; // Ejemplo
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private authService: AuthService, // Suponiendo que tienes auth
    private firestoreService: FirebaseService // Para guardar el ID
  ) { }

  init() {
    const isPushNotificationAvailable = Capacitor.isPluginAvailable('PushNotifications');

    if (isPushNotificationAvailable) {
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive) {
          // 1. Inicializar OneSignal
          OneSignal.initialize(environment.oneSignalID);

          // 2. Obtener el Player ID
          (OneSignal as any).getIds((ids: any) => {
            const playerId = ids.userId;
            console.log('OneSignal Player ID:', playerId);

            // 3. Obtener id del usuario actual
            const id = localStorage.getItem('userId') || '';
            if (id && playerId) {
              // 4. Guardar el playerId en tu base de datos
              this.firestoreService.savePlayerId(id, playerId); // PENDINGGgggggggggggggggggggggggggggggggggggg
            }
          });

          // 5. Listener para cuando el usuario haga clic en una notificación
          OneSignal.Notifications.addEventListener('click', (e: { notification: any }) => {
            const notification = e.notification;
            console.log('Notificación clickeada:', notification);
            // Aquí puedes hacer navegación o lógica adicional
          });
        }
      });
    }
  }
}
