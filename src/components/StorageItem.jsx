import React, { useState } from 'react';
import './StorageItem.css';

const StorageItem = ({
  state = "standard", // standard | hover | active
  label = "Alexey Dubnyak",
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Определяем эффективное состояние: если активное - используем его, иначе проверяем hover
  const effectiveState = state === 'active' ? 'active' : (isHovered ? 'hover' : 'standard');
  
  return (
    <button
      className={`storage-item storage-item--${effectiveState}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      type="button"
      aria-label={`Выбрать аккаунт: ${label}`}
    >
      <span className="storage-item__text">
        {label}
      </span>
    </button>
  );
};

export default StorageItem;
