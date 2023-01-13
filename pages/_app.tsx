import 'modern-normalize'
import '../styles/globals.scss'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Inter } from '@next/font/google'

const inter = Inter({
  variable: '--inter-font',
  weight: '200',
  subsets: ['latin'],
})

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <main className={`${inter.className}`}>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
