import React, { useState } from 'react';

const LongPressButton = ({ children, onLongPress }) => {
  const [isPressed, setIsPressed] = useState(false);
  let pressTimer;

  const handleMouseDown = () => {
    pressTimer = setTimeout(() => {
      // Long-press detected
    //   alert('Long-press event triggered');
      onLongPress();
    }, 1000); // Adjust the duration as needed
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer);
    setIsPressed(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default LongPressButton;
