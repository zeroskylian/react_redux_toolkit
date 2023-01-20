import {
  createSlice,
  PayloadAction,
  createSelector,
  createEntityAdapter,
  nanoid,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { AppState } from '../../app/store';
import { StringNumber } from '../../utils/utils';
import { client } from '../../api/client';

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

type PostRequestStatus = {
  // 多个可能的状态枚举值
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const postsAdapter = createEntityAdapter<PostsItem>({
  selectId: (post) => post.id,
  sortComparer: (lhs, rhs) => {
    return rhs.date.localeCompare(lhs.date);
  },
});

const initialState = postsAdapter.getInitialState<PostRequestStatus>({
  status: 'idle',
  error: null,
});

type PostsState = typeof initialState;

export const fetchPosts = createAsyncThunk<
  PostsItem[],
  void,
  {
    rejectValue: Error;
  }
>('posts/fetchPosts', async () => {
  try {
    const response = await client.get('/fakeApi/posts');
    return response.posts;
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost: { title: string; content: string; user: string }) => {
    const response = await client.post('/fakeApi/posts', {
      post: initialPost,
    });
    return response.post as PostsItem;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<PostsItem, string>) {
        // 更新插入方式
        postsAdapter.upsertOne(state, action.payload);
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        if (state.status === 'loading') {
          postsAdapter.upsertMany(state, action);
          state.status = 'succeeded';
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        if (state.status === 'loading') {
          state.status = 'failed';
          state.error = action.error?.message ?? null;
        }
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        postsAdapter.addOne(state, action.payload);
      });
  },
});

export default postsSlice.reducer;
export type { PostsItem, PostReactions, PostsState };

export const { addPost, updatePost, reactionAdded } = postsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors<AppState>((state) => {
  return state.posts;
});

export const selectPostByUser = createSelector(
  [selectAllPosts, (state: AppState, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
);
