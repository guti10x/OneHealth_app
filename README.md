## Levantar servidor local con Ionic

Para iniciar la aplicación en modo desarrollo con live reload:

```bash
ionic serve
```


## Emular App en Android Studio

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

## Configuración de Firebase

Pasos para integrar Firebase en el proyecto:

### 1. Iniciar sesión en Firebase

```bash
firebase login
```

### 2. Verificar los proyectos disponibles

```bash
firebase projects:list
```

### 3. Inicializar Firebase en el proyecto

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
      
### 4. Añadir Firebase al proyecto Angular/Ionic

```bash
ng add @angular/fire
```
