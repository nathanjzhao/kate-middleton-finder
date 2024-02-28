import React from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import '../styles/globals.css'


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

function MyApp({ Component, pageProps }) {

    return (
      <>
        <ConvexProvider client={convex}>
          <Component {...pageProps} />
        </ConvexProvider>
      </>
    )
}


export default MyApp