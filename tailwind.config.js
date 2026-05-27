/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(198, 100%, 97%)',
            '100': 'hsl(198, 100%, 94%)',
            '200': 'hsl(198, 100%, 86%)',
            '300': 'hsl(198, 100%, 76%)',
            '400': 'hsl(198, 100%, 64%)',
            '500': 'hsl(198, 100%, 50%)',
            '600': 'hsl(198, 100%, 40%)',
            '700': 'hsl(198, 100%, 32%)',
            '800': 'hsl(198, 100%, 24%)',
            '900': 'hsl(198, 100%, 16%)',
            '950': 'hsl(198, 100%, 10%)',
            DEFAULT: '#b5e9ff'
        },
        secondary: {
            '50': 'hsl(337, 79%, 97%)',
            '100': 'hsl(337, 79%, 94%)',
            '200': 'hsl(337, 79%, 86%)',
            '300': 'hsl(337, 79%, 76%)',
            '400': 'hsl(337, 79%, 64%)',
            '500': 'hsl(337, 79%, 50%)',
            '600': 'hsl(337, 79%, 40%)',
            '700': 'hsl(337, 79%, 32%)',
            '800': 'hsl(337, 79%, 24%)',
            '900': 'hsl(337, 79%, 16%)',
            '950': 'hsl(337, 79%, 10%)',
            DEFAULT: '#f9ccdd'
        },
        accent: {
            '50': 'hsl(231, 61%, 97%)',
            '100': 'hsl(231, 61%, 94%)',
            '200': 'hsl(231, 61%, 86%)',
            '300': 'hsl(231, 61%, 76%)',
            '400': 'hsl(231, 61%, 64%)',
            '500': 'hsl(231, 61%, 50%)',
            '600': 'hsl(231, 61%, 40%)',
            '700': 'hsl(231, 61%, 32%)',
            '800': 'hsl(231, 61%, 24%)',
            '900': 'hsl(231, 61%, 16%)',
            '950': 'hsl(231, 61%, 10%)',
            DEFAULT: '#293ca9'
        },
        'neutral-50': '#ffffff',
        'neutral-100': '#000000',
        'neutral-200': '#9e9e9e',
        'neutral-300': '#121212',
        'neutral-400': '#cbcbcb',
        foreground: '#000000'
    },
    fontFamily: {
        body: [
            'Siro',
            'Inter',
            'sans-serif'
        ],
        heading: [
            '"Bruno Ace"',
            'sans-serif'
        ],
        font2: [
            'Bitter',
            'sans-serif'
        ],
        font3: [
            'Siro',
            'Inter',
            'sans-serif'
        ]
    },
    fontSize: {
        '10': [
            '10px',
            {
                lineHeight: '11px'
            }
        ],
        '12': [
            '12px',
            {
                lineHeight: '13.2px'
            }
        ],
        '16': [
            '16px',
            {
                lineHeight: '24px'
            }
        ],
        '59.136': [
            '59.136px',
            {
                lineHeight: '54.4051px'
            }
        ],
        '45.824': [
            '45.824px',
            {
                lineHeight: '41.2416px'
            }
        ],
        '41.472': [
            '41.472px',
            {
                lineHeight: '37.3248px'
            }
        ],
        '32.512': [
            '32.512px',
            {
                lineHeight: '29.2608px'
            }
        ],
        '25.856': [
            '25.856px',
            {
                lineHeight: '23.2704px',
                letterSpacing: '-1.03424px'
            }
        ],
        '17.664': [
            '17.664px',
            {
                lineHeight: '15.8976px'
            }
        ],
        '15.232': [
            '15.232px',
            {
                lineHeight: '16.7552px'
            }
        ],
        '14.72': [
            '14.72px',
            {
                lineHeight: '13.248px'
            }
        ],
        '13.312': [
            '13.312px',
            {
                lineHeight: '11.1821px'
            }
        ],
        '12.16': [
            '12.16px',
            {
                lineHeight: '13.376px'
            }
        ],
        '11.776': [
            '11.776px',
            {
                lineHeight: '10.5984px'
            }
        ],
        '10.368': [
            '10.368px',
            {
                lineHeight: '11.4048px'
            }
        ]
    },
    spacing: {
        '0': '1px',
        '1': '23px',
        '2': '29px',
        '3': '32px',
        '4': '41px',
        '5': '48px',
        '6': '52px',
        '7': '56px',
        '8': '59px',
        '9': '63px',
        '10': '65px',
        '11': '68px',
        '12': '70px',
        '13': '72px',
        '14': '77px',
        '15': '81px',
        '16': '95px',
        '17': '97px',
        '18': '103px',
        '19': '105px',
        '20': '125px',
        '21': '134px',
        '22': '144px',
        '23': '162px',
        '24': '232px',
        '25': '250px'
    },
    borderRadius: {
        xs: '2px',
        md: '8px',
        xl: '20px',
        full: '52px'
    },
    container: {
        center: true,
        padding: '0px'
    },
    maxWidth: {
        container: '100%'
    }
},
  },
};
