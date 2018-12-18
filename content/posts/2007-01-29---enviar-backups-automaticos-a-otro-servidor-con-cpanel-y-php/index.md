---
title: "Enviar backups automáticos a otro servidor con Cpanel y PHP"
slug: "/enviar-backups-automaticos-a-otro-servidor-con-cpanel-y-php"
date: "2007-01-29T18:30:32.000Z"
featured: false
draft: false
tags: ["backup","cpanel","php","Programación","servidor"]
---

Si a alguien le interesa la posibilidad de hacer backups de su cuenta de alojamiento web forma automática (con Cron jobs) y enviar el backup a otra cuenta de alojamiento web, entonces que siga leyendo…

Copiar el siguiente codigo a un archivo llamado (por ejemplo) fullBackup.php, cambiar los valores de las variables y enviarlo a una carpeta en vuestra cuenta. Podeis ponerlo en public_html, aunque lo ideal sería hacerlo en una carpeta oculta. Depués, es necesario crear una tarea programada (cron job), especificando la dirección del archivo creado (ejemplo: /home/usuario/public_html/fullbackup.php) y el intervalo de ejecución del script.

[php]  
 // PHP script to allow periodic cPanel backups automatically.  
 // Based on script posted by max.hedroom in cpanel.net forums  
 // Additions by Zap at http://www.getrss.net/  
 // This script contains passwords. KEEP ACCESS TO THIS FILE SECURE!  
 // ********* THE FOLLOWING ITEMS NEED TO BE CONFIGURED *********  
 // Info required for cPanel access  
 $cpuser = “”; // Username used to login to CPanel  
 $cppass = “”; // Password used to login to CPanel  
 $domain = “”; // Domain name where CPanel is run  
 $skin = “x”; // Set to cPanel skin you use (script won’t work if it doesn’t match)

// Info required for FTP host  
 $ftpuser = “”; // Username for FTP account  
 $ftppass = “”; // Password for FTP account  
 $ftphost = “”; // Full hostname or IP address for FTP host  
 $ftppath = “//”; // Full path on FTP server to save files to  
 $ftpmode = “ftp”; // FTP mode (“ftp” for active, “passiveftp” for passive)

// Notification information  
 $notifyemail = “you@yoursite.com”; // Email address to send results

// Secure or non-secure mode  
 $secure = 0; // Set to 1 for SSL (requires SSL support), otherwise will use standard HTTP

// Set to 1 to have web page result appear in your cron log  
 $debug = 0;

// *********** NO CONFIGURATION ITEMS BELOW THIS LINE *********

if ($secure) {  
 $url = “ssl://”.$domain;  
 $port = 2083;  
 } else {  
 $url = $domain;  
 $port = 2082;  
 }

$socket = fsockopen($url,$port);  
 if (!$socket) { echo “Failed to open socket connection… Bailing out!n”; exit; }

// Encode authentication string  
 $authstr = $cpuser.”:”.$cppass;  
 $pass = base64_encode($authstr);

$params = “dest=$ftpmode&email=$notifyemail&server=$ftphost&user=$ftpuser&pass=$ftppass&rdir=$ftppath&submit=Generate Backup”;

// Make POST to cPanel  
 fputs($socket,”POST /frontend/”.$skin.”/backup/dofullbackup.html?”.$params.” HTTP/1.0rn”);  
 fputs($socket,”Host: $domainrn”);  
 fputs($socket,”Authorization: Basic $passrn”);  
 fputs($socket,”Connection: Closern”);  
 fputs($socket,”rn”);

// Grab response even if we don’t do anything with it.  
 while (!feof($socket)) {  
 $response = fgets($socket,4096);  
 if ($debug) echo $response;  
 }

fclose($socket);

?>  
 [/php]



