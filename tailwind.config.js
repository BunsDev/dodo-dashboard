module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "hsl(248, 45%, 98%)",
          200: "hsl(248, 38%, 95%)",
          300: "hsl(248, 31%, 92%)",
          400: "hsl(248, 25%, 84%)",
          500: "hsl(248, 13%, 69%)",
          600: "hsl(248, 12%, 45%)",
          700: "hsl(248, 15%, 34%)",
          800: "hsl(248, 22%, 22%)",
          900: "hsl(248, 30%, 13%)",
        },
        yellow: {
          100: "hsl(54, 100%, 95%)",
          200: "hsl(54, 100%, 90%)",
          300: "hsl(54, 100%, 85%)",
          400: "hsl(56, 100%, 60%)",
          500: "hsl(56, 100%, 50%)",
          600: "hsl(54, 100%, 49%)",
          700: "hsl(58, 100%, 48%)",
          800: "hsl(58, 100%, 47%)",
          900: "hsl(58, 100%, 46%)",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  variants: {},
  plugins: [],
};
