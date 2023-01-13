import React from 'react';
import { useAppSelector } from '../../app/hook';
import { getPosts } from '../../features/posts/postsSlice';
import { Link } from 'react-router-dom';

export default function PostList() {
  const posts = useAppSelector(getPosts);
  const renderProps = posts.map((post) => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
      </article>
    );
  });
  return (
    <div>
      <h3>Posts</h3>
      {renderProps}
    </div>
  );
}
