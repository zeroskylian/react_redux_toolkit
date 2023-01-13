import { createSlice } from '@reduxjs/toolkit';

type PostsItem = {
  id: string;
  title: string;
  content: string;
};

type PostsState = PostsItem[];

const initialState: PostsState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

export default postsSlice.reducer;
