import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface AuthState {
  value: {
    email: string;
    password: string;
  };
}

interface Payload {
  email: string;
  password: string;
}

const initialState: AuthState = {
  value: {
    email: '',
    password: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Payload>) => {
      console.log({ state, action });
      state.value = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
