import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';
import { client } from '../../api/client';
import { AppDispatch } from '../../app/store';

type User = {
  id: string;
  name: string;
};

const userAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

const initialState = userAdapter.getInitialState();

// type userState = typeof initialState;

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    usersLoaded: userAdapter.setAll,
  },
});

export default usersSlice.reducer;

const userSelector = userAdapter.getSelectors<AppState>((state) => {
  return state.user;
});

export const { usersLoaded } = usersSlice.actions;
export const { selectAll: selectUsers, selectById: selectUsersById } =
  userSelector;

export const fetchUsers = async (dispatch: AppDispatch) => {
  const response = await client.get('/fakeApi/users');
  dispatch(usersLoaded(response.users));
};
