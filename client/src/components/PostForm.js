import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

import { FETCH_POSTS_QUERY } from '../util/graphql';
import { useForm } from '../util/hooks';

const PostForm = () => {
  const { value, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: value,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      const posts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: posts },
      });
      value.body = '';
    },
    onError(error) {
      return error;
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder='Type Anything...'
          name='body'
          onChange={onChange}
          value={value.body}
        />
        <Button type='submit' color='teal' disabled={value.body ? false : true}>
          Post
        </Button>
      </Form.Field>
    </Form>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
