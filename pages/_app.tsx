import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

const theme = extendTheme({
  colors: {
    gray: {
      100: '#F5f5f5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    green: {
      100: '#78c850',
    },
    orange: {
      100: '#f08030',
    },
    blue: {
      100: '#6890ef',
    },
    yellow: {
      100: '#F8D030',
      900: '#a8a878',
    },
    light_blue: {
      100: '#98d8d8',
    },
    red: {
      100: '#c03028',
    },
  },
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
