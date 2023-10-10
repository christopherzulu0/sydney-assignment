
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react"
const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
    <ChakraProvider>
      <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
