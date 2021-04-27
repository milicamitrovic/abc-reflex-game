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
  HIT,
  MISS,
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
  const [scoreCount, setScoreCount] = useState({
    hit: 0,
    miss: 0,
    left: alphabet.length,
  });
  const [keyIsPressed, setKeyIsPressed] = useState(false);

  const isHitScore = () => {
    setScoreCount((prevScore) => {
      return {
        ...prevScore,
        hit: prevScore.hit + 1,
        left: prevScore.left - 1,
      };
    });
  };

  const isMissScore = () => {
    setScoreCount((prevScore) => {
      return {
        ...prevScore,
        miss: prevScore.miss + 1,
        left: prevScore.left - 1,
      };
    });
  };

  const endGame = () => {
    setGameOn(false);
    setShownNumbers([]);

    clearInterval(timeInterval);
  };

  const startGame = () => {
    setGameOn(true);
    setScoreCount({ hit: 0, miss: 0, left: alphabet.length });
  };

  const setScoreByType = useCallback((shownValue, type) => {
    setLettersToMatch((allLett) => {
      return allLett.map((lett) =>
        lett.value === shownValue
          ? {
              ...lett,
              scoreCount:
                shownNumbers.length === lettersToMatch.length
                  ? lett.type
                  : type,
            }
          : lett
      );
    });
  }, []);

  const defineScoreType = (e) => {
    if (gameOn && !keyIsPressed && shownNumbers.length > 0) {
      const keyValue = lettersToMatch.find(
        (lettr) => lettr.key === e.key.toUpperCase()
      )
        ? lettersToMatch.find((lettr) => lettr.key === e.key.toUpperCase())
            .value
        : null;
      const isMatched = keyValue === shownNumbers[shownNumbers.length - 1];
      if (isMatched) {
        isHitScore();
        setScoreByType(shownNumbers[shownNumbers.length - 1], HIT);
      } else {
        isMissScore();
        setScoreByType(shownNumbers[shownNumbers.length - 1], MISS);
      }
    }
    setKeyIsPressed(true);
  };

  const gameIsOn = () => {
    if (shownNumbers.length === lettersToMatch.length) {
      isMissScore();
      endGame();
      return;
    }

    if (
      !keyIsPressed &&
      shownNumbers.length > 0 &&
      lettersToMatch.find(
        (leftScore) => shownNumbers[shownNumbers.length - 1] === leftScore.value
      ).scoreCount === all
    ) {
      isMissScore();
    }
    setKeyIsPressed(false);

    const shuffleNums = lettersToMatch.map((i) => i.value);
    let shuffleLetter = shuffleNums[Math.floor(Math.random() * 26)];

    while (gameOn && shownNumbers.find((num) => num === shuffleLetter)) {
      shuffleLetter = shuffleNums[Math.floor(Math.random() * 26)];
    }

    setShownNumbers((pr) => [...pr, shuffleLetter]);
  };

  useEffect(() => {
    window.addEventListener('keyup', defineScoreType);
    return () => {
      window.removeEventListener('keyup', defineScoreType);
    };
  }, [defineScoreType]);

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
    <div className="game__display">
      <div className="game__display--difficulty">
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
          onClick={gameOn ? () => endGame() : () => startGame()}
          className={`${gameOn ? 'button--stop' : 'button--start'}`}
        >
          {gameOn ? 'Stop' : 'Start'}
        </Button>
      </div>
      <div className="game__display--displayNumber">Match: {numberDisplay}</div>
      <LettersDisplay />
      <ScoreDisplay scoreCount={scoreCount} />
    </div>
  );
}
export default GameDisplay;
