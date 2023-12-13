import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function GameInfo() {
  const [infoVisible, setInfoVisible] = useState(false);

  const handleInfoHover = () => {
    setInfoVisible(true);
  };

  const handleInfoLeave = () => {
    setInfoVisible(false);
  };

  return (
    <div
      onMouseEnter={handleInfoHover}
      onMouseLeave={handleInfoLeave}
      className="info-container"
    >
      <FontAwesomeIcon
        icon={faInfoCircle}
        className={`info-icon ${infoVisible ? 'visible' : ''}`}
      />
      {infoVisible && (
        <div className="info-tooltip">
          {<p>
            To place a ship on the battlefield, click on the desired ship, then
            select the starting and ending coordinates. Afterward, click the
            'Place Ship' button. Remember to set only one ship per type. Once
            you finish placing them, click the 'Battle!' button to start the
            game.
          </p>}  
        </div>
      )}
    </div>
  );
}

export default GameInfo;
