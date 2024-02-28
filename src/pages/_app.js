import React from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Head from 'next/head';
import '../styles/globals.css'


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

function MyApp({ Component, pageProps }) {

    return (
      <>
        <Head>
          <link rel="icon" href="/kate.png" />
        </Head>
        <ConvexProvider client={convex}>
          <Component {...pageProps} />
        </ConvexProvider>
      </>
    )
}


export default MyApp