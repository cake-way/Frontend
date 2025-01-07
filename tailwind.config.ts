import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryRed1: '#FA2840',
        primaryRed2: '#FF6C81',
        primaryRed3: '#FFA9B6',
        grayscale900: '#292929',
        grayscale800: '#3A3A3A',
        grayscale700: '#5A5A5A',
        grayscale600: '#949494',
        grayscale500: '#B4B4B4',
        grayscale400: '#D1D1D1',
        grayscale300: '#E6E6E6',
        grayscale200: '#EEEEEE',
        grayscale100: '#F4F4F4',
        black: '#171717',
        white: '#FAFAFA',
        lime1: '#DCDA75',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'], // Pretendard를 기본 sans-serif로 설정
      },
      screens: {
        sm: '375px',
        md: '480px', //pc버전일때 모바일뷰 최대 너비
      },
      keyframes: {
        spin: {
          ' 0%': {
            transform: 'rotate(0deg)',
          },
          ' 100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
      borderRadius: {
        xl: 'calc(var(--radius) +14px)', //22px
        lg: 'calc(var(--radius) + 4px)', //12px
        md: 'var(--radius)', //8px
        sm: 'calc(var(--radius) + 2px)', //6px
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#171717',
            '--tw-prose-headings': '#171717',
            '--tw-prose-bold': '#171717',
            '--tw-prose-links': '#FA2840',
            '--tw-prose-code': '#292929',
          },
        },
      },
      fontSize: {
        heading1: ['20px', { lineHeight: '34px', letterSpacing: '-1%' }], // Heading 1
        title1: [
          '24px',
          { lineHeight: '34px', fontWeight: 'bold', letterSpacing: '-1%' },
        ], // Title 1
        title2: [
          '18px',
          { lineHeight: '26px', fontWeight: 'bold', letterSpacing: '-1%' },
        ], // Title 2
        title3: [
          '16px',
          { lineHeight: '24px', fontWeight: 'bold', letterSpacing: '-1%' },
        ], // Title 3
        body1: [
          '14px',
          { lineHeight: '22px', fontWeight: 'bold', letterSpacing: '-1%' },
        ], // Body 1
        body2: [
          '12px',
          { lineHeight: '18px', fontWeight: 'semibold', letterSpacing: '-1%' },
        ], // Body 2
        body2Medium: [
          '12px',
          { lineHeight: '18px', fontWeight: 'medium', letterSpacing: '-1%' },
        ], // Body 2 (Medium)
      },
      scrollbar: {
        hidden: {
          'scrollbar-width': 'none' /* Firefox */,
          '-ms-overflow-style': 'none' /* IE, Edge */,
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const typography = {
        // Heading 1
        '.heading-1': {
          fontSize: '20px',
          fontWeight: 'bold',
          lineHeight: '34px',
          letterSpacing: '-1%',
        },
        // Title 1
        '.title-1': {
          fontSize: '24px',
          fontWeight: 'bold',
          lineHeight: '34px',
          letterSpacing: '-1%',
        },
        // Title 2
        '.title-2': {
          fontSize: '18px',
          fontWeight: 'bold',
          lineHeight: '26px',
          letterSpacing: '-1%',
        },
        // Title 3
        '.title-3': {
          fontSize: '16px',
          fontWeight: 'bold',
          lineHeight: '24px',
          letterSpacing: '-1%',
        },
        // Body 1
        '.body-1': {
          fontSize: '14px',
          fontWeight: 'bold',
          lineHeight: '22px',
          letterSpacing: '-1%',
        },
        // Body 2 (Semibold)
        '.body-2': {
          fontSize: '12px',
          fontWeight: '600', // semibold
          lineHeight: '18px',
          letterSpacing: '-1%',
        },
        // Body 2 (Medium)
        '.body-2-medium': {
          fontSize: '12px',
          fontWeight: '500', // medium
          lineHeight: '18px',
          letterSpacing: '-1%',
        },
      };
      addUtilities(typography);
    }),
  ],
} satisfies Config;
