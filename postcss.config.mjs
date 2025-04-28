const config = {
  plugins: ["@tailwindcss/postcss", "autoprefixer"],
};

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'pirata-one': ['Pirata One', 'cursive'],
      },
      animation: {
        shimmer: 'shimmer 1s infinite', // Faster: 1s instead of 1.5s
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0', transform: 'scale(1)' },
          '50%': { backgroundPosition: '200% 0', transform: 'scale(1.05)' }, // Peak with slight scale
          '100%': { backgroundPosition: '200% 0', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;