import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [
    // Integración de React
    react(),
    
    // Integración de Tailwind
    tailwind(),
  ],
  
  // Configuración del sitio - reemplaza esto con tu dominio real cuando lo tengas
  site: 'https://futbolstats.com',
  
  // Opciones de output: 'static' (por defecto) o 'server' (para SSR)
  // Para tu proyecto de estadísticas deportivas donde necesitarás 
  // contenido dinámico y actualizaciones en tiempo real, 'server' es recomendable
  output: 'server',
  
  // Si eliges 'server', también necesitas un adaptador como:
  // - @astrojs/node
  // - @astrojs/vercel
  // - @astrojs/netlify
  // - @astrojs/deno

  // Configura el adaptador de Node.js
  adapter: node({
    mode: 'standalone'
  }),
});
