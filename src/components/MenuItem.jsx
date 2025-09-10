import React from 'react';
import './MenuItem.css';

export default function MenuItem({ 
  icon: IconComponent, 
  label, 
  badge = null, 
  onClick = null, 
  className = "",
  ...props 
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick && onClick();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <button
      className={`menu-item ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="menuitem"
      tabIndex={0}
      aria-label={label}
      data-name="menu item"
      {...props}
    >
      {/* Контейнер для иконки */}
      <div className="menu-item__icon-container">
        {IconComponent && <IconComponent />}
      </div>

      {/* Текст пункта меню */}
      <span className="menu-item__text">
        {label}
      </span>

      {/* Опциональный бейдж */}
      {badge && (
        <div className="menu-item__badge">
          {badge}
        </div>
      )}
    </button>
  );
}

