import { useRouter } from 'next/router';
import React, { useState } from 'react';
import dynamic from "next/dynamic"

const MapComponent = dynamic(() => import("../components/Map.js"), { ssr:false })

export default function Home() {
  const router = useRouter();
  const { query } = router;

  const twitterHandle = 'nathanzhaoo';

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <h1 className="text-6xl tracking-widest mb-8">Where is Kate Middleton?</h1>
        <div className="w-full md:w-full lg:w-3/4 xl:w-3/4 h-96 bg-white shadow-lg rounded-lg overflow-hidden">
          <MapComponent startX={query.x || 0} startY={query.y || 0}/>
        </div>

        <div className="w-full md:w-full lg:w-3/4 xl:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden p-4 mt-4">
          <h2 className="text-2xl font-bold mb-2">About Kate Middleton</h2>
          <p>Kate Middleton, also known as Catherine, Duchess of Cambridge, is the wife of Prince William, Duke of Cambridge. Unforunately, she is missing. Where would she be?</p>
        </div>

        <footer className="w-full bg-blue-200 text-gray-700 text-center p-2 fixed bottom-0 text-sm">
          Follow me on Twitter: <a href={`https://twitter.com/${twitterHandle}`} className="font-bold" target="_blank" rel="noopener noreferrer">@{twitterHandle}</a>
        </footer>
      </div>
    </>
  );
}