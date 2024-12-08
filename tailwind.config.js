module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Includes all component files
  ],
  darkMode: 'class', // Class-based dark mode
  theme: {
    extend: {
      spacing: {
        15: '3.75rem', // Custom spacing value
        18: '4.5rem',
        22: '5.5rem',
        36: '9rem', // For large padding or margins
      },
      colors: {
        'primary-blue': '#007bff',
        'secondary-gray': '#6c757d',
        'success-green': '#28a745',
        'warning-yellow': '#ffc107',
        'danger-red': '#dc3545',
        'custom-purple': '#6f42c1',
      },
      borderRadius: {
        'full-circle': '50px', // Perfect for toggles or pills
        xl: '1rem', // Larger rounded corners
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 4px 6px rgba(0, 0, 0, 0.6)',
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'], // Clean, modern typography
        serif: ['Merriweather', 'serif'], // For headers or content emphasis
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
      },
      zIndex: {
        '-1': '-1', // For layering below other elements
        100: '100',
        110: '110',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Adds better form input styling
    require('@tailwindcss/typography'), // Adds typography utilities
    require('@tailwindcss/aspect-ratio'), // Adds aspect ratio utilities
  ],
};
