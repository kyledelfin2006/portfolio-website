import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,md,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { serif: ['"Times New Roman"', 'Times', '"Nimbus Roman No9 L"', 'serif'] },
    },
  },
  plugins: [typography],
};
