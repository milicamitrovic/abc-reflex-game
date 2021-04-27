import React from 'react';
import { ALPHABET_DATA } from '../../constants/abcData';
import { Card } from 'react-bootstrap';

const LettersDisplay = () => {
  return (
    <div className="alphabet__card">
      {ALPHABET_DATA.map((letter) => (
        <Card
          key={letter.key}
          bg="light"
          className={`${letter.scoreCount} alphabet__card--item mb-2`}
        >
          <Card.Text className="alphabet__card--value">
            {letter.key}({letter.value})
          </Card.Text>
        </Card>
      ))}
    </div>
  );
};

export default LettersDisplay;
