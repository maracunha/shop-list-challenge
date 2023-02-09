import { configureStore } from '@reduxjs/toolkit';
import user from './common/services/userSlice';
import products from './common/services/productsSlice';
import { userApi } from './common/services/api';

export const store = configureStore({
  reducer: {
    user,
    products,

    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
