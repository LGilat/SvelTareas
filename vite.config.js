import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// Verifica si estamos en un entorno de desarrollo local o en producción
const isLocalDevelopment = process.env.NODE_ENV === 'development';

// https://vitejs.dev/config/
export default defineConfig({
  // base:'/SvelTareas/',
  base: isLocalDevelopment ? '/' : '/SvelTareas/', // Configura la base dependiendo del entorno
  plugins: [svelte()],
})
