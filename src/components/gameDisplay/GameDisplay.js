import React from 'react';
import ChooseDifficulty from '../chooseDifficulty/ChooseDifficulty';
import LettersDisplay from '../lettersDisplay/LettersDisplay';
import ScoreDisplay from '../scoreDisplay/ScoreDisplay';

function GameDisplay() {
  return (
    <div>
      <ChooseDifficulty />
      <LettersDisplay />
      <ScoreDisplay />
    </div>
  );
}
export default GameDisplay;
