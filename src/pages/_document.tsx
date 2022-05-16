import { Html, Head, Main, NextScript } from 'next/document';

function Document() {
   return (
      <Html>
         <Head>
            <link rel="shortcut icon" type="image/x-icon" href="/favicons/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
            <link rel="mask-icon" color="#212529" href="/favicons/favicon-plain.svg" />

            <link rel="manifest" href="/site.webmanifest" />
            <meta name="msapplication-TileColor" content="#212529" />
            <meta name="theme-color" content="#212529" />

            <meta name='type' property='og:type' content='website' />
            <meta name='image' property='og:image' content='/' />
            <meta name='url' property='og:url' content='https://felixgrohs.com' />
         </Head>

         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   );
}

export default Document;