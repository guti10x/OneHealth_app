import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }
  
  async getCurrentPosition() {
    try {
      const position = await Geolocation.getCurrentPosition();
      console.log('Latitud:', position.coords.latitude);
      console.log('Longitud:', position.coords.longitude);
      return position;
    } catch (error) {
      console.error('Error al obtener la posición: ', error);
      throw error;
    }
  }
}
