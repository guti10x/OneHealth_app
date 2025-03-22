import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class IdServiceService {

  constructor(private firestore: Firestore) {}

  private idValue: string | null = null;

  // Método para inicializar el id_value
  setIdValue(id: string): void {
    this.idValue = id;
  }

  // Método para obtener el id_value
  getIdValue(): string | null {
    return this.idValue;
  }

  // Método para guardar el ID en la base de datos Firestore
  async saveIdToDatabase(): Promise<void> {
    
    try {
      await addDoc(collection(this.firestore, 'ids'), {
        id: this.idValue,
        timestamp: new Date().toISOString(),
      });
      console.log('ID guardado en Firestore:', this.idValue);
    } catch (error) {
      console.error('Error al guardar el ID en Firestore:', error);
    }
  }
  
}
