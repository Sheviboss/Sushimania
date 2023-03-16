import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Slices/CounterSlice';
import authReducer from './Slices/AuthSlice';
import ProfileReducer from './Slices/ProfileSlice';
import SearchReducer from './Slices/SearchSlice';
import FilterReducer from './Slices/FilterSlice';
//import { productApi } from './services/productService';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    profile: ProfileReducer,
    search: SearchReducer,
    filter: FilterReducer,
    // [productApi.reducerPath]: productApi.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
