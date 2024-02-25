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
  plugins: [],
};
export default config;
