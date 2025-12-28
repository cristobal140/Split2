// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Asegúrate de que todas tus carpetas de componentes estén incluidas aquí
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"], 
  theme: {
    extend: {
      colors: {
        // 🚨 Colores Primarios (Morados) del código original 
        primary: {
          500: '#6366f1', // Color base principal
          600: '#4f46e5', // Color hover/oscuro
          100: '#eef2ff', // Color de fondo para badges/cards (si aplica)
        },
        // 🚨 Colores Secundarios (Rosados) del código original 
        secondary: {
          500: '#ec4899', // Color base secundario
          600: '#db2777', // Color hover/oscuro secundario
        },
        // Opcional: Si usas otros tonos de gris que no son los de Tailwind por defecto
        // gray: {
        //   // ...
        // },
      }
    },
  },
  plugins: [],
};