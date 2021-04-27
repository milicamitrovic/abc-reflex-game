import React from 'react';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';

const ChooseDifficulty = (props) => {
  const { radio, gameOn, onClick, value } = props;

  return (
    <>
      <ButtonGroup toggle>
        <ToggleButton
          type="radio"
          variant="secondary"
          name={radio.name}
          value={radio.value}
          checked={value === radio.value}
          onClick={() => onClick()}
          disabled={gameOn}
        >
          {radio.name}
        </ToggleButton>
      </ButtonGroup>
    </>
  );
};

export default ChooseDifficulty;
