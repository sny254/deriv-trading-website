export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#ff6b35',
          dark: '#121826',
          card: '#1b2333',
          muted: '#8b97ad'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,107,53,0.3), 0 12px 30px rgba(255,107,53,0.12)'
      }
    }
  },
  plugins: []
}
