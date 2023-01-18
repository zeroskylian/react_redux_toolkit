import React from 'react';
import { selectUsers } from '../../../features/users/usersSlice';
import { useAppSelector } from '../../../app/hook';

export default function PostAuthor(props: { userId: string }) {
  const author = useAppSelector(selectUsers).find((user) => {
    return user.id === props.userId;
  });
  return <span>by {author ? author.name : 'Unknown author'}</span>;
}
