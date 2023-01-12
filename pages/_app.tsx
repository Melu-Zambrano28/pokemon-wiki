import 'modern-normalize'
import '../styles/globals.scss'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
    brown: {
      100: '#c08552',
      200: '#dab49d',
      300: '#895737',
      400: '#5e3023',
    },
    violet: {
      300: '#a040a0',
    },
  },
})

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
