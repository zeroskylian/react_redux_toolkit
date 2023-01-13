import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';

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
  reducers: {
    addPost: (state, action: PayloadAction<PostsItem>) => {
      state.push(action.payload);
    },
  },
});

export default postsSlice.reducer;
export type { PostsItem, PostsState };

export function getPosts(state: AppState) {
  return state.posts;
}

export const { addPost } = postsSlice.actions;
