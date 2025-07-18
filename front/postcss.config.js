// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ NE PAS mettre `tailwindcss` ici avec Tailwind v4
    autoprefixer: {},
  },
};
