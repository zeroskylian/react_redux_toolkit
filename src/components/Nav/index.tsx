import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const routers = [
    { id: 2, title: 'posts', path: '/posts' },
    { id: 1, title: 'counter', path: '/counter' },
    { id: 3, title: 'user', path: '/user' },
  ];
  const [time, setTime] = useState(0);
  return (
    <div>
      <ul style={{ display: 'inline-block' }}>
        {routers.map((item) => {
          return (
            <li key={item.id}>
              {item.id === 1 ? (
                <Link to={item.path}>{item.title + `${time}`}</Link>
              ) : (
                <Link to={item.path}>{item.title}</Link>
              )}
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => {
          setTime((time) => {
            return time + 1;
          });
        }}>
        Add
      </button>
    </div>
  );
}
