import React, { useState } from 'react';
import { Button, Confirm } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import { FETCH_POSTS_QUERY } from '../util/graphql';

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        setConfirmOpen(false);
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
        const getPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts },
        });
      }
      if (callback) callback();
    },
    variables: { postId, commentId },
  });

  return (
    <>
      <Button
        color='red'
        icon='delete'
        onClick={() => setConfirmOpen(true)}
        floated='right'
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

export default DeleteButton;
