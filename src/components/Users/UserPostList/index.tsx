import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hook';
import { selectPostByUser } from '../../../features/posts/postsSlice';
import PostAuthor from '../../Posts/PostAuthor';
import TimeAgo from '../../Posts/TimeAgo';
import ReactionButtons from '../../Posts/ReactionButtons';

export default function UserPostList(
  props: RouteComponentProps<{ id: string }>
) {
  const id = props.match.params.id;
  const posts = useAppSelector((state) => {
    return selectPostByUser(state, id);
  });
  const renderProps = posts
    .slice()
    .sort((lhs, rhs) => {
      return rhs.date.localeCompare(lhs.date);
    })
    .map((post) => {
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
