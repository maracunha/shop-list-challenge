import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IProducts } from '../types';

interface UserState {
  value: IProducts[];
}
const initialState: UserState = {
  value: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProducts[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.products;

export default productsSlice.reducer;
