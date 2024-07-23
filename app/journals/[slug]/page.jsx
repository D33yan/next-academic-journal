'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function JournalDetail(context) {
  const params = context.searchParams;

  {params ? console.log(params.title) : 'doesnt exist'}

  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-white">{params.title}</h1>
      <p className="text-gray-600">By {params.author}</p>
      <img src={params.image} alt={params.title} className="w-full h-80 object-cover mt-4 rounded" />
      <p className="mt-4 text-white">{params.description}</p>
      <a href={params.pdf} download className="mt-4 inline-block bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500">
        Download Journal
      </a>
    </div>
  );
}
