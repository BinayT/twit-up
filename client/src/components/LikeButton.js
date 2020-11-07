import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import MyPopup from '../util/MyPopup';

const LikeButton = ({ user, likeCount, likes, id }) => {
  const [liked, setLiked] = useState(true);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button
        onClick={likePost}
        color='teal'
        icon='heart'
        label={{
          basic: true,
          color: 'teal',
          pointing: 'left',
          content: `${likeCount}`,
        }}
      />
    ) : (
      <Button
        onClick={likePost}
        color='teal'
        icon='heart'
        label={{
          basic: true,
          color: 'teal',
          pointing: 'left',
          content: `${likeCount}`,
        }}
        basic
      />
    )
  ) : (
    <Button
      color='teal'
      icon='heart'
      label={{
        basic: true,
        color: 'teal',
        pointing: 'left',
        content: `${likeCount}`,
      }}
      basic
      as={Link}
      to='/login'
    />
  );

  return <MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</MyPopup>;
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
