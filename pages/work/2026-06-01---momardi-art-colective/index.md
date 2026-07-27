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

Momardi is a contemporary art and culture platform with a singular objective: to bring accessible art to everyone. Originally built as the personal project of Tuesday Gutierrez to showcase art exhibits, gallery events, and artist profiles, the platform has grown significantly over the years.

If you have followed my work, you might know that Momardi has undergone several architectural evolutions. It started as a custom WordPress site, eventually migrated to the Ghost platform, later transitioned into a statically generated site using GatsbyJS, then migrated into a custom markdown-driven CMS and finally back to WordPress again.

However, the web ecosystem moves fast. In 2026, to achieve the ultimate balance of developer experience, edge-performance, and scalable full-stack capabilities, I decided to architect a complete rebuild. This was not only required for performance and scalability reasons, but also because the website (mainly a blog site) needed to evolve into a **fully online art gallery and studio with portfolios, an art magazine with tutorials, and an online shop with e-commerce and booking functionalities**. The requirements were tall.

Here is a deep dive into the technical foundation of the all-new Momardi platform.

![](/work/momardi-art-colective/images/cover.jpg)

### 1. The core architecture: React 19 & TanStack Start

The days of monolithic single-page applications (SPAs) and heavy static site generators (SSGs) are evolving. For this iteration, I moved away from Gatsby and Next.js and embraced the bleeding edge of the React ecosystem: React 19 paired with TanStack Start.

At the heart of the routing and server-side rendering (SSR) is @tanstack/react-router and @tanstack/react-start.

- **Why TanStack?** Unlike Next.js or Remix, TanStack Router provides 100% type-safe routing. Every route, search parameter, and loader is strictly typed. TanStack Start extends this by providing full-stack SSR capabilities directly within Vite (vite v7).

- **Data Fetching**: I paired this with @tanstack/react-query (v5) to handle asynchronous state management, caching, and synchronization across the client and server.

Interestingly, to accelerate the initial boilerplate and configuration, I utilized AI-assisted tooling via @lovable.dev/vite-tanstack-config, which provided a phenomenal baseline for Vite and TanStack integration, allowing me to focus immediately on the business logic.

### 2. The UI & design system: Tailwind v4 + shadcn/ui

Art requires a canvas that doesn't distract. The UI needed to be minimalist, highly accessible (dark mode included), and visually stunning.

I adopted the newly released Tailwind CSS v4 (@tailwindcss/vite), which brings massive performance improvements to the build process. Instead of writing custom CSS components from scratch, I implemented a heavily customized shadcn/ui architecture.

Looking at the dependency tree, you'll see a massive reliance on Radix UI primitives (@radix-ui/react-*). This includes everything from NavigationMenu and Dialog to HoverCard and ScrollArea. By using Radix, I ensured that every interactive element on Momardi is fully accessible (WAI-ARIA compliant) out of the box.

To bring the UI to life, I integrated several specific libraries:

- **Framer Motion & tw-animate-css**: Used for fluid, hardware-accelerated page transitions and micro-interactions.

- **Embla Carousel**: Powering the touch-friendly, swipeable galleries for artwork and exhibition photos.

- **Lucide React**: A clean, consistent iconography set.

- **Sonner**: For non-intrusive, elegant toast notifications.

### 3. Backend, database, and auth: the Supabase ecosystem

To handle dynamic content—such as artist portfolios, user accounts, and dynamic publishing, I moved away from traditional headless CMS platforms and integrated Supabase (@supabase/supabase-js).

Supabase acts as the complete Backend-as-a-Service (BaaS), providing:

- **PostgreSQL**: For robust, relational data structuring between Artists, Artworks, Workshops, Orders, Bookings, etc.

- **Authentication and emails**: Seamless user login for customers to manage their profiles, orders, vouchers and bookings.

- **Cron jobs**: Handling studio subscriptions and booking automations.

We also decided to leverage Cloudflare Workers to run backend code and get blazing-fast performance.

### 4. E-Commerce & monetization: Redsys and Stripe

Momardi isn't just an editorial platform; it’s an ecosystem. To facilitate commerce — whether that's selling workshop or event tickets, premium subscriptions, or directly supporting artists — I integrated the Redsys and Stripe payment gateways.

Using @stripe/react-stripe-js and the backend stripe Node SDK, the platform securely processes transactions while keeping the PCI-compliance burden completely off our servers.

With Redsys, we take advantage of reduced transaction fees and supporting local financial payment processors like Bizum.

### 5. Event management & search functionality

Two major features of Momardi are discovering and joining art events and workshops and searching for specific artists or artworks.

- **The Calendar**: I implemented react-big-calendar and react-day-picker, paired with date-fns, to create a robust exhibition calendar. Users and admins can filter events by month, week, or specific days.

- **The Search**: I integrated fuse.js alongside cmdk (a command-menu interface). This provides a blazing-fast, client-side fuzzy search, allowing users to press Cmd+K and instantly find artists, articles, or galleries.

### 6. Extreme performance: custom SSG & image optimization scripts

Even though TanStack Start provides excellent SSR, an art platform lives and dies by its image load times and SEO. To achieve a perfect Lighthouse score, I wrote several custom Node scripts executed during the Vite build pipeline:

- **Image Pipeline**: Leveraging sharp, these scripts intercept high-res uploads and automatically generate WebP/AVIF formats in multiple responsive sizes.

- **Prerendering**: Instead of relying purely on SSR, these scripts fetch the active routes at build time and statically generate the HTML for the pages. This ensures that search engine crawlers immediately see the content without waiting for JavaScript execution.

- **Security**: I also implemented @marsidev/react-turnstile (Cloudflare Turnstile) to protect API endpoints and forms from bots without annoying users with CAPTCHAs. We also have some WAF rules in Cloudflare to avoid bots.

### 7. Deployment: Cloudflare Pages

The entire application is deployed to Cloudflare. By leveraging Cloudflare’s global edge network, the statically generated HTML, optimized images, and edge-rendered TanStack Start routes are served within milliseconds to users anywhere in the world.

### Final Thoughts

The evolution of Momardi from a simple WordPress blog into a fully-fledged, edge-rendered, full-stack application built on React 19, Supabase and Cloudflare has been an incredible journey. Claud, Gemini and Co-Pilot AIs have helped a lot.

This new architecture not only provides a buttery-smooth experience for art lovers but also establishes a highly scalable, maintainable foundation for the next decade of Momardi’s growth.

If you are interested in discussing modern web architecture, TanStack, or how to migrate legacy platforms to the edge, feel free to reach out.

### Screen captures

![](/work/momardi-art-colective/images/homepage.jpg "Home page")

![](/work/momardi-art-colective/images/workshop.jpg "Workshop page")

![](/work/momardi-art-colective/images/workshop-listing.jpg "Workshop listing page")

![](/work/momardi-art-colective/images/artist-page.jpg "Artist page")

![](/work/momardi-art-colective/images/artwork.jpg "Artwork page")