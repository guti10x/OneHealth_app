import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  // Método para obtener la informacion de un dispositivo
  async getDeviceInfo(): Promise<any> {
    const info = await Device.getId();
    //console.log(info);
    return info;
  }

   // Método para añadir un documento a una colección
  async getBatteryInfo(collectionName: string, data: any) {
    const info = await Device.getBatteryInfo();
      
    console.log(info);
    
  }
}
