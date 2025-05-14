/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pingOnce:
        {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.75' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseShadow: {
          '0%, 100%' :
          {
            boxshadow: '0 0 0px 0px rgba(168, 85, 247, 0.8)'
          },
          boxshadow: {
            '50%': {
              boxshadow: '0 0 10px 6px rgba(168, 85, 247, 0.5)'
            }
          }
        }
      },
      animation: {
        pingOnce: 'pingOnce 0.5s ease-in-out',
        pulseShadow: 'pulseShadow 1.5s infinite',
      },

    }
  },
  plugins: [],
}
