import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/CountSlice';
import postsReducer from '../features/posts/postsSlice'
import usersSlice from '../features/users/usersSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    user: usersSlice
  },
});

export default store;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
