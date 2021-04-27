import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ScoreDisplay = ({ scoreCount }) => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>Hit: {scoreCount.hit}</ListGroup.Item>
      <ListGroup.Item>Miss: {scoreCount.miss}</ListGroup.Item>
      <ListGroup.Item>Left: {scoreCount.left}</ListGroup.Item>
    </ListGroup>
  );
};

export default ScoreDisplay;
