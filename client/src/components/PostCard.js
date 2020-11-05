import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);
  console.log(likes);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} likeCount={likeCount} likes={likes} id={id} />
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
        {user && user.username === username && (
          <Button
            color='red'
            icon='delete'
            onClick={() => console.log('deletePost')}
            floated='right'
          />
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
