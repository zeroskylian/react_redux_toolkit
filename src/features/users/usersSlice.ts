import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';

type User = {
  id: string;
  name: string;
};

type userState = User[];

const initialState: userState = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
];

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default usersSlice.reducer;

export const selectUser = (state: AppState) => {
  return state.user
}
