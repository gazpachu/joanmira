---
title: Momardi Art Collective
cover: /work/momardi-art-colective/images/logo.png
location: Spain
color: "#c76749"
categories: react web design e-commerce inverted
template: project
---

<p class="align-center">
<a class="btn external" role="button" href="https://momardi.com/" target="_blank">Live Website</a>
</p>

Momardi es una plataforma de arte y cultura contemporánea con un objetivo singular: acercar el arte a todo el mundo. Originalmente concebida como un proyecto personal de Tuesday Gutierrez para mostrar exposiciones de arte, eventos en galerías y perfiles de artistas, la plataforma ha crecido significativamente a lo largo de los años.

Si has seguido mi trabajo, sabrás que Momardi ha experimentado varias evoluciones arquitectónicas. Comenzó como un sitio web personalizado de WordPress, luego migró a la plataforma Ghost, posteriormente se transformó en un sitio estático con GatsbyJS, después migró a un CMS personalizado basado en Markdown y finalmente regresó a WordPress.

Sin embargo, el ecosistema web evoluciona rápidamente. En 2026, para lograr el equilibrio perfecto entre experiencia de desarrollador, rendimiento de vanguardia y capacidades escalables de pila completa, decidí rediseñar completamente la arquitectura. Esto no solo era necesario por razones de rendimiento y escalabilidad, sino también porque el sitio web (principalmente un blog) debía evolucionar hasta convertirse en una **galería y estudio de arte totalmente online con portafolios, una revista de arte con tutoriales y una tienda online con funcionalidades de comercio electrónico y reservas**. Los requisitos eran exigentes.

Aquí les presentamos un análisis detallado de la base técnica de la nueva plataforma Momardi.

![](/work/momardi-art-colective/images/cover.jpg)

### 1. Arquitectura central: React 19 y TanStack Start

Los días de las aplicaciones monolíticas de una sola página (SPA) y los generadores de sitios estáticos (SSG) pesados ​​están cambiando. Para esta iteración, dejé atrás Gatsby y Next.js y adopté lo último del ecosistema React: React 19 junto con TanStack Start.

En el núcleo del enrutamiento y la renderización del lado del servidor (SSR) se encuentran @tanstack/react-router y @tanstack/react-start.

- **¿Por qué TanStack?** A diferencia de Next.js o Remix, TanStack Router proporciona un enrutamiento 100% seguro en cuanto a tipos. Cada ruta, parámetro de búsqueda y cargador tiene un tipado estricto. TanStack Start amplía esto al proporcionar capacidades SSR completas directamente en Vite (vite v7).

- **Obtención de datos**: Combiné esto con @tanstack/react-query (v5) para gestionar el estado asíncrono, el almacenamiento en caché y la sincronización entre el cliente y el servidor.

Curiosamente, para acelerar la configuración inicial, utilicé herramientas con IA a través de @lovable.dev/vite-tanstack-config, lo que proporcionó una base excelente para la integración de Vite y TanStack, permitiéndome centrarme de inmediato en la lógica de negocio.

### 2. Interfaz de usuario y sistema de diseño: Tailwind v4 + shadcn/ui

El arte requiere un lienzo que no distraiga. La interfaz de usuario debía ser minimalista, altamente accesible (incluido el modo oscuro) y visualmente impactante.

Adopté la nueva versión de Tailwind CSS v4 (@tailwindcss/vite), que aporta mejoras de rendimiento significativas al proceso de compilación. En lugar de escribir componentes CSS personalizados desde cero, implementé una arquitectura shadcn/ui altamente personalizada.

Al observar el árbol de dependencias, se aprecia una gran dependencia de las primitivas de Radix UI (@radix-ui/react-*). Esto incluye desde NavigationMenu y Dialog hasta HoverCard y ScrollArea. Gracias a Radix, me aseguré de que todos los elementos interactivos de Momardi fueran totalmente accesibles (compatibles con WAI-ARIA) desde el primer momento.

Para dar vida a la interfaz de usuario, integré varias bibliotecas específicas:

- **Framer Motion y tw-animate-css**: Se utilizan para transiciones de página fluidas y aceleradas por hardware, así como para microinteracciones.

- **Embla Carousel**: Permite crear galerías interactivas y deslizables para obras de arte y fotos de exposiciones.

- **Lucide React**: Un conjunto de iconos limpio y coherente.

- **Sonner**: Para notificaciones emergentes elegantes y discretas.

### 3. Backend, base de datos y autenticación: el ecosistema de Supabase

Para gestionar contenido dinámico, como portafolios de artistas, cuentas de usuario y publicación dinámica, dejé de usar las plataformas CMS tradicionales sin interfaz gráfica e integré Supabase (@supabase/supabase-js).

Supabase funciona como un Backend como Servicio (BaaS) completo, proporcionando:

- **PostgreSQL**: Para una estructura de datos relacional robusta entre artistas, obras de arte, talleres, pedidos, reservas, etc.

- **Autenticación y correos electrónicos**: Inicio de sesión sencillo para que los clientes gestionen sus perfiles, pedidos, cupones y reservas.

- **Tareas programadas (Cron jobs)**: Gestión de suscripciones al estudio y automatización de reservas.

También decidimos aprovechar Cloudflare Workers para ejecutar el código del backend y obtener un rendimiento ultrarrápido.

### 4. Comercio electrónico y monetización: Redsys y Stripe

Momardi no es solo una plataforma editorial; Es un ecosistema. Para facilitar el comercio —ya sea la venta de entradas para talleres o eventos, suscripciones premium o el apoyo directo a artistas— integré las pasarelas de pago Redsys y Stripe.

Mediante @stripe/react-stripe-js y el SDK de Node.js de Stripe para el backend, la plataforma procesa las transacciones de forma segura, liberando por completo a nuestros servidores de la carga del cumplimiento de la normativa PCI.

Con Redsys, aprovechamos las comisiones reducidas por transacción y la compatibilidad con procesadores de pago locales como Bizum.

### 5. Gestión de eventos y funcionalidad de búsqueda

Dos características principales de Momardi son descubrir y unirse a eventos y talleres en tiempo real, y búsqueda de artistas u obras de arte específicas.

- **El Calendario**: Implementé react-big-calendar y react-day-picker, junto con date-fns, para crear un calendario de exposiciones robusto. Los usuarios y administradores pueden filtrar eventos por mes, semana o días específicos.

- **La Búsqueda**: Integré fuse.js junto con cmdk (una interfaz de menú de comandos). Esto proporciona una búsqueda difusa del lado del cliente ultrarrápida, que permite a los usuarios pulsar Cmd+K y encontrar instantáneamente artistas, artículos o galerías.

### 6. Rendimiento Extremo: SSG personalizado y scripts de optimización de imágenes

Aunque TanStack Start ofrece un excelente renderizado del lado del servidor (SSR), el éxito o fracaso de una plataforma de arte depende de sus tiempos de carga de imágenes y su SEO. Para lograr una puntuación perfecta en Lighthouse, escribí varios scripts Node personalizados que se ejecutan durante el proceso de compilación de Vite:

- **Procesamiento de Imágenes**: Aprovechando sharp, estos scripts interceptan las cargas de alta resolución y generan automáticamente formatos WebP/AVIF en múltiples tamaños adaptables.

- **Prerenderizado**: En lugar de depender únicamente del renderizado del lado del servidor (SSR), estos scripts obtienen las rutas activas durante la compilación y generan estáticamente el HTML de las páginas. Esto garantiza que los rastreadores de los motores de búsqueda vean el contenido de inmediato sin esperar a que se ejecute JavaScript.

- **Seguridad**: También implementé @marsidev/react-turnstile (Cloudflare Turnstile) para proteger los endpoints de la API y los formularios de los bots sin molestar a los usuarios con CAPTCHAs. Además, contamos con reglas WAF en Cloudflare para evitar los bots.

### 7. Despliegue: Páginas de Cloudflare

Toda la aplicación se despliega en Cloudflare. Aprovechando la red perimetral global de Cloudflare, el HTML generado estáticamente, las imágenes optimizadas y las rutas TanStack Start renderizadas en el borde se sirven en milisegundos a usuarios de todo el mundo.

### Reflexiones finales

La evolución de Momardi, desde un sencillo blog de WordPress hasta una aplicación full-stack completa, renderizada en el borde y basada en React 19, Supabase y Cloudflare, ha sido una experiencia increíble. Las IA Claud, Gemini y Co-Pilot han sido de gran ayuda.

Esta nueva arquitectura no solo ofrece una experiencia fluida para los amantes del arte, sino que también establece una base altamente escalable y mantenible para el crecimiento de Momardi durante la próxima década.

Si te interesa hablar sobre arquitectura web moderna, TanStack o cómo migrar plataformas heredadas al borde, no dudes en contactarnos.

### Capturas de pantalla

![](/work/momardi-art-colective/images/homepage.jpg "Página de inicio")

![](/work/momardi-art-colective/images/workshop.jpg "Taller de cerámica")

![](/work/momardi-art-colective/images/workshop-listing.jpg "Listado de talleres")

![](/work/momardi-art-colective/images/artist-page.jpg "Página de un artista")

![](/work/momardi-art-colective/images/artwork.jpg "Obra de un artista")