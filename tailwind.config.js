module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      black: '#000',
      white: '#fff',
      'gray-50': '#808080',
      'gray-100': '#666666',
      'gray-150': '#404040',
      'gray-200': '#303030',
      'gray-250': '#262626',
      'gray-300': '#1d1d1d',
      'alice-blue': '#00DAE8',
      transparent: 'rgba(0, 0, 0, 0)',
    },
    extend: {
      fontFamily: {
        nokora: ['var(--font-nokora)'],
      },
    },
  },
  plugins: [],
}
