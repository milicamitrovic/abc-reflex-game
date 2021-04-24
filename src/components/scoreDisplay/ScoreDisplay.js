import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ScoreDisplay = () => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>Hit: </ListGroup.Item>
      <ListGroup.Item>Miss: </ListGroup.Item>
      <ListGroup.Item>Left: </ListGroup.Item>
    </ListGroup>
  );
};

export default ScoreDisplay;
