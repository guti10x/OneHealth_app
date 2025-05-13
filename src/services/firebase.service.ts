import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, query, where, orderBy, limit, Timestamp } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) {}

  init(){}
 
  // -------------------------- FORMULARIOS ----------------------------------------------------------- // 
  // Formularios (mañana y noche)
  guardarFormulario(data: any): Promise<any> {
    const collectionRef = collection(this.firestore, 'formularios');
    return addDoc(collectionRef, data);
  }

  // Función para verificar si existe un formulario en un rango de fechas
  async obtenerFormularios(fechaInicio: number, fechaFin: number, idUser: string): Promise<any[]> {
    // Convertir las fechas a Timestamp de Firebase en UTC
    const fechaInicioTimestamp = Timestamp.fromMillis(fechaInicio);
    const fechaFinTimestamp = Timestamp.fromMillis(fechaFin);

    // console.log('Obteniendo formularios entre', fechaInicioTimestamp.toDate().toUTCString(), 'y', fechaFinTimestamp.toDate().toUTCString(), 'para el usuario', idUser);

    // Referencia a la colección y consulta
    const collectionRef = collection(this.firestore, 'formularios');
    const q = query(
      collectionRef,
      where('recorded_at', '>=', fechaInicioTimestamp),
      where('recorded_at', '<=', fechaFinTimestamp),
      where('id_user', '==', idUser)
    );

    const querySnapshot = await getDocs(q);

    // Mapeamos los documentos encontrados
    const formularios = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    //console.log('Formularios obtenidos:', formularios);
    return formularios;
  }

  // Obtener los datos del formulario de mañana del día anterior
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

  // ----------------- DASHBOARD ----------------------------------------------------------- // 
    
  // ------------ Datos de sueño // Datos de uso del móvil --------------------------------- //
 
  // Obtener el último registro recogido de datos del sueño y uso de aplicaciones por un formulario asociado a un id
  obtenerFormularioNocheMasReciente(id: string): Promise<any> {
    const collectionRef = collection(this.firestore, 'formularios');
    const q = query(
      collectionRef,
      where('id_user', '==', id),
      orderBy('recorded_at', 'desc')
    );

    return getDocs(q).then(snapshot => {
      if (snapshot.empty) {
        console.log("No se encontraron formularios.");
        return null;
      }

      const docNoche = snapshot.docs.find(doc => doc.data()['apathyLevel'] !== undefined);

      if (!docNoche) {
        console.log("No se encontró formulario de noche.");
        return null;
      }

      const data = docNoche.data();

      if (data['recorded_at'] && data['recorded_at'].toDate) {
        data['recorded_at'] = data['recorded_at'].toDate();
      }

      console.log("Formulario de noche:", data);
      return data;
    });
  }

  obtenerFormularioMañanaMasReciente(id: string): Promise<any> {
    const collectionRef = collection(this.firestore, 'formularios');
    const q = query(
      collectionRef,
      where('id_user', '==', id),
      orderBy('recorded_at', 'desc')
    );

    return getDocs(q).then(snapshot => {
      if (snapshot.empty) {
        console.log("No se encontraron formularios.");
        return null;
      }

      const docDia = snapshot.docs.find(doc => doc.data()['apathyLevel'] === undefined);

      if (!docDia) {
        console.log("No se encontró formulario de día.");
        return null;
      }

      const data = docDia.data();

      if (data['recorded_at'] && data['recorded_at'].toDate) {
        data['recorded_at'] = data['recorded_at'].toDate();
      }

      console.log("Formulario de día:", data);
      return data;
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
  async obtenerUltimaPrediccion(id: string): Promise<any> {
    console.log("Service: Fetching the latest prediction for user ID:", id);
    const collectionRef = collection(this.firestore, 'model_predictions');
    const q = query(
      collectionRef,
      where('id_user', '==', id),
      orderBy('recorded_at', 'desc'),
      limit(1)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      console.log("No predictions found.");
      return null;
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    // Convert recorded_at to a readable date if it's a Timestamp
    if (data['recorded_at'] && data['recorded_at'].toDate) {
      data['recorded_at'] = data['recorded_at'].toDate();
    }

    console.log("Latest prediction found:", data);
    return data;
  }

}
