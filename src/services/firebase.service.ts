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
  // Predicciones

  // Sueño

  // Apps mas usadas

  // Ansiedad

  // Depresión


}
