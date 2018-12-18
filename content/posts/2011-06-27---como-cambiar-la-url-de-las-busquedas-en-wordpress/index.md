---
title: "Cómo cambiar la URL de las búsquedas en Wordpress"
slug: "/como-cambiar-la-url-de-las-busquedas-en-wordpress"
date: "2011-06-27T07:32:20.000Z"
image: "./images/wordpress_frx7nx.jpg"
featured: false
draft: false
tags: []
---


Normalmente las búsquedas en WordPress generan una URL del tipo http://dominio.tld/?s=palabra. Con el siguiente código, las búsquedas serán del tipo http://dominio.tld/search/palabra+palabra. Puedes cambiar la palabra “search” por cualquier otra ruta, como por ejemplo “blog/buscar”.

Tan solo tienes que añadir el siguiente código en el archivo functions.php de tu tema visual.

function nice_search_redirect() { if ( is_search() && strpos( $_SERVER['REQUEST_URI'], '/wp-admin/' ) === false && strpos( $_SERVER['REQUEST_URI'], '/search/' ) === false ) { wp_redirect( home_url( '/search/' . str_replace( array( ' ', '%20' ), array( '+', '+' ), get_query_var( 's' ) ) ) ); exit(); } } add_action( 'template_redirect', 'nice_search_redirect' );



