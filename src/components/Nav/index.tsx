import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectAllPosts } from '../../features/posts/postsSlice';
import { increment, selectCount } from '../../features/counter/CountSlice';

export default function Nav() {
  const routers = [
    { id: 1, title: 'counter', path: '/counter' },
    { id: 2, title: 'posts', path: '/posts' },
    { id: 3, title: 'user', path: '/user' },
  ];
  const postsCount = useAppSelector(selectAllPosts).length;
  const time = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
  return (
    <div>
      <ul style={{ display: 'inline-block' }}>
        {routers.map((item) => {
          return (
            <li key={item.id}>
              {item.id === 3 ? (
                <Link to={item.path}>{item.title + ` ${time}`}</Link>
              ) : item.id === 2 ? (
                <Link to={item.path}>{item.title + ` ${postsCount}`}</Link>
              ) : (
                <Link to={item.path}>{item.title}</Link>
              )}
            </li>
          );
        })}
      </ul>
      <button
        style={{ display: 'block' }}
        onClick={() => {
          dispatch(increment())
        }}>
        Add
      </button>
    </div>
  );
}
