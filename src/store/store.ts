import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/CountSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
