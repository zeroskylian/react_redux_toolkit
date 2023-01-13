import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/CountSlice';
import postsReducer from '../features/posts/postsSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer
  },
});

export default store;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
