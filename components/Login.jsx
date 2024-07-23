'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { Snackbar, Alert } from '@mui/material';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const router = useRouter();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAlertMessage('Login successful');
      setAlertSeverity('success');
      setOpen(true);
      router.push('/create-journal'); // Redirect to the home page or another page after successful login
    } catch (error) {
      setAlertMessage('Login failed: ' + error.message);
      setAlertSeverity('error');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='flex items-center justify-center min-h-screen min-w-full bg-gray-800'>
      <form onSubmit={handleLogin} className='bg-white p-6 rounded-md shadow-md  mx-auto w-[600px]'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>

        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium text-gray-900'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
          />
        </div>

        <div className='mb-4 '>
          <label htmlFor='password' className='block text-sm font-medium text-gray-900'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
          />
        </div>

        <div className='mt-6'>
          <button
            type='submit'
            className='w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
          >
            Login
          </button>

        

        </div>
      </form>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
