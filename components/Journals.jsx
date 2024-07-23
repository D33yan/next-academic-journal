'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function JournalCards() {
    const [expanded, setExpanded] = useState(false);
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        const fetchJournals = async () => {
            const querySnapshot = await getDocs(collection(db, 'journals'));
            const journalsData = querySnapshot.docs.map(doc => doc.data());
            setJournals(journalsData);
        };
        fetchJournals();
    }, []);
    const journalData = {
        journalTitle: journals.title,
        journalImage:journals.image,
        journalDescription:journals.description,
        
        
      }

   

    return (
        <div className='container mx-auto p-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {journals.map((journal, index) => (
                    <article className="group" key={index}>
                        
                        <img
                            alt={journal.title}
                            src={journal.imageUrl}
                            className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%] dark:shadow-gray-700/25"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                {journal.title}
                            </h3>
                            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
                                {journal.description} 
                            </p>
                            <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400'>
                                {journal.author}
                            </p>
                            
                            <Link
                                href={{ 
                                    pathname:`journals/${journal.slug}`,
                                    query:{
                                        title:journal.title,
                                        author:journal.author,
                                        description:journal.description,
                                        image:journal.imageUrl,
                                        pdf:journal.pdf,
                                       
                                    }
                                 }}
                                className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                            >
                                Let's read
                                <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                                    &rarr;
                                </span>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}