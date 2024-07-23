'use client';

import { useState, useEffect } from 'react';
import { db, storage } from '@/firebaseConfig';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { Snackbar, Alert, Button, CircularProgress } from '@mui/material';
import { auth } from '../utilits/auth-listener';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await fetchJournals(user.uid);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchJournals = async (uid) => {
    setLoading(true);
    try {
      const q = query(collection(db, 'journals'), where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const journalsList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      console.log('Fetched Journals:', journalsList); // Debug statement
      setJournals(journalsList);
    } catch (error) {
      console.error('Error fetching journals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJournal = async (id, imageUrl, pdfUrl) => {
    try {
      // Delete cover image
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      // Delete PDF
      const pdfRef = ref(storage, pdfUrl);
      await deleteObject(pdfRef);

      // Delete Firestore document
      await deleteDoc(doc(db, 'journals', id));

      setAlertMessage('Journal deleted successfully');
      setAlertSeverity('success');
      setOpen(true);

      // Update the list of journals
      setJournals(journals.filter(journal => journal.id !== id));
    } catch (e) {
      setAlertMessage('An error occurred: ' + e.message);
      setAlertSeverity('error');
      setOpen(true);
      console.error(e);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!user) {
    return null; // Return null to prevent the component from rendering before redirect
  }

  return (
    <div className='flex flex-col px-10 min-h-screen bg-gray-800'>
      <h2 className='text-2xl font-bold mb-6 text-white'>Your Journals</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className='w-full max-w-2xl bg-white p-6 rounded-md shadow-md'>
          {journals.length === 0 ? (
            <p className='text-gray-600'>No journals found</p>
          ) : (
            <ul role="list" className="divide-y divide-gray-100">
              {journals.map(journal => (
                <li key={journal.id} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <img alt={journal.title} src={journal.imageUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{journal.title}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{journal.description}</p>
                    </div>
                  </div>
                  <Button
                    variant='contained'
                   
                    className='bg-gray-800 focus:bg-gray-600'
                    onClick={() => handleDeleteJournal(journal.id, journal.imageUrl, journal.pdfUrl)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
