// app/page.tsx
"use client"
import React, { useState } from 'react';
import SearchImage from '@/components/SearchImage';
import Navbar from '@/components/navbar';

export default function Home() {
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <SearchImage setError={setError} />
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {error}
        </div>
      )}
    </main>
  );
}
