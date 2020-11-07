import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Grid,
  Loader,
  Image,
  Card,
  Label,
  Button,
  Icon,
} from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

const SinglePost = (props) => {
  const postId = props.match.params.postId;
  console.log(postId);

  const { user } = useContext(AuthContext);

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;

  if (!getPost) {
    postMarkup = <Loader size='huge'>Loading</Loader>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image src='/photo.png' size='small' float='right' />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
            </Card>
            <hr />
            <Card.Content extra>
              <LikeButton
                user={user}
                id={id}
                likes={likes}
                likeCount={likeCount}
              />
              <Button
                as='div'
                labelPosition='right'
                onClick={() => console.log('comment post')}
              >
                <Button basic color='blue'>
                  <Icon name='comments outline' />
                </Button>
                <Label basic color='blue' pointing='left'>
                  {commentCount}
                </Label>
              </Button>
              {user && user.username === username && (
                <DeleteButton postId={id} callback={deletePostCallback} />
              )}
            </Card.Content>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
