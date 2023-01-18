import React from 'react';
import { Link } from 'react-router-dom';
import { selectUsers } from '../../features/users/usersSlice';
import { useAppSelector } from '../../app/hook';

export default function UserList() {
  const users = useAppSelector(selectUsers);

  return (
    <div>
      <ul>
        {users.map((user) => {
          return (
            <Link to={`/user/${user.id}`}>
              <li key={user.id}>{user.name}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
