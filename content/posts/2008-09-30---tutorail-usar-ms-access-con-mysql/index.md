---
title: "Tutorial: Usar MS Access con MySQL"
slug: "/tutorail-usar-ms-access-con-mysql"
date: "2008-09-30T08:07:40.000Z"
featured: false
draft: false
tags: []
---


Este tutorial tiene como objetivo poder permitirnos editar el contenido de los campos de una base de datos MySQL en un servidor a través del programa Microsoft Access de nuestro ordenador.

**Instalación del controlador MyODBC**

La API de ODBC (Open Database Connectivity Application Programming Interface) proporciona una forma para que los programas cliente, tales como MS Access puedan acceder a bases de datos en servidores remotos. Por lo tanto, tenemos que instalar primero el controlador MyODBC:

1. [Descargar MyODBC 5.1](http://dev.mysql.com/downloads/connector/odbc/5.1.html) (asegúrate de seleccionar el archivo de instalación apropiado para tu versión de Windows. (probablemente el driver de Windows Installer (MSI))

2. Instalar el controlador.

Una vez que hayas instalado MyODBC, puedes conectarse a tu servidor MySQL y editar registros de bases de datos a través de un enlace de MS Access.

**Conectarte a tu servidor MySQL desde MS Access **

1. Crear una nueva base de datos de Access, o abrir una ya existente que deseas vincular a tu servidor MySQL.

2. Haga clic en Archivo -> Obtener datos externos -> Enlazar Tablas. Selecciona “**bases de datos ODBC**“. En la ventana nueva, selecciona “**vincular al origen de datos creando una tabla nueva**“.

3. Ahora hay que “**crear una NUEVA fuente de datos**“.

4. Seleccionar MySQL ODBC Driver 5.1 y guardar el archivo de origen de datos.

5. Editar los campos del Connector / ODBC

* En el campo Servidor, escribe la dirección IP del servidor MySQL.

* Escribe el nombre, usuario y contraseña de la base de datos MySQL.

6. Haz clic en el botón de prueba. Si dice “**Éxito; conexión satisfactoria!**“, Entonces todo debería estar funcionando. Si se dice “Solicitud SQL_ERROR regresó con” entonces contacta con tu proveedor de hosting para preguntarle si es necesario que permita el acceso de tu IP al servidor MySQL.

7. Click en Aceptar y selecciona “**mostrar-MySQL**“.

8. Ahora deberias poder ver una lista de todas las tablas en tu base de datos. Selecciona los campos que deseas ver o modificar y haga clic en Aceptar. Cualquier cambio que hagas será actualizado en la base de datos MySQL del servidor.

**Nota:** no se puede configurar campos, tablas, o el esquema de la base de datos. Para esos cambios hay que utilizar otros programas como phpMyAdmin o navicat.



