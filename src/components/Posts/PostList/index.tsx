import React from 'react';
import { useAppSelector } from '../../../app/hook';
import { selectAllPosts } from '../../../features/posts/postsSliceAdapter';
import { Link } from 'react-router-dom';
import PostAuthor from '../PostAuthor';
import TimeAgo from '../TimeAgo';
import ReactionButtons from '../ReactionButtons';

export default function PostList() {
  const posts = useAppSelector(selectAllPosts);
  const renderProps = posts.slice().map((post) => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <PostAuthor userId={post.id} />
        <TimeAgo timestamp={post.date} />
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <ReactionButtons post={post} />
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
      </article>
    );
  });
  return (
    <div className="posts-list">
      <h2>Posts</h2>
      {renderProps}
    </div>
  );
}
