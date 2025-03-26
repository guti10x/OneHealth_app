import { Injectable } from '@angular/core'; 
import { Firestore, collection, getDocs, addDoc, query, where, Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) {}
 
  // ------------- POSTS ------------- // 
  // Formularios (mañana y noche)
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

  // Función para verificar si existe un formulario en un rango de fechas
  async obtenerFormularios(fechaInicio: number, fechaFin: number): Promise<any[]> {
    // Convertir las fechas a Timestamp de Firebase (en UTC)
    const fechaInicioTimestamp = Timestamp.fromMillis(fechaInicio);
    const fechaFinTimestamp = Timestamp.fromMillis(fechaFin);
  
    console.log('Obteniendo formularios entre', fechaInicioTimestamp.toDate().toUTCString(), 'y', fechaFinTimestamp.toDate().toUTCString());
    
    // Crear la consulta para obtener formularios entre fechaInicio y fechaFin
    const collectionRef = collection(this.firestore, 'formularios');
    const q = query(
      collectionRef,
      where('recorded_at', '>=', fechaInicioTimestamp),
      where('recorded_at', '<=', fechaFinTimestamp)
    );
    
    const querySnapshot = await getDocs(q);
  
    // Mapeamos los resultados
    const formularios = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log('Formularios obtenidos:', formularios);
    
    return formularios;
  }
}