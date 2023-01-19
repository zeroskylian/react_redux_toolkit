import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hook';
import { selectUsersById } from '../../../features/users/usersSlice';
import { selectPostByUser } from '../../../features/posts/postsSlice';

export default function UserPostList(
  props: RouteComponentProps<{ id: string }>
) {
  const id = props.match.params.id;
  const user = useAppSelector((state) => {
    return selectUsersById(state, id);
  });
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
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      );
    });
  return (
    <div className="posts-list">
      <h2>{user?.name}</h2>
      <ul>{renderProps}</ul>
    </div>
  );
}
