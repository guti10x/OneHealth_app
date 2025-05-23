# OneHealth app
Aplicación para la recogida y visualización de datos procesados y recopilados del usuario mediante de múltiples fuentes. Por un lado, se obtienen métricas biométricas procedentes de los dispositivos wearables que porta el usuario, como pulseras o anillos inteligentes. Además, recoge datos sobre los patrones de uso del teléfono móvil y metadatos relacionados, como el tiempo de uso de pantalla, la frecuencia de desbloqueos o las aplicaciones más utilizadas, utilizando para ello la API de Capacitor. También recopila indicadores subjetivos del estado anímico a través de formularios breves diarios que permiten al usuario expresar cómo se siente.

Todos estos datos se almacenan y se procesan de forma automática para posteriormente ser visualizados dentro de la propia aplicación. Esta funcionalidad permite al usuario identificar patrones relevantes en sus datos recopilados y en conecuencia realizar un seguimiento personalizado de su bienestar emocional. Además, la aplicación ofrece recomendaciones personalizadas y alertas con el objetivo de prevenir la aparición de crisis de ansiedad, facilitando la toma de conciencia sobre los hábitos o situaciones que podrían estar contribuyendo a su aparición.

![Captura de paDDDntalla 2025-05dd-09 191833](https://github.com/user-attachments/assets/6edacd68-6758-4f19-a3f0-e92926850022)

## Descarga de la Aplicación
- **Web pública de descarga:** [https://onehealth-dowload.vercel.app/](https://onehealth-dowload.vercel.app/)
- **Repositorio en GitHub:** [gut10x/Onehealth_dowload](https://github.com/guti10x/Onehealth_dowload.git)

## Diagrama de arquitectura de la aplicación
![codeviz-diagramdfefefefefe-2025-05edededededdfefeeedered-13T22-39-46 drawio](https://github.com/user-attachments/assets/4d06916c-06bb-405c-8072-bc858ac44526)

## Ventanas de la aplicación
![alltabsAps](https://github.com/user-attachments/assets/00e22830-1d3e-428d-a3c2-2515415f687d)

## Levantar la aplicacción de forma local

Para iniciar la aplicación en modo desarrollo con live reload:

```bash
ionic serve
```

---

## Generacción del archivo APK nativo de Android:

#### 1. Eliminar la carpeta `www` antigua

Si existe una carpeta `www` de builds anteriores, la eliminamos para limpiar el entorno y evitar posibles conflictos.

```bash
Remove-Item -Recurse -Force .\www
```

#### 2. Compilar la app

Generamos el contenido actualizado dentro de la carpeta `www`.

```bash
ionic build
```

#### 3. Copiar los cambios al proyecto Android

Copiamos el contenido generado por el build al proyecto nativo de Android.

```bash
ionic cap copy
```

#### 4. Abrir el proyecto en Android Studio

Abrimos el proyecto en Android Studio desde la línea de comandos.

```bash
ionic cap open android
```

### 5. Generar el APK desde Android Studio
1. En Android Studio, selecciona **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
2. Espera a que finalice el proceso. El APK generado estará disponible en la carpeta `app/build/outputs/apk/`.
3. Este archivo APK generado se descargará en cualquier dispositivo Android y podrá instalare la aplicación.

---

## Despliegue de la aplicación como PWA (Progressive Web App)

#### Paso 1: Habilitar PWA en tu proyecto Angular

```bash
ng add @angular/pwa
```

#### Paso 2: Compilar el proyecto para producción

```bash
ionic build --prod
```

#### Paso 3: Configurar Firebase

Instala la CLI de Firebase:

```bash
npm install -g firebase-tools
```

####  Paso 4: Inicia sesión en Firebase:

```bash
firebase login
```
Marcar (*) Hosting 
Selecciona el proyecto y la carpeta `www` como directorio público.

#### Paso 5: Desplegar a Firebase Hosting

```bash
firebase deploy
```

---

## Configuración de Firebase

Pasos para integrar Firebase en el proyecto:

#### 1. Iniciar sesión en Firebase

```bash
firebase login
```

#### 2. Verificar los proyectos disponibles

```bash
firebase projects:list
```

#### 3. Inicializar Firebase en el proyecto

Para inicializar Firebase en el proyecto, ejecuta el siguiente comando:

```bash
firebase init
```

Durante la inicialización, sigue estos pasos:

1. **Confirmar que deseas continuar** : responde `Yes` cuando se te pregunte:  
    `? Are you ready to proceed? Yes`

2. **Seleccionar las características a configurar** : usa la tecla `Espacio` para marcar lasiguiente opciones y `Enter` para confirmar:  
    `(*) Firestore: Configure security rules and indexes files for Firestore`

3. **Asociar el directorio actual con un proyecto existente** : selecciona el proyecto correspondiente al proyecto:  
    `i  Using project onehealth-f4967 (onehealth)`

4. **Definir los archivos de configuración** : proporciona los nombres de los archivos para las reglas de seguridad y los índices de Firestore:  
    - Para las reglas de seguridad:  
      `? What file should be used for Firestore Rules? firestore.rules`
    - Para los índices de Firestore:  
      `? What file should be used for Firestore indexes? firestore.indexes.json`
      
#### 4. Añadir Firebase al proyecto Angular/Ionic

```bash
ng add @angular/fire
```
