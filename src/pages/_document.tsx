import { Html, Head, Main, NextScript } from 'next/document'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <QueryClientProvider client={queryClient}>
        <body
          style={{
            background: `#212124`,
            backgroundAttachment: `fixed`,
          }}
        >
          <Main />
          <NextScript />
        </body>
      </QueryClientProvider>
    </Html>
  )
}
