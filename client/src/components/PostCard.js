import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Image floated='right' size='mini' src='/photo.png' />
        <Card.Header>
          {username.charAt(0).toUpperCase() + username.slice(1)}
        </Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} likeCount={likeCount} likes={likes} id={id} />
        <MyPopup content='Comment on this post'>
          <Button
            color='blue'
            icon='comments outline'
            label={{
              basic: true,
              color: 'teal',
              pointing: 'left',
              content: `${commentCount}`,
            }}
            basic
            as={Link}
            to={`/posts/${id}`}
          />
        </MyPopup>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
