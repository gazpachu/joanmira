---
title: Cómo configurar una aplicación Node.js (React ES6) para producción en Ubuntu con Nginx y autenticación básica
description: Unos apuntes sobre devops e infraestructura para proyectos ligeros y pequeños
cover: /blog/how-to-set-up-a-react-es6-app-for-production-on-ubuntu/images/ubuntu-react-nodejs.jpg
template: post
category: work
---

### Introducción

Node.js es un entorno de ejecución de JavaScript de código abierto para construir fácilmente aplicaciones del lado del servidor. La plataforma funciona en Linux, OS X, FreeBSD y Windows. Las aplicaciones Node.js pueden ejecutarse en la línea de comandos, pero nos centraremos en ejecutarlas como un servicio, de modo que se reinicien automáticamente al reiniciar o fallar, y puedan utilizarse con seguridad en un entorno de producción.

En este tutorial, cubriremos la configuración de un entorno Node.js listo para producción en un único servidor Ubuntu 16.04. Este servidor ejecutará una aplicación Node.js gestionada por PM2, y proporcionará a los usuarios un acceso seguro a la aplicación a través de un proxy inverso Nginx con autenticación básica.

### Prerrequisitos

Esta guía asume que tienes un servidor Ubuntu 16.04 (también funciona con Ubuntu 14). Si aún no tienes uno, te recomiendo [Digital Ocean](https://www.digitalocean.com/), [OVH](http://ovh.com) o [Amazon AWS](https://aws.amazon.com/).

También asume que tienes un nombre de dominio, apuntando a la dirección IP pública del servidor.

Comencemos por conectarnos al servidor vía SSH.

### Conectarse al servidor vía SSH

Una vez que tu servidor está en funcionamiento, debes tener una dirección IP o DNS que puedas utilizar para conectarte al servidor. En este ejemplo, vamos a utilizar las DNS de una micro instancia de Ubuntu de Amazon AWS EC2.

Durante el proceso de configuración del servidor, debes crear o utilizar una clave existente. Descárgala en una carpeta de tu ordenador (normalmente ~/.ssh/) y ejecuta el siguiente comando desde tu terminal:

`ssh -i ~/carpeta/para/su/ssh/key.pem ubuntu@ec2-28-28-82-82.eu-central-1.compute.amazonaws.com`

Esto debería darte acceso al servidor.

**Nota**: asegúrate de que tu instancia acepta tráfico HTTP. En Amazon AWS tienes que ir a *grupos de seguridad*, y añadir HTTP / TCP / Puerto 80 a las reglas de entrada del grupo de seguridad de tu instancia.

### Instalar Node.js

Vamos a instalar la última versión actual de Node.js, utilizando los archivos de paquetes de NodeSource.

Primero, necesitas instalar el PPA de NodeSource para poder acceder a su contenido. Asegúrate de que estás en tu directorio principal y utiliza curl para recuperar el script de instalación de los archivos de Node.js 6.x:

```
cd ~
curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
```

Y ejecuta el script bajo sudo:

`sudo bash nodesource_setup.sh`

El PPA se añadirá a tu configuración y tu caché de paquetes local se actualizará automáticamente. Después de ejecutar el script de configuración de nodesource, puedes instalar el paquete de Node.js de la misma manera que lo hiciste anteriormente:

`sudo apt-get install nodejs`

El paquete nodejs contiene el binario de nodejs así como npm, por lo que no necesitas instalar npm por separado. Sin embargo, para que algunos paquetes de npm funcionen (como los que requieren compilar código desde la fuente), necesitarás instalar el paquete build-essential:

`sudo apt-get install build-essential`.

Node.js está ahora instalado, y listo para ejecutar una aplicación!

### Clonar tu aplicación

Asegúrate de que git está instalado:

`sudo apt-get install git`

A continuación, clona tu aplicación desde GitHub (o cualquier otro repositorio) a `/opt/your_app`. El directorio /opt/ es una ubicación estándar para el software que no se instala desde los repositorios de paquetes oficiales de la distribución:

`sudo git clone https://github.com/your_user/your_app /opt/your_app`.

Cambia al directorio de tu aplicación:

`cd /opt/your_app`

Ejecuta npm install, bower install o cualquier otro comando que necesites para configurar tu aplicación. Asegúrate de que no hay errores de compilación y una vez que hayas terminado, cierra tu aplicación y procede al siguiente paso.

### Configurar Nginx como servidor proxy inverso

Ahora que tu aplicación está funcionando, necesitas configurar una forma para que tus usuarios accedan a ella. Para ello configuraremos un servidor web Nginx como proxy inverso. En este tutorial se configurará un servidor Nginx desde cero. Si ya tienes un servidor Nginx configurado, puedes simplemente copiar el bloque de ubicación en el bloque de servidor de tu elección (asegúrate de que la ubicación no entra en conflicto con ningún contenido existente de tu servidor web).

Primero, instala Nginx usando apt-get:

`sudo apt-get install nginx`

Ahora abra el archivo de configuración del bloque del servidor por defecto para editarlo:

`sudo nano /etc/nginx/sites-available/default`

Borra todo lo que hay en el archivo e inserta la siguiente configuración. Asegúrate de sustituir la directiva `server_name` por su propio nombre de dominio. Además, cambia el puerto (8080) si tu aplicación está configurada para escuchar en un puerto diferente:

```javascript
server {
    listen 80;

    server_name example.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Esto configura el servidor para responder a las peticiones en su raíz. Suponiendo que nuestro servidor está disponible en example.com, el acceso a http://example.com/ a través de un navegador web enviaría la solicitud a su aplicación, escuchando en el puerto 8080 en localhost.

Una vez que hayas terminado de añadir los bloques de ubicación para tus aplicaciones, guarda y sal.

A continuación, reinicia Nginx:

`sudo service restart nginx`

Asumiendo que tu aplicación Node.js se está ejecutando, y que las configuraciones de tu aplicación y de Nginx son correctas, ahora deberías poder acceder a tu aplicación a través del proxy inverso de Nginx. Pruébalo accediendo a la URL de tu servidor (tu dirección IP pública o nombre de dominio).

### Configurar la autenticación básica

A veces, no queremos que todo el mundo vea nuestra aplicación hasta que no esté completamente lista. Por esa y otras razones, podríamos implementar un sistema simple de autenticación de usuarios que solicite un nombre de usuario y una contraseña.

Primero, vamos a crear el archivo de contraseñas usando las utilidades de OpenSSL. Crearemos un archivo oculto llamado .htpasswd en el directorio de configuración /etc/nginx para almacenar nuestras combinaciones de nombre de usuario y contraseña.

Puedes añadir un nombre de usuario al archivo usando este comando. Nosotros estamos usando 'pepe' como nombre de usuario, pero puedes usar el nombre que quieras:

`sudo sh -c "echo -n 'pepe:' >> /etc/nginx/.htpasswd"`

A continuación, añade una entrada de contraseña cifrada para el nombre de usuario escribiendo:

`sudo sh -c "openssl passwd -apr1 >> /etc/nginx/.htpasswd"`

Puedes repetir este proceso para otros nombres de usuario. Puedes ver cómo se almacenan los nombres de usuario y las contraseñas cifradas dentro del archivo escribiendo

`cat /etc/nginx/.htpasswd`

### Configurar la autenticación de contraseñas de Nginx

Ahora que tenemos un archivo con nuestros usuarios y contraseñas en un formato que Nginx puede leer, necesitamos configurar Nginx para que compruebe este archivo antes de servir nuestro contenido protegido.

Comienza abriendo de nuevo el archivo de configuración del bloque del servidor que abrimos anteriormente:

`sudo nano /etc/nginx/sites-enabled/default`

Para configurar la autenticación, hay que decidir el contexto a restringir. Entre otras opciones, Nginx permite establecer restricciones a nivel de servidor o dentro de una ubicación específica. En nuestro ejemplo, restringiremos toda la raíz del documento con un bloque de ubicación, pero puedes modificar este listado para que sólo se dirija a un directorio específico dentro del espacio web:

Dentro de este bloque de ubicación, utiliza la directiva auth_basic para activar la autenticación y elije un nombre de dominio que se mostrará al usuario cuando se le soliciten las credenciales. Utilizaremos la directiva `auth_basic_user_file` para dirigir a Nginx al archivo de contraseñas que hemos creado:

```javascript
server {
    listen 80;

    server_name example.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        auth_basic "Restricted Content";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
}
```

Guarda y cierra el archivo cuando hayas terminado. Reinicia Nginx para implementar la política de contraseñas:

`sudo service nginx restart`

El directorio que has especificado debería estar ahora protegido por contraseña.

### Instalar PM2

PM2 es un gestor de procesos para aplicaciones Node.js. PM2 proporciona una manera fácil de gestionar y daemonizar aplicaciones (ejecutarlas en segundo plano como un servicio).

Utilizaremos npm, un gestor de paquetes para módulos Node que se instalan con Node.js, para instalar PM2 en nuestro servidor. Utiliza este comando para instalar PM2:

`sudo npm install -g pm2`

La opción -g le dice a npm que instale el módulo globalmente para que esté disponible en todo el sistema.

PM2 es simple y fácil de usar. Vamos a cubrir algunos usos básicos de PM2.

### Iniciar la aplicación

Lo primero que querrás hacer es utilizar el comando pm2 start para ejecutar tu aplicación, hello.js, en segundo plano:

`pm2 start hello.js`

En algunos casos, tu aplicación puede utilizar `npm start` para iniciar su ejecución. Si ese es el caso, puedes iniciar tu aplicación con PM2 de la siguiente manera

`pm2 start npm -- start`

**Nota**: la configuración de producción de cada aplicación puede ser muy diferente, por lo que no cubriremos eso en este tutorial. Sólo asegúrate de ejecutar el comando que ejecutará las tareas de producción para agrupar y ejecutar la aplicación.

Esto también añade la aplicación a la lista de procesos de PM2, que se muestra cada vez que se inicia una aplicación:

```html
[PM2] Creando el demonio PM2
[PM2] PM2 ha sido demonio con éxito
[PM2] Iniciando npm en modo fork_mode (1 instancia)
[PM2] Hecho.
┌──────────┬────┬──────┬──────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid  │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼──────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ npm      │ 0  │ fork │ 3524 │ online │ 0       │ 0s     │ 21.566 MB   │ disabled │
└──────────┴────┴──────┴──────┴────────┴─────────┴────────┴─────────────┴──────────┘
Usa `pm2 show &lt;id|name&gt;` para obtener más detalles sobre una aplicación
```

Como puedes ver, PM2 asigna automáticamente un nombre de App (basado en el nombre del archivo, sin la extensión .js) y un id de PM2. PM2 también mantiene otra información, como el PID del proceso, su estado actual y el uso de la memoria.

Las aplicaciones que se ejecutan bajo PM2 se reiniciarán automáticamente si la aplicación se cuelga o se mata, pero hay que dar un paso adicional para que la aplicación se inicie en el arranque del sistema (boot o reboot). Por suerte, PM2 proporciona una manera fácil de hacer esto, el subcomando de inicio.

El subcomando de inicio genera y configura un script de inicio para lanzar PM2 y sus procesos gestionados al arrancar el servidor. También hay que especificar la plataforma en la que se está ejecutando, que es ubuntu, en nuestro caso:

`sudo pm2 startup ubuntu`.

Esto creará una unidad `systemd` que ejecuta pm2 para tu usuario en el arranque. Esta instancia de pm2, a su vez, ejecuta `npm start`.

### Otros usos de PM2 (Opcional)

PM2 proporciona muchos subcomandos que permiten gestionar o buscar información sobre aplicaciones. Ten en cuenta que la ejecución de pm2 sin ningún argumento mostrará una página de ayuda, incluyendo ejemplos de uso, que cubre el uso de PM2 en más detalle que esta sección del tutorial.

Detener una aplicación con este comando (especifica el nombre o id de la aplicación PM2):

`pm2 stop nombre_de_la_aplicación_o_id`.

Reiniciar una aplicación con este comando (especifica el nombre o el identificador de la aplicación PM2):

`pm2 restart app_name_or_id`

La lista de aplicaciones gestionadas actualmente por PM2 también puede consultarse con el subcomando list:

`pm2 list`.

Se puede encontrar más información sobre una aplicación específica utilizando el subcomando info (especifica el nombre o el identificador de la aplicación PM2):

`pm2 info example`

El monitor de procesos de PM2 se puede consultar con el subcomando monit. Esto muestra el estado de la aplicación, la CPU y el uso de la memoria:

`pm2 monit`

Ahora que tu aplicación Node.js se está ejecutando, y es gestionada por PM2, vamos a configurar el proxy inverso.

### Disclaimer

Este tutorial está basado en el gran trabajo de [Digital Ocean community tutorials](https://www.digitalocean.com/community/tutorials/). En mi opinión, uno de los mejores sitios en Internet en términos de cosas relacionadas con el sys-admin.

- [Cómo configurar la autenticación por contraseña con nginx en ubuntu 14 04](https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-nginx-on-ubuntu-14-04)
- [Cómo configurar una aplicación node js para producción en ubuntu 16 04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)