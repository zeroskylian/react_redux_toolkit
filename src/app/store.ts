import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/CountSlice';
import postsReducer from '../features/posts/postsSliceAdapter';
import usersSlice from '../features/users/usersSlice';
import notificationsSlice from '../features/notifications/notificationsSlice';
import { increment } from '../features/counter/CountSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    user: usersSlice,
    notifications: notificationsSlice
  },
});

export default store;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const exampleThunkFunction = (
  dispatch: AppDispatch,
  getState: typeof store.getState
) => {
  const stateBefore = getState();
  console.log(`Counter before: ${stateBefore.counter}`);
  dispatch(increment());
  const stateAfter = getState();
  console.log(`Counter after: ${stateAfter.counter}`);
};

export const exampleParamsThunkFunction = (count: number) => {
  return (dispatch: AppDispatch, getState: typeof store.getState) => {
    const stateBefore = getState();
    console.log(`Counter before: ${stateBefore.counter}`);
    dispatch(increment());
    const stateAfter = getState();
    console.log(`Counter after: ${stateAfter.counter}`);
  };
};
