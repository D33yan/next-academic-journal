'use client';
import React, { useState, useEffect } from 'react';
import { useRouter,useSearchParams} from 'next/navigation';
import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function JournalDetail(context) {
//   const searchParams = useSearchParams()
  const params = context.searchParams;

  
  {params ? console.log(params.title) : 'doesnt exist'}
  

 
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     const journalAuthor = searchParams.get('journalAuthor');
//   const journalTitle = searchParams.get('journalTitle');
//   const journalPhoto = searchParams.get('journalPhoto');
//   const journalPdf = searchParams.get('journalPdfUrl');
//   const journalDescription = searchParams.get('journalDescription');
  
//     if (journalTitle && journalAuthor && journalDescription && journalPdf && journalPhoto) {
//       setJournal({
//         title,
//         imageUrl,
//         description,
//         author,
//         createdAt,
//       });
//       setLoading(false);
//     }
//   }, [searchParams]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!journal) {
//     return <div>No journal found.</div>;
//   }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-white">{params.title}</h1>
      <p className="text-gray-600">By {params.author}</p>
      <img src={params.image} alt={params.title} className="w-full h-64 object-cover mt-4 rounded" />
      <p className="mt-4 text-white">{params.description}</p>

      <button>

      </button>
    </div>
  );
}
