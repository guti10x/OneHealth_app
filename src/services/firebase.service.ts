import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, query, where, orderBy, limit } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) {}
 
  // -------------------------- POSTS ----------------------------------------------------------- // 
  // Formularios (mañana y noche
  guardarFormulario(data: any): Promise<any> {
    const collectionRef = collection(this.firestore, 'formularios');
    return addDoc(collectionRef, data);
  }

  // ----------------- GETS ----------------------------------------------------------- // 
  
  // ------------ Datos de sueño --------------------------------- //

  // Obtener el último registro recogido de datos del sueño por un formulario asociado a un id
  obtenerFormularioMasReciente(id: string): Promise<any> {
    const collectionRef = collection(this.firestore, 'formularios');
    const q = query(
      collectionRef,
      where('id_user', '==', id),
      orderBy('recorded_at', 'desc'),
      limit(1)
    );
  
    return getDocs(q).then(snapshot => {
      if (snapshot.empty) {
        console.log("No se encontraron formularios.");
        return null;
      }
  
      const doc = snapshot.docs[0];
      const data = doc.data();
  
      // Convertir recorded_at a fecha legible si es un Timestamp
      if (data['recorded_at'] && data['recorded_at'].toDate) {
        data['recorded_at'] = data['recorded_at'].toDate();
      }
  
      console.log("Datos del formulario a mostrar:", data);
      return data;
    });
  }

  buscarFormularioDiaAnterior(id: string): Promise<any> {
    const collectionRef = collection(this.firestore, 'formularios');
  
    // Obtener fecha de ayer en UTC
    const ahora = new Date();
    const ayer = new Date(Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate() - 1, 6, 0, 0, 0)); // 6:00 AM UTC de ayer
    const limite = new Date(Date.UTC(ayer.getUTCFullYear(), ayer.getUTCMonth(), ayer.getUTCDate(), 18, 0, 0, 0)); // 6:00 PM UTC de ayer
  
    const q = query(
      collectionRef,
      where('id_user', '==', id),
      where('recorded_at', '>=', ayer),
      where('recorded_at', '<=', limite),
      orderBy('recorded_at', 'desc'),
      limit(1)
    );
  
    return getDocs(q).then(snapshot => {
      if (snapshot.empty) {
        console.log(`No se encontraron formularios en el rango especificado. Rango: desde ${ayer.toISOString()} hasta ${limite.toISOString()}.`);
        return null;
      }
  
      const doc = snapshot.docs[0];
      const data = doc.data();
      data['id'] = doc.id;
  
      if (data['recorded_at'] && data['recorded_at'].toDate) {
        data['recorded_at'] = data['recorded_at'].toDate();
      }
  
      console.log("Formulario del día anterior:", data);
      return data;
    });
  }  
  

  // ------------ Datos de uso del móvil ------------------------- //
  obtenerDatosApps(): Promise<any> {
    const collectionRef = collection(this.firestore, 'mobile_data');
    return getDocs(collectionRef).then(snapshot => {
      return snapshot.docs.map(doc => doc.data());
    });
  }


  // ------------ Datos de biométricos -------------------------- //
  obtenerDatosBiometricos(): Promise<any> {
    const collectionRef = collection(this.firestore, 'biometric_data');
    return getDocs(collectionRef).then(snapshot => {
      return snapshot.docs.map(doc => doc.data());
    });
  }


  // ------------ Datos de Predicciones / Alertas --------------- //
  obtenerPredicciones(): Promise<any> {
    const collectionRef = collection(this.firestore, 'predictions');
    return getDocs(collectionRef).then(snapshot => {
      return snapshot.docs.map(doc => doc.data());
    });
  }
}
