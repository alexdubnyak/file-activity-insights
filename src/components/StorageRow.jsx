import React from 'react';
import AddStorage from './AddStorage';
import './StorageRow.css';

// Иконка storage из assets/side-bar
const StorageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M9.3 6C11 6 12.4 6.9 13.1 8.4L13.3 8.9L13.8 9C15.2 9.3 16.7 10 17 13H3C3.2 11.2 4 10.6 5.4 9.9L6 9.6V9C6 7.6 7.4 6 9.3 6ZM9.3 5C6.9 5 5 7 5 9C3 10 2 11 2 14C5 14 15 14 18 14C18 10 16.4 8.5 14 8C13.2 6.1 11.3 5 9.3 5Z" 
      fill="currentColor"
    />
  </svg>
);

const StorageRow = ({
  label = "Storage",
  onAddClick = null,
  className = '',
  ...props
}) => {
  const handleAddClick = () => {
    if (onAddClick) {
      onAddClick();
    }
  };

  return (
    <div 
      className={`storage-row ${className}`}
      {...props}
    >
      <div className="storage-row__content">
        <div className="storage-row__icon">
          <StorageIcon />
        </div>
        <span className="storage-row__label">
          {label}
        </span>
      </div>
      
      <div className="storage-row__add-button">
        <AddStorage onClick={handleAddClick} />
      </div>
    </div>
  );
};

export default StorageRow;
