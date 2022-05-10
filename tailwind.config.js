
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand': '#ff1245',
        'blue': '#2b3990',
        'gold': '#b3881e',
        'yellow': '#ffbb12',
        'blue-light': '#2b48ff',
        'blue-dark': '#172058'
      },
      screens: {
        'sm': '300px',
        'md': '700px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
        },
      fontFamily: {
        'arial-regular': ['Arial-Regular', 'Helvetica'],
        'avenirnext-bold': ['AvenirNext-Bold', 'Helvetica'],
        'avenirnext-demibold': ['AvenirNext-DemiBold', 'Helvetica'],
        'avenirnext-medium': ['AvenirNext-Medium', 'Helvetica'],
        'nunito_sans': ['Nunito Sans', 'Helvetica'],
        'poppins': ['Poppins', 'Helvetica'],
      },
      fontSize: {
        fsl: ['16px', '16px'],
        fsm: ['14px', '14px'],
        xl: ['20px', '20px'],
        xxl: ['22px', '22px'],
        xxxl: ['24px', '24px'],
        xxxxl: ['26px', '26px'],
        xxxxxl: ['32px', '32px'],
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar')
  ],
  variants: {
    scrollbar: ['rounded']
  },
  daisyui: {
    themes: [
      {
        'mytheme': {                          /* your theme name */
           'accent' : '#ff1245',            /* Accent color */
           'accent-focus' : '#e90932',      /* Accent color - focused */
           'accent-content' : '#ffffff',    /* Foreground content color to use on accent color */

           'neutral' : '#3d4451',           /* Neutral color */
           'neutral-focus' : '#2a2e37',     /* Neutral color - focused */
           'neutral-content' : '#ffffff',   /* Foreground content color to use on neutral color */

           'base-100' : '#ffffff',          /* Base color of page, used for blank backgrounds */
           'base-200' : '#f9fafb',          /* Base color, a little darker */
           'base-300' : '#d1d5db',          /* Base color, even more darker */
           'base-content' : '#1f2937',      /* Foreground content color to use on base color */

           'info' : '#2094f3',              /* Info */
           'success' : '#009485',           /* Success */
           'warning' : '#ff9900',           /* Warning */
           'error' : '#ff5724',             /* Error */
        },
      },
    ],
  },
}
