import React from 'react'
import AddPost from '../AddPost';
import PostList from '../PostList';

export default function Posts() {
  console.log('first')
  return (
    <div>
        <AddPost />
        <PostList />
    </div>
  )
}
