import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { AppState } from '../../app/store';
import { sub } from 'date-fns';

interface StringNumber {
  [key: string]: number;
}

type PostsItem = {
  id: string;
  title: string;
  content: string;
  user: string;
  date: string;
  reactions: PostReactions;
};

interface PostReactions extends StringNumber {
  thumbsUp: number;
  hooray: number;
  heart: number;
  rocket: number;
  eyes: number;
}

type PostsState = PostsItem[];

const initialState: PostsState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    user: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    user: '1',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<PostsItem, string>) {
        state.push(action.payload);
      },
      prepare(title: string, content: string, user: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          } as PostsItem,
        };
      },
    },
    updatePost: (state, action: PayloadAction<PostsItem>) => {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded: (
      state,
      action: PayloadAction<{ id: string; reaction: string }>
    ) => {
      const { id, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export default postsSlice.reducer;
export type { PostsItem, PostReactions, PostsState };

export function getPosts(state: AppState) {
  return state.posts;
}

export const { addPost, updatePost, reactionAdded } = postsSlice.actions;

export const selectAllPosts = (state: AppState) => state.posts;

export const selectPostById = (state: AppState, postId: string) =>
  state.posts.find((post) => post.id === postId);

export const selectPostByUser = (state: AppState, user: string) =>
  state.posts.filter((post) => post.user === user);
