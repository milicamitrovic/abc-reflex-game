import React, { useState, useEffect, useCallback } from 'react';
import ChooseDifficulty from '../chooseDifficulty/ChooseDifficulty';
import LettersDisplay from '../lettersDisplay/LettersDisplay';
import ScoreDisplay from '../scoreDisplay/ScoreDisplay';
import {
  ALPHABET_DATA as alphabet,
  EASY,
  MEDIUM,
  HARD,
  ALL as all,
} from '../../constants/abcData';
import { Button } from 'react-bootstrap';

function GameDisplay() {
  const [gameOn, setGameOn] = useState(false);
  const [shownNumbers, setShownNumbers] = useState([]);
  const [lettersToMatch, setLettersToMatch] = useState(
    alphabet.map((letter) => ({
      ...letter,
      scoreCount: all,
    }))
  );

  const [valueForSpeed, setValueForSpeed] = useState('1');
  const [timeInterval, setTimeInterval] = useState(1);

  const endGame = useCallback(() => {
    setGameOn(false);
    setShownNumbers([]);

    clearInterval(timeInterval);
  }, [timeInterval]);

  const gameIsOn = () => {
    const shuffleNums = lettersToMatch.map((i) => i.value);
    let shuffleLetter = shuffleNums[Math.floor(Math.random() * 26)];

    while (shownNumbers.find((num) => num === shuffleLetter)) {
      shuffleLetter = shuffleNums[Math.floor(Math.random() * 26)];
    }

    setShownNumbers((pr) => [...pr, shuffleLetter]);
  };

  useEffect(() => {
    setTimeInterval(valueForSpeed * 1000);
    let definedDifficultySpeed;
    if (gameOn) {
      definedDifficultySpeed = setInterval(() => {
        gameIsOn();
      }, timeInterval);
    }
    return () => clearInterval(definedDifficultySpeed);
  }, [gameOn, shownNumbers, lettersToMatch, timeInterval, valueForSpeed]);

  const radios = [
    { name: EASY, value: '5' },
    { name: MEDIUM, value: '3.5' },
    { name: HARD, value: '2' },
  ];
  const numberDisplay = shownNumbers[shownNumbers.length - 1];
  return (
    <div>
      {radios.map((radio) => (
        <ChooseDifficulty
          gameOn={gameOn}
          key={radio.value}
          radio={radio}
          value={valueForSpeed}
          onClick={() => setValueForSpeed(radio.value)}
        />
      ))}
      <Button
        variant="primary"
        onClick={gameOn ? () => endGame() : () => setGameOn(true)}
      >
        {gameOn ? 'Stop' : 'Start'}
      </Button>
      <div>{numberDisplay}</div>
      <LettersDisplay />
      <ScoreDisplay />
    </div>
  );
}
export default GameDisplay;
