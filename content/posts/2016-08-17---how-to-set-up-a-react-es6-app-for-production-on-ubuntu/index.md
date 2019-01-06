---
title: "How to set up a Node.js (React ES6) app for production on Ubuntu with Nginx and basic auth"
cover: images/ubuntu-react-nodejs.jpg
category: work
---

###Introduction

Node.js is an open source JavaScript runtime environment for easily building server-side and networking applications. The platform runs on Linux, OS X, FreeBSD, and Windows. Node.js applications can be run at the command line, but we'll focus on running them as a service, so that they will automatically restart on reboot or failure, and can safely be used in a production environment.

In this tutorial, we will cover setting up a production-ready Node.js environment on a single Ubuntu 16.04 server. This server will run a Node.js application managed by PM2, and provide users with secure access to the application through an Nginx reverse proxy with basic auth.

###Prerequisites

This guide assumes that you have an Ubuntu 16.04 server (it also works with Ubuntu 14). If you don't have one yet, I do recommend [Digital Ocean](https://www.digitalocean.com/), [OVH](http://ovh.com) or [Amazon AWS](https://aws.amazon.com/).

It also assumes that you have a domain name, pointing at the server's public IP address.

Let's get started by connecting to the server via SSH.

###Connect to the server via SSH

Once your server is up and running, you must have an IP address or DNS your can use to connect to the server. In this example, we are going to use the DNS of a Ubuntu micro instance from Amazon AWS EC2.

During the process of setting up the server, you should create or use an existing key. Download it to a folder in your computer (usually ~/.ssh/) and run the following command from your terminal:

`ssh -i ~/folder/to/your/ssh/key.pem ubuntu@ec2-28-28-82-82.eu-central-1.compute.amazonaws.com`

That should give your access to your server!

**Note**: make sure that your instance accepts HTTP traffic. In Amazon AWS you have to go to 'security groups', and add HTTP / TCP / Port 80 to the inbound rules of the security group of your instance.

###Install Node.js

We will install the latest current release of Node.js, using the NodeSource package archives.

First, you need to install the NodeSource PPA in order to get access to its contents. Make sure you're in your home directory, and use curl to retrieve the installation script for the Node.js 6.x archives:

`cd ~
curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh`

And run the script under sudo:

`sudo bash nodesource_setup.sh`

The PPA will be added to your configuration and your local package cache will be updated automatically. After running the setup script from nodesource, you can install the Node.js package in the same way that you did above:

`sudo apt-get install nodejs`

The nodejs package contains the nodejs binary as well as npm, so you don't need to install npm separately. However, in order for some npm packages to work (such as those that require compiling code from source), you will need to install the build-essential package:

`sudo apt-get install build-essential`

The Node.js runtime is now installed, and ready to run an application!

###Clone your app

Make sure that git is installed:

`sudo apt-get install git`

Next, clone your app from GitHub (or any other repository) to /opt/your_app. The /opt/ directory is a standard location for software that's not installed from the distribution's official package repositories:

`sudo git clone https://github.com/your_user/your_app /opt/your_app`

Change to your app directory:

`cd /opt/your_app`

Run npm install, bower install or any other command you need to set up your app. Make sure that there are no build errors and once you are done, close your app and proceed to the next step.

###Set Up Nginx as a Reverse Proxy Server

Now that your application is working, you need to set up a way for your users to access it. We will set up an Nginx web server as a reverse proxy for this purpose. This tutorial will set up an Nginx server from scratch. If you already have an Nginx server setup, you can just copy the location block into the server block of your choice (make sure the location does not conflict with any of your web server's existing content).

First, install Nginx using apt-get:

`sudo apt-get install nginx`

Now open the default server block configuration file for editing:

`sudo nano /etc/nginx/sites-available/default`

Delete everything in the file and insert the following configuration. Be sure to substitute your own domain name for the server_name directive. Additionally, change the port (8080) if your application is set to listen on a different port:

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

This configures the server to respond to requests at its root. Assuming our server is available at example.com, accessing http://example.com/ via a web browser would send the request to your app, listening on port 8080 at localhost.

Once you are done adding the location blocks for your applications, save and exit.

Next, restart Nginx:

`sudo service restart nginx`

Assuming that your Node.js application is running, and your application and Nginx configurations are correct, you should now be able to access your application via the Nginx reverse proxy. Try it out by accessing your server's URL (its public IP address or domain name).

###Set up basic authentication

Sometimes, we don't want everyone to see our app until it's not completely ready. For that and other reasons, we might like to implement a simple user authentication system that will request for a username and password.

First we are going to create the password file using the OpenSSL utilities. We will create a hidden file called .htpasswd in the /etc/nginx configuration directory to store our username and password combinations.

You can add a username to the file using this command. We are using 'pepe' as our username, but you can use whatever name you'd like:

`sudo sh -c "echo -n 'pepe:' >> /etc/nginx/.htpasswd"`

Next, add an encrypted password entry for the username by typing:

`sudo sh -c "openssl passwd -apr1 >> /etc/nginx/.htpasswd"`

You can repeat this process for additional usernames. You can see how the usernames and encrypted passwords are stored within the file by typing:

`cat /etc/nginx/.htpasswd`

####Configure Nginx password authentication

Now that we have a file with our users and passwords in a format that Nginx can read, we need to configure Nginx to check this file before serving our protected content.

Begin by opening up again the server block configuration file that we previously opened:

`sudo nano /etc/nginx/sites-enabled/default`

To set up authentication, you need to decide on the context to restrict. Among other choices, Nginx allows you to set restrictions on the server level or inside a specific location. In our example, we'll restrict the entire document root with a location block, but you can modify this listing to only target a specific directory within the web space:

Within this location block, use the auth_basic directive to turn on authentication and to choose a realm name to be displayed to the user when prompting for credentials. We will use the auth_basic_user_file directive to point Nginx to the password file we created:

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

Save and close the file when you are finished. Restart Nginx to implement your password policy:

`sudo service nginx restart`

The directory you specified should now be password protected.

###Install PM2

PM2 is a process manager for Node.js applications. PM2 provides an easy way to manage and daemonize applications (run them in the background as a service).

We will use npm, a package manager for Node modules that installs with Node.js, to install PM2 on our server. Use this command to install PM2:

`sudo npm install -g pm2`

The -g option tells npm to install the module globally, so that it's available system-wide.

PM2 is simple and easy to use. We will cover a few basic uses of PM2.

####Start Application

The first thing you will want to do is use the pm2 start command to run your application, hello.js, in the background:

`pm2 start hello.js`

In some cases, your app might use 'npm start' to start its execution. If that's the case, you can start your app with PM2 like this:

`pm2 start npm -- start`

**Note**: the production settings of each app might be very different, so we will not cover that in this tutorial. Just make sure to run the command that will run the production tasks to bundle and run your app.

This also adds your application to PM2's process list, which is outputted every time you start an application:

```html
[PM2] Spawning PM2 daemon
[PM2] PM2 Successfully daemonized
[PM2] Starting npm in fork_mode (1 instance)
[PM2] Done.
┌──────────┬────┬──────┬──────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid  │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼──────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ npm      │ 0  │ fork │ 3524 │ online │ 0       │ 0s     │ 21.566 MB   │ disabled │
└──────────┴────┴──────┴──────┴────────┴─────────┴────────┴─────────────┴──────────┘
Use `pm2 show &lt;id|name&gt;` to get more details about an app
```

As you can see, PM2 automatically assigns an App name (based on the filename, without the .js extension) and a PM2 id. PM2 also maintains other information, such as the PID of the process, its current status, and memory usage.

Applications that are running under PM2 will be restarted automatically if the application crashes or is killed, but an additional step needs to be taken to get the application to launch on system startup (boot or reboot). Luckily, PM2 provides an easy way to do this, the startup subcommand.

The startup subcommand generates and configures a startup script to launch PM2 and its managed processes on server boots. You must also specify the platform you are running on, which is ubuntu, in our case:

`sudo pm2 startup ubuntu`

This will create a systemd unit which runs pm2 for your user on boot. This pm2 instance, in turn, runs 'npm start'

####Other PM2 Usage (Optional)

PM2 provides many subcommands that allow you to manage or look up information about your applications. Note that running pm2 without any arguments will display a help page, including example usage, that covers PM2 usage in more detail than this section of the tutorial.

Stop an application with this command (specify the PM2 App name or id):

`pm2 stop app_name_or_id`

Restart an application with this command (specify the PM2 App name or id):

`pm2 restart app_name_or_id`

The list of applications currently managed by PM2 can also be looked up with the list subcommand:

`pm2 list`

More information about a specific application can be found by using the info subcommand (specify the PM2 App name or id):

`pm2 info example`

The PM2 process monitor can be pulled up with the monit subcommand. This displays the application status, CPU, and memory usage:

`pm2 monit`

Now that your Node.js application is running, and managed by PM2, let's set up the reverse proxy.

###Disclaimer

This tutorial is based on the great work of [Digital Ocean community tutorials](https://www.digitalocean.com/community/tutorials/). IMHO one of the best resources in the Internet in terms of sys-admin related stuff.

- [How to set up password authentication with nginx on ubuntu 14 04](https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-nginx-on-ubuntu-14-04)
- [How to set up a node js application for production on ubuntu 16 04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)
