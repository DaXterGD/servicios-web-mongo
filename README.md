# GA7-220501096-AA5-EV01 Diseño y desarrollo de servicios web - caso

Este repositorio contiene la solución para la evidencia **GA7-220501096-AA5-EV01**, cuyo enunciado es el siguiente.
Tomando como referencia lo visto en el componente formativo **“Construcción de API”**, realizar el diseño y la codificación de un servicio web para el siguiente caso:

- Se requiere realizar un servicio web para un registro y un inicio de sesión. El servicio recibirá un usuario y una contraseña, si la autenticación es correcta saldrá un mensaje de autenticación satisfactoria en caso contrario debe devolver error en la autenticación. 
- El código debe contener comentarios
- Se debe crear el proyecto utilizando herramientas de versionamiento.

## Formas de probar este proyecto

**1.  Clonar el repositorio**
Para clonar este repositorio y preparar el proyecto has lo siguiente:
- Usa en tu terminal el comando `git clone https://github.com/DaXterGD/servicios-web-mongo.git`
- Pocisionate dentro del directorio del repositorio y posteriormente en el directorio donde esta construido el **cliente** de la aplicación usando el comando`cd servicios-web-mongo/client` y abre tu editor con `code .` o `code-insiders .`
- Si usas el editor de código [Visual Studio Code](https://code.visualstudio.com/), descarga la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para levantar un servidor local en el que podrás probar los archivos **HTML**
- Abre el archivo `index.html`
![index](https://i.imgur.com/OBVuOOV.png)
- Abre este archivo con **Live Server** usando el botón **"Go Live"** ubicado en la parte inferior derecha del editor
![live server](https://i.imgur.com/ujbPGi0.png)

**2.  A través de la aplicación alojada en Netlify (recomendada)**
- Usa el siguiente **[enlace](https://acomernoseso.netlify.app/)** para acceder al sitio y probarlo en el entorno de producción de [Netlify](https://www.netlify.com/). Ten en cuenta que para acceder, primero debes [registarte](https://acomernoseso.netlify.app/sign-up)
![login](https://i.imgur.com/4VuF9ug.png)

## API del proyecto
La **API** de este proyecto se encuentra alojada en el siguiente **[enlace](https://a-comernos-eso-api.onrender.com/)** a través del servicio [Render](https://render.com/), sin embargo, Esta **API** no cuenta con una ruta inicial o ruta por defecto. Para consultar los usuarios almacenados en la base de datos, usa la ruta `/users` o este **[enlace](https://a-comernos-eso-api.onrender.com/users).**

Si quieres examinar el código de esta **API** hecha en [Express](https://expressjs.com/), clona el repositorio con el comando `git clone https://github.com/DaXterGD/servicios-web-mongo.git`. El código referente al servidor se encuentra en el directorio `server`