import React from 'react';
import { ALPHABET_DATA } from '../../constants/abcData';
import { Card } from 'react-bootstrap';

const LettersDisplay = () => {
  return (
    <>
      {ALPHABET_DATA.map((letter) => (
        <Card
          key={letter.key}
          bg="light"
          className="mb-2"
          style={{ width: '18rem' }}
        >
          <Card.Text>
            {letter.key}({letter.value})
          </Card.Text>
        </Card>
      ))}
    </>
  );
};

export default LettersDisplay;
