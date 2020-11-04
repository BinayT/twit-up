import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
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
        />
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
        />
      </Card.Content>
    </Card>
  );
};

export default PostCard;
