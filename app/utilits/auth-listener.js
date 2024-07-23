import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

const authListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export { auth, authListener };