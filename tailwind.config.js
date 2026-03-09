/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        cgtRed: '#E30613',
        cgtDarkRed: '#A0000A',
        totalBlue: '#005EB8',
        bgApp: '#F8FAFC',
        surface: '#FFFFFF',
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'float': '0 20px 40px rgba(0, 0, 0, 0.08)',
        'red-glow': '0 10px 30px rgba(227, 6, 19, 0.25)',
        'blue-glow': '0 10px 30px rgba(0, 94, 184, 0.25)'
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'float': 'float 6s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s infinite linear',
        'story-progress': 'storyProgress 5s linear forwards',
        'gradientBG': 'gradientBG 15s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-20px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        storyProgress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        },
        gradientBG: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      }
    },
  },
  plugins: [],
}
