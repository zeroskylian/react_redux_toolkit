import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectAllPosts } from '../../features/posts/postsSliceAdapter';
import { increment, selectCount } from '../../features/counter/CountSlice';
import { fetchNotifications } from '../../features/notifications/notificationsSlice';

export default function Nav() {
  const routers = [
    { id: 1, title: 'counter', path: '/counter' },
    { id: 2, title: 'posts', path: '/posts' },
    { id: 3, title: 'user', path: '/user' },
    { id: 4, title: 'notifications', path: '/notifications' },
  ];
  const postsCount = useAppSelector(selectAllPosts).length;
  const time = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }
  return (
    <div>
      <ul style={{ display: 'inline-block' }}>
        {routers.map((item) => {
          return (
            <li key={item.id}>
              {item.id === 1 ? (
                <Link to={item.path}>{item.title + ` ${time}`}</Link>
              ) : item.id === 2 ? (
                <Link to={item.path}>{item.title + ` ${postsCount}`}</Link>
              ) : item.id === 3 ? (
                <Link to={item.path}>{item.title}</Link>
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
          dispatch(increment());
        }}>
        Add
      </button>
      <button
        style={{ display: 'block' }}
        onClick={() => {
          fetchNewNotifications()
        }}>
        Refresh Notification
      </button>
    </div>
  );
}
