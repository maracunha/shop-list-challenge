import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { User } from '../types';

interface UserState {
  value: User;
}
const initialState: UserState = {
  value: {
    nome: '',
    sobrenome: '',
    cpf: 0,
    sexo: '',
    dt_nascimento: 0,
    cep: 0,
    cidade: '',
    estado: '',
    logradouro: '',
    bairro: '',
    complemento: 0,
    email: '',
    senha: null,
    token: '',
    image: '',
    id: 0,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
    resetUser: (state) => {
      state.value = { ...initialState.value };
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
