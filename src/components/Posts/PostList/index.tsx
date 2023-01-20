import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hook';
import {
  selectPostById,
  selectPostIds,
  fetchPosts,
} from '../../../features/posts/postsSliceAdapter';
import { Link } from 'react-router-dom';
import PostAuthor from '../PostAuthor';
import TimeAgo from '../TimeAgo';
import ReactionButtons from '../ReactionButtons';

function PostExcerpt(props: { id: string }) {
  const { id } = props;
  const post = useAppSelector((state) => {
    return selectPostById(state, id);
  });
  return (
    <article className="post-excerpt" key={id}>
      <h3>{post?.title}</h3>
      <PostAuthor userId={id} />
      <TimeAgo timestamp={post!.date} />
      <p className="post-content">{post?.content.substring(0, 100)}</p>
      <ReactionButtons post={post!} />
      <Link to={`/posts/${post!.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
}

export default function PostList() {
  const dispatch = useAppDispatch();
  const postIds = useAppSelector(selectPostIds);
  const status = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  // Sort posts in reverse chronological order
  const orderedPostIds = postIds.slice().reverse();
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let renderProps;

  if (status === 'loading') {
    renderProps = <div className="loader">Loading...</div>;
  } else if (status === 'succeeded') {
    renderProps = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} id={postId as string} />
    ));
  } else if (status === 'failed') {
    renderProps = <div>{error}</div>;
  }

  return (
    <div className="posts-list">
      <h2>Posts</h2>
      {renderProps}
    </div>
  );
}
