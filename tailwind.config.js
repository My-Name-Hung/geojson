/** @type {import('tailwindcss').Config} */

const {nextui} = require("@nextui-org/react");

export default {
  content: 
    [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    backgroundImage: {
      'bglogin': "url('/src/assets/bglogin2.jpg')",
      'bghome': "url('/src/assets/bghome.jpg')",
    },
    extend: {
      textShadow: {
        DEFAULT: "0.5px 0px 1px red, 0 0 0.2em blue, 0 0 0 blue"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui(),
    (function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ]
}

