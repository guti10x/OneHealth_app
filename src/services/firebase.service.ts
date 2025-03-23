import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) {}
 
  // ------------- POSTS ------------- // 
  // Formularios (mañana y noche
  guardarFormulario(data: any): Promise<any> {
    const collectionRef = collection(this.firestore, 'formularios');
    return addDoc(collectionRef, data);
  }

  // ------------- GETS ------------- // 
  // Predicciones / Alertas
  obtenerPredicciones(): Promise<any> {
    const collectionRef = collection(this.firestore, 'predictions');
    return getDocs(collectionRef).then(snapshot => {
      return snapshot.docs.map(doc => doc.data());
    });
  }
  // Datos de sueño
  obtenerDatosSueño(): Promise<any> {
    const collectionRef = collection(this.firestore, 'sleep_data');
    return getDocs(collectionRef).then(snapshot => {
      return snapshot.docs.map(doc => doc.data());
    });
  }

  // Datos de uso del móvil
  obtenerDatosApps(): Promise<any> {
    const collectionRef = collection(this.firestore, 'mobile_data');
    return getDocs(collectionRef).then(snapshot => {
      return snapshot.docs.map(doc => doc.data());
    });
  }
  // Datos biométricos
  obtenerDatosBiometricos(): Promise<any> {
    const collectionRef = collection(this.firestore, 'biometric_data');
    return getDocs(collectionRef).then(snapshot => {
      return snapshot.docs.map(doc => doc.data());
    });
  }


}
