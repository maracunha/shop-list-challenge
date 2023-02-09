import { useEffect, useState } from 'react';
import { useGetUserQuery } from '../services/api';
import { setUser } from '../services/userSlice';
import { InputUser } from '../types';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export const useAuth = () => {
  const [skip, setSkip] = useState(true);
  const [error, setError] = useState(false);
  const [userInput, setUserInput] = useState({ email: '', password: '' });

  const { value: userState } = useAppSelector((state) => state.user);
  console.log('Auth hook:::', userState);

  const dispatch = useAppDispatch();

  const { data, isError, isLoading } = useGetUserQuery(userInput.email, { skip });
  console.log({ data, isError, isLoading });

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
    console.log('sign in');
    setSkip(false);
    setUserInput(inputData);
  };

  const signout = () => {
    console.log('sign out');
    localStorage.removeItem('user');
  };

  return { signin, signout, isLoading, error };
};
