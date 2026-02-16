/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // === 3 ENTITÉS ===

        // Patient — Bleu doux médical (confiance, sérénité)
        patient: {
          50: '#EEF4FB',
          100: '#D4E4F5',
          200: '#A9C9EB',
          300: '#7EAEE0',
          400: '#5B9BD5',
          500: '#3D85C6',
          600: '#2E6DA3',
          700: '#1F4F7A',
        },

        // Thérapeute — Or/Ambre chaud (expertise, autorité chaleureuse)
        therapist: {
          50: '#FDF6EA',
          100: '#FAE8C4',
          200: '#F5D28E',
          300: '#F0BC58',
          400: '#E8A838',
          500: '#D4942A',
          600: '#B07820',
          700: '#8C5C18',
        },

        // IA (Jul-IA) — Pêche/Corail doux (chaleureux, accessible, non-menaçant)
        ai: {
          50: '#FEF4F3',
          100: '#FCE4E1',
          200: '#F9CCC7',
          300: '#F5B3AC',
          400: '#F0A8A0',
          500: '#E08E85',
          600: '#C0706A',
          700: '#A0524E',
        },

        // === SURFACES & TEXTE ===

        // Gris chauds neutres pour les fonds
        surface: {
          50: '#FAFAFA',
          100: '#F5F5F4',
          200: '#EEECEB',
          300: '#E2DFDD',
          400: '#C8C4C0',
        },

        // Texte
        text: {
          900: '#1A1A1A',
          700: '#404040',
          500: '#6B6B6B',
          300: '#A0A0A0',
          100: '#D4D4D4',
        },

        // === FONCTIONNEL ===
        success: {
          50: '#EDFAF2',
          100: '#C8F0D6',
          400: '#4CAF82',
          600: '#2E8B5E',
        },
        danger: {
          50: '#FEF0F0',
          100: '#FCCECE',
          400: '#E05B5B',
          600: '#B83A3A',
        },
      },
    },
  },
  plugins: [],
}
