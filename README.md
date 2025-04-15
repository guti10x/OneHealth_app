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
