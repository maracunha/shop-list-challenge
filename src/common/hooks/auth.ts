import { useEffect, useState } from 'react';
import { useGetUserQuery } from '../services/api';
import { setUser } from '../services/userSlice';
import { InputUser } from '../types';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export const useAuth = () => {
  const [isAutenticated, setIsAutenticated] = useState(false);
  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const [token, setToken] = useState('');

  const { value: userState } = useAppSelector((state) => state.user);
  // console.log('LOGIN PAGE:::', userState);

  const dispatch = useAppDispatch();

  const { data, isError, isLoading } = useGetUserQuery(userInput.email);
  // console.log({ data, isError, isLoading });

  useEffect(() => {
    if (data?.length === 1) {
      const [user] = data;
      dispatch(setUser(user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setIsAutenticated(userState.senha === userInput.password);
    setToken(userState.token);
  }, [userState, userInput]);

  const signin = (input: InputUser) => {
    console.log('sign in');
    setUserInput(input);
  };

  const signout = () => {
    console.log('sign out');
    setIsAutenticated(false);
    setToken('');
  };

  return { signin, signout, token, isAutenticated, isLoading };
};
