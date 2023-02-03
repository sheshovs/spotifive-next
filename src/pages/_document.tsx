import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        style={{
          background: '#212124',
          backgroundAttachment: 'fixed',
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
