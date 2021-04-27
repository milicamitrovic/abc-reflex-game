import React from 'react';
import { ALPHABET_DATA } from '../../constants/abcData';
import { Card } from 'react-bootstrap';

const LettersDisplay = ({ lettersToMatch }) => {
  return (
    <div className="alphabet__card">
      {lettersToMatch.map(
        (letter) => (
          <Card
            key={letter.key}
            bg="light"
            className={`${letter.scoreCount} alphabet__card--item mb-2`}
          >
            <Card.Text className="alphabet__card--value">
              {letter.key}({letter.value})
            </Card.Text>
          </Card>
        )
        // console.log('iiiiiiiii', letter)
      )}
    </div>
  );
};

export default LettersDisplay;
