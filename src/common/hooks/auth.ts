import { useEffect, useState } from 'react';
import { useGetUserQuery } from '../services/api';
import { setUser, resetUser } from '../services/userSlice';
import { InputUser } from '../types';
import { useAppDispatch } from './reduxHooks';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(true);
  const [error, setError] = useState(false);
  const [userInput, setUserInput] = useState({ email: '', password: '' });

  const { data, isLoading } = useGetUserQuery(userInput.email, { skip });

  useEffect(() => {
    if (data?.length === 1) {
      const [user] = data;
      console.log('user: ', user.senha, 'input', userInput.password);
      if (user.senha === userInput.password) {
        setError(false);
        dispatch(setUser(user));
      } else {
        setError(true);
      }
    }

    if (data?.length === 0) {
      setError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, userInput]);

  const signin = (inputData: InputUser) => {
    setSkip(false);
    setUserInput(inputData);
  };

  const logout = () => {
    dispatch(resetUser());
  };

  return { signin, logout, isLoading, error };
};
