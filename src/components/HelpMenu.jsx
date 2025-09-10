import React, { useState, useRef, useEffect } from 'react';
import './HelpMenu.css';
import MenuItem from './MenuItem';
import './MenuItem.css';
import {
  HelpIcon,
  HelpDropdownIcon,
  MenuHelpIcon,
  QuickTourIcon,
  AboutIcon,
  NotificationsIcon
} from './HelpMenuIcons';

// Данные пунктов меню
const helpMenuItems = [
  { id: 'help', label: 'Online Help', icon: MenuHelpIcon },
  { id: 'quick-tour', label: 'Online Tour', icon: QuickTourIcon },
  { id: 'about', label: 'About', icon: AboutIcon },
  { id: 'notifications', label: 'App Notifications', icon: NotificationsIcon }
];

export default function HelpMenu({ 
  state = "standard",
  onStateChange = null,
  onMenuItemClick = null,
  className = "",
  ...props 
}) {
  const [currentState, setCurrentState] = useState(state);
  const [isOpen, setIsOpen] = useState(state === "active");
  const menuRef = useRef(null);

  useEffect(() => {
    setCurrentState(state);
    setIsOpen(state === "active");
  }, [state]);

  // Обработчик клика вне компонента для закрытия меню
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (currentState === "active") {
          setCurrentState("standard");
          setIsOpen(false);
          onStateChange && onStateChange("standard");
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [currentState, onStateChange]);

  const handleMouseEnter = () => {
    if (currentState === "standard") {
      setCurrentState("hover");
      onStateChange && onStateChange("hover");
    }
  };

  const handleMouseLeave = () => {
    if (currentState === "hover") {
      setCurrentState("standard");
      onStateChange && onStateChange("standard");
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (currentState === "active") {
      setCurrentState("standard");
      setIsOpen(false);
      onStateChange && onStateChange("standard");
    } else {
      setCurrentState("active");
      setIsOpen(true);
      onStateChange && onStateChange("active");
    }
  };

  const handleMenuItemClick = (item) => {
    onMenuItemClick && onMenuItemClick(item);
    
    // Закрываем меню после клика на пункт
    setCurrentState("standard");
    setIsOpen(false);
    onStateChange && onStateChange("standard");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && currentState === "active") {
      setCurrentState("standard");
      setIsOpen(false);
      onStateChange && onStateChange("standard");
    }
  };

  // Формируем CSS классы для состояний
  const containerClasses = [
    'help-menu',
    `help-menu--${currentState}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={menuRef} className="help-menu-wrapper">
      <button 
        className={containerClasses}
        data-name={`state=${currentState}`}
        data-node-id="7451:87246"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label="Help menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        {...props}
      >
        {/* Основная иконка вопроса */}
        <div 
          className="help-menu__main-icon help-menu__icon"
          aria-hidden="true"
        >
          <HelpIcon />
        </div>

        {/* Иконка стрелки */}
        <div 
          className="help-menu__dropdown-icon help-menu__icon"
          aria-hidden="true"
        >
          <HelpDropdownIcon />
        </div>

        {/* Выпадающее меню */}
        {isOpen && (
          <div 
            className="help-menu__dropdown"
            data-node-id="7451:87211"
            role="menu"
            aria-label="Help menu options"
          >
            {helpMenuItems.map((item, index) => (
              <MenuItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                onClick={() => handleMenuItemClick(item)}
                data-node-id={`7451:872${(12 + index).toString().padStart(2, '0')}`}
              />
            ))}
          </div>
        )}
      </button>
    </div>
  );
}