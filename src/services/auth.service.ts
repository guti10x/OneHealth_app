import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private firestore: Firestore) {}

 // Método para verificar si un ID ya existe en Firestore
  async checkIfIdExists(id: string): Promise<boolean> {
    try {
      const q = query(collection(this.firestore, 'ids'), where('id', '==', id));
      const querySnapshot = await getDocs(q);
      
      // Devuelve true si existe un id igual
      return !querySnapshot.empty; 
    } catch (error) {
      console.error('Error al verificar el ID en Firestore:', error);
      return false;
    }
  }
}
