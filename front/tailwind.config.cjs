/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin")

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        "3/4-screen": "85vh",
      },
      spacing: {
        128: "32rem",
        150: "40rem",
        192: "48rem",
        200: "56rem",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
        dancing: ["Dancing Script"],
        passion: ["Passion One"],
        garamond: ["Garamond"],
        hando: ["Hando"],
      },
      colors: {
        bluePrimary: "#210b3a",
        purplePrimary: "#44214E",
        brownPrimary: "#AC604A",
        deepBrownPrimary: "#77404B",
        redPrimary: "#931621",
        orangePrimary: "#FF914D",
      },
      backgroundImage: {
        normal: "url('/background.png')",
        mobile: "url('/background_mobile.png')",
        normal2: "url('/background_2.png')",
        mobile2: "url('/background_2_mobile.png')",
        win: "url('/background_win.png')",
        win_mobile: "url('/background_win_mobile.png')",
        error: "url('/error_background.png')",
        error_mobile: "url('/error_background _mobile.png')",
        pricing: "url('/background_pricing.png')",
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "35xl": "2.200rem",
        "4xl": "2.441rem",
        "43xl": "3.600rem",
        "45xl": "6.441rem",
        "5xl": "10.052rem",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      )
    }),
  ],
}
