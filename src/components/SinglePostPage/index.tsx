import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAppSelector } from '../../app/hook';

export default function SinglePostPage(
  props: RouteComponentProps<{ id: string }>
) {
  const id = props.match.params.id;
  console.log(id);
  const post = useAppSelector((state) =>
    state.posts.find((post) => post.id === id)
  );
  if (!post) {
    return (
      <section>
        <h2>页面未找到！</h2>
      </section>
    );
  }
  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
      </article>
    </section>
  );
}
