import React from 'react';
import './AddStorage.css';

// Иконка плюса из Figma
const AddIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M14.25 9.75H9.75V14.25H8.25V9.75H3.75V8.25H8.25V3.75H9.75V8.25H14.25V9.75Z" 
      fill="currentColor"
    />
  </svg>
);

const AddStorage = ({
  onClick = null,
  disabled = false,
  className = '',
  ...props
}) => {
  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      {...props}
      className={`add-storage ${disabled ? 'add-storage--disabled' : ''} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      type="button"
      aria-label="Add storage"
      title="Add storage"
    >
      <div className="add-storage__base">
        <div className="add-storage__icon">
          <AddIcon />
        </div>
      </div>
    </button>
  );
};

export default AddStorage;
