import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }, fontFamily: {
        'monserrat': ['Montserrat', 'cursive'],
        'nanum': ['Nanum Pen Script', 'sans-serif'],
        'Poppins': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        '.no-spinners::-webkit-inner-spin-button, .no-spinners::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: '0',
        },
        '.no-spinners': {
          '-moz-appearance': 'textfield',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};
export default config;
