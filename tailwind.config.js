/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — sourced directly from the Cyber Vidya Brand Guide
        midnight: '#08083F', // Midnight Blue
        cerulean: '#22A7C8', // Cerulean Blue
        aqua: '#4FFFF2', // Electric Aqua
        charcoal: '#1E1E1E', // Charcoal Black
        steel: '#595959', // supporting grey (gradients)
        mist: '#E5E5E5', // supporting light grey (gradients)
        // a slightly lifted midnight for panels/cards on the dark theme
        'midnight-700': '#0E0E5A',
        'midnight-800': '#0A0A48',
        'midnight-900': '#06062E',
      },
      fontFamily: {
        // Orbitron = headlines (per brand guide). Helvetica Neue = body.
        display: ['Orbitron', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: [
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #4FFFF2 0%, #22A7C8 100%)',
        'midnight-panel':
          'linear-gradient(135deg, #08083F 0%, #0A0A48 55%, #11114F 100%)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(79,255,242,0.25), 0 0 24px -4px rgba(79,255,242,0.35)',
        'glow-sm': '0 0 18px -6px rgba(79,255,242,0.45)',
        card: '0 10px 30px -12px rgba(8,8,63,0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(79,255,242,0.35)' },
          '50%': { boxShadow: '0 0 0 8px rgba(79,255,242,0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.96)', opacity: '0.6' },
          '60%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        pop: 'pop 0.25s ease-out both',
      },
    },
  },
  plugins: [],
}
