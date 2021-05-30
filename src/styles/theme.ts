import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    purple: {
      '50': '#EFECFF'
    }
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.900',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        scrollBehavior: 'smooth',
        "&::-webkit-scrollbar": {
          display: 'none'
        }
      }
    }
  }
})