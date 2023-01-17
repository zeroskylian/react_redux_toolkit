import React from 'react';
import { PostsItem } from '../../features/posts/postsSlice';
import { useAppDispatch } from '../../app/hook';
import { reactionAdded } from '../../features/posts/postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

export default function ReactionButtons(props: { post: PostsItem }) {
  const { post } = props;
  const dispatch = useAppDispatch();
  const onReactionButtonClicked = (reaction: string) => {
    dispatch(reactionAdded({ id: post.id, reaction }));
  };
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() => {
          onReactionButtonClicked(name);
        }}>
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
}
