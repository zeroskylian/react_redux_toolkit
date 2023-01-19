import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAppSelector } from '../../../app/hook';
import { Link } from 'react-router-dom';
import PostAuthor from '../PostAuthor';
import ReactionButtons from '../ReactionButtons';
import { selectPostById } from '../../../features/posts/postsSliceAdapter';

export default function SinglePostPage(
  props: RouteComponentProps<{ id: string }>
) {
  const id = props.match.params.id;
  const post = useAppSelector((state) => {
    return selectPostById(state, id);
  });
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
        <PostAuthor userId={post.user} />
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post!} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
}
