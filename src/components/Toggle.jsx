import React, { useState } from 'react';
import './Toggle.css';

const Toggle = ({
  initialState = false,
  onToggle = null,
  disabled = false,
  size = 'medium', // 'small', 'medium', 'large'
  label = null,
  className = '',
  ...props
}) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleClick = () => {
    if (disabled) return;
    
    const newState = !isOn;
    setIsOn(newState);
    
    if (onToggle) {
      onToggle(newState);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className={`toggle-container ${className}`}>
      {label && (
        <label className="toggle-label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <button
        {...props}
        className={`toggle-button toggle-button--${size} ${isOn ? 'toggle-button--on' : 'toggle-button--off'} ${disabled ? 'toggle-button--disabled' : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label={label || `Toggle switch ${isOn ? 'on' : 'off'}`}
      >
        <span className="toggle-slider" />
        <span className="toggle-track" />
      </button>
    </div>
  );
};

export default Toggle;
