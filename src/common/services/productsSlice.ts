import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IProducts } from '../types';

interface UserState {
  value: IProducts[];
  searchItem: string;
}

const initialState: UserState = {
  value: [],
  searchItem: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProducts[]>) => {
      state.value = action.payload;
    },
    setSearchItem: (state, action: PayloadAction<string>) => {
      console.log('state', action)
      state.searchItem = action.payload;
    },
  },
});

export const { setProducts, setSearchItem } = productsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.products;

export default productsSlice.reducer;
