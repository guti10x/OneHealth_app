import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, updateDoc } from '@angular/fire/firestore';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  deviceid =''

  userData = {
    id: "",
    timestamp: "",
    device: ""
  };

  constructor(private firestore: Firestore,    
      private deviceService: DeviceService) {}

 // Método para verificar si un ID ya existe en Firestore
 async checkIfIdExists(id: string): Promise<boolean> {
  try {
    const q = query(collection(this.firestore, 'users'), where('id', '==', id));
    const querySnapshot = await getDocs(q);
    
    // Devuelve true si existe un id igual
    if(!querySnapshot.empty){
      await this.getInfo();
      console.log(this.deviceid);
      
      const now = new Date();
      const userData = { id: id, device: this.deviceid, timestamp: now.toISOString() }; 
      // actualizamos el registro con la id del dispositivo
      await updateDoc(querySnapshot.docs[0].ref, userData);
     
      return true;
    }else{
      return false;
    }
  } catch (error) {
    console.error('Error al verificar el ID en Firestore:', error);
    return false;
  }
}

async getInfo() {
  try {
    const deviceInfo = await this.deviceService.getDeviceInfo();
    console.log("EL ID del dispositivo es: ", deviceInfo);
    this.deviceid = deviceInfo; // Asigna el objeto entero
  } catch (error) {
    console.error('Error al obtener el Device ID:', error);
  }
}


}
