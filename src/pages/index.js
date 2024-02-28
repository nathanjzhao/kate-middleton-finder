import { useRouter } from 'next/router';
import React, { useState } from 'react';
import dynamic from "next/dynamic"

const MapComponent = dynamic(() => import("../components/Map.js"), { ssr:false })

export default function Home() {
  const router = useRouter();
  const { query } = router;

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <h1 className="text-6xl tracking-widest mb-8">Where is Kate Middleton?</h1>
        <div className="w-full md:w-full lg:w-3/4 xl:w-3/4 h-96 bg-white shadow-lg rounded-lg overflow-hidden">
          <MapComponent startX={query.x || 0} startY={query.y || 0}/>
        </div>
      </div>
    </>
  );
}