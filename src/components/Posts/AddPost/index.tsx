import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { addPost } from '../../../features/posts/postsSlice';
import { useAppDispatch } from '../../../app/hook';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();
  return (
    <section>
      <form>
        <label htmlFor="postTitle">文章标题:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <label htmlFor="postContent">内容：</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          style={{ marginTop: '10px' }}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        />
        <button
          type="button"
          onClick={() => {
            if (!title && !content) {
              return;
            }
            dispatch(addPost({ id: nanoid(), title, content }));
            setContent('');
            setTitle('');
          }}>
          保存文章
        </button>
      </form>
    </section>
  );
}
