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
    updatePost: (state, action: PayloadAction<PostsItem>) => {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export default postsSlice.reducer;
export type { PostsItem, PostsState };

export function getPosts(state: AppState) {
  return state.posts;
}

export const { addPost, updatePost } = postsSlice.actions;
