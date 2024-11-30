// eslint-disable-next-line no-undef
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#FFFFFF',
        'black': '#000000',
        'dark-background': '#242424',
        'dark-primary': '#00BBF0',
        'dark-secondary': '#D9FAFF',
        'white-background': '#F8F4E3',
        'white-text': '#090909',
        'white-primary': '#00BBF0',
        'white-secondary': '#006494',
      }
    },
  },
  plugins: [
    flowbite.plugin(),
    // eslint-disable-next-line no-undef
    require("@xpd/tailwind-3dtransforms")
  ],
}