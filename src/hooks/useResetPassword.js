import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useResetPassword = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const resetPassword = async (email) => {
    setError(null);
    setIsPending(true);

    try {
      // reset password
      await projectAuth.sendPasswordResetEmail(email);

      // get the user that requested the password reset
      const user = projectAuth.currentUser;

      // dispatch the RESET_PASSWORD action with the user
      dispatch({ type: 'RESET_PASSWORD', payload: user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { resetPassword, isPending, error };
};
