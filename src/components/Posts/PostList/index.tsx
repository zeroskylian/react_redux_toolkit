import React from 'react';
import { useAppSelector } from '../../../app/hook';
import {
  selectPostById,
  selectPostIds
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
  const posts = useAppSelector(selectPostIds);
  const renderProps = posts.map((post) => {
    return <PostExcerpt key={post} id={post as string} />;
  });
  return (
    <div className="posts-list">
      <h2>Posts</h2>
      {renderProps}
    </div>
  );
}
