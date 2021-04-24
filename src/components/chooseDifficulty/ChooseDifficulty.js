import React, { useState } from 'react';
import { ToggleButton, ButtonGroup, Button } from 'react-bootstrap';

function ChooseDifficulty() {
  const [checked, setChecked] = useState(false);
  const [gameOn, setGameOn] = useState(false);

  const radios = [
    { name: 'Active', value: '1' },
    { name: 'Radio', value: '2' },
    { name: 'Radio', value: '3' },
  ];

  return (
    <>
      <ButtonGroup toggle>
        {radios.map((radio, id) => (
          <ToggleButton
            key={id}
            type="radio"
            variant="secondary"
            name={radio.name}
            value={radio.value}
            checked={checked}
            onChange={(e) => setChecked(e.currentTarget.checked)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <div>
        <Button
          variant="primary"
          onClick={gameOn ? () => setGameOn(false) : () => setGameOn(true)}
        >
          {gameOn ? 'Stop' : 'Start'}
        </Button>
      </div>
    </>
  );
}

export default ChooseDifficulty;
