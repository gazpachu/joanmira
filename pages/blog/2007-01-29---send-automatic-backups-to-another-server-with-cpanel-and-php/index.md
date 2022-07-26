---
title: Send automatic backups to another server with Cpanel and PHP
description: How to automatically backup a web hosting account
cover: images/cpanel_logo_qpb3ap.png
template: post
category: work
---

If someone is interested in the possibility of backup his web hosting account automatically (with Cron jobs) and sending the backup to another web hosting account, then read on...

Copy the following code to a file called (for example) `fullBackup.php`, change the values of the variables and send it to a folder in your account. You can put it in `public_html`, but ideally in a hidden folder. Then, you need to create a cron job, specifying the address of the created file (example: `/home/user/public_html/fullbackup`.php) and the execution interval of the script.

```php
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
```
