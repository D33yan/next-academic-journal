'use client';

import { useState, useEffect } from 'react';
import { db,storage } from '@/firebaseConfig';
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
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-800'>
      <h2 className='text-2xl font-bold mb-6 text-white'>Your Journals</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className='w-full max-w-2xl bg-white p-6 rounded-md shadow-md'>
          {journals.length === 0 ? (
            <p className='text-gray-600'>No journals found</p>
          ) : (
            <ul className='space-y-4'>
              {journals.map(journal => (
                <li key={journal.id} className='flex justify-between items-center p-4 bg-gray-100 rounded-md'>
                  <div>
                    <h3 className='text-lg font-semibold'>{journal.title}</h3>
                    <p className='text-gray-600'>{journal.description}</p>
                  </div>
                  <Button
                    variant='contained'
                    color='secondary'
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
