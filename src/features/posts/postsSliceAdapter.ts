import {
  createSlice,
  PayloadAction,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { AppState } from '../../app/store';

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

const postAdapter = createEntityAdapter<PostsItem>({
  selectId: (post) => post.id,
  sortComparer: (lhs, rhs) => {
    return rhs.date.localeCompare(lhs.date);
  },
});

const initialState = postAdapter.getInitialState();

type PostsState = typeof initialState;

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<PostsItem, string>) {
        // 更新插入方式
        postAdapter.upsertOne(state, action.payload);
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
      // 更新查找方式
      const existingPost = state.entities[id];
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
      // 更新查找方式
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export default postsSlice.reducer;
export type { PostsItem, PostReactions, PostsState };

export const { addPost, updatePost, reactionAdded } = postsSlice.actions;

// export const selectAllPosts = (state: AppState) => state.posts;

// export const selectPostById = (state: AppState, postId: string) =>
//   state.posts.find((post) => post.id === postId);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postAdapter.getSelectors<AppState>((state) => {
  return state.posts;
});

export const selectPostByUser = createSelector(
  [selectAllPosts, (state: AppState, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
);
