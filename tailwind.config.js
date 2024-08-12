module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      black: '#000',
      white: '#fff',
      gray: '#D1D1D1',
      'slate-50': '#A8A8A8',
      'slate-100': '#545454',
      'gray-50': '#808080',
      'gray-100': '#666666',
      'gray-150': '#404040',
      'gray-200': '#303030',
      'gray-250': '#2d2d2d',
      'gray-300': '#262626',
      'gray-350': '#1d1d1d',
      'alice-blue': '#00DAE8',
      transparent: 'rgba(0, 0, 0, 0)',
      'fade-white': 'rgba(255, 255, 255, 0.7)',
    },
    screens: {
      tablet: '850px',
      mobile: '525px',
    },
    extend: {
      fontFamily: {
        nokora: ['var(--font-nokora)'],
      },
      boxShadow: {
        inner:
          'inset 0 0 0 1px rgba(0 0 0/0.15), inset 0 2px 5px 0 rgba(0 0 0/0.08)',
        outer:
          '0 10px 15px -3px rgb(0 0 0 / 0.1),   0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}
