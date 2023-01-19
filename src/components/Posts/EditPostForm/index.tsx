import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { updatePost, selectPostById } from '../../../features/posts/postsSliceAdapter';

export default function EditPostForm(
  props: RouteComponentProps<{ postId: string }>
) {
  const id = props.match.params.postId;
  console.log(id);
  const post = useAppSelector((state) => {
    return selectPostById(state, id);
  });
  const history = useHistory();
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);
  const dispatch = useAppDispatch();
  return (
    <section>
      <h2>编辑文章</h2>
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
            if (!post) {
              return;
            }
            if (!title) {
              return;
            }
            if (!content) {
              return;
            }
            dispatch(updatePost({ ...post, content: content, title: title }));
            history.push(`/posts/${id}`);
          }}>
          保存文章
        </button>
      </form>
    </section>
  );
}
