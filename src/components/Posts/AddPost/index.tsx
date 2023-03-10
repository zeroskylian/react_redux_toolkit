import React, { useState } from 'react';
import { addNewPost } from '../../../features/posts/postsSliceAdapter';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { selectUsers } from '../../../features/users/usersSlice';
import { unwrapResult } from '@reduxjs/toolkit'

export default function AddPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId) && addRequestStatus === 'idle';

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.currentTarget.value);
  };
  const onSavePostClicked = async () => {
    try {
      setAddRequestStatus('pending')
      const resultAction = await dispatch(
        addNewPost({ title, content, user: userId })
      )
      unwrapResult(resultAction)
      setTitle('')
      setContent('')
    } catch (err) {
      console.error('Failed to save the post: ', err)
    } finally {
      setAddRequestStatus('idle')
    }
  }

  const userOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">文章标题:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          placeholder="What's on your mind?"
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">内容：</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          style={{ marginTop: '10px' }}
          onChange={onContentChanged}
        />
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          {userOptions}
        </select>
        <button type="button" disabled={!canSave} onClick={onSavePostClicked}>
          保存文章
        </button>
      </form>
    </section>
  );
}
