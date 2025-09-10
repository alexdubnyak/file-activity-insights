import React, { useState, useRef, useEffect } from 'react';
import './ProfileMenu.css';
import MenuItem from './MenuItem';
import './MenuItem.css';
import {
  StorageIcon,
  FilesIcon,
  DrawingsIcon,
  ResourcesIcon,
  ProfileIcon,
  UsersIcon,
  CompanyIcon,
  WebGLIcon,
  LogoutIcon,
  DropdownIcon
} from './MenuIcons';

// Данные пунктов меню
const menuItems = [
  { id: 'storage', label: 'Storage', icon: StorageIcon },
  { id: 'files', label: 'My Files', icon: FilesIcon },
  { id: 'drawings', label: 'Drawings Automation', icon: DrawingsIcon, badge: 'NEW' },
  { id: 'resources', label: 'Resources', icon: ResourcesIcon },
  { id: 'profile', label: 'My Profile', icon: ProfileIcon },
  { id: 'users', label: 'Users', icon: UsersIcon },
  { id: 'company', label: 'My company', icon: CompanyIcon },
  { id: 'webgl', label: 'WebGL Test', icon: WebGLIcon },
  { id: 'logout', label: 'Logout', icon: LogoutIcon }
];

export default function ProfileMenu({ 
  state = "standard",
  userName = "Alexey Dubnyak", 
  userPlan = "Flex Cloud Annual",
  onStateChange = null,
  onMenuItemClick = null 
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
    'profile-menu',
    `profile-menu--${currentState}`
  ].join(' ');

  return (
    <div ref={menuRef} className="profile-menu-wrapper">
      <button 
        className={containerClasses}
        data-name={`state=${currentState}`}
        data-node-id="7447:87103"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={`User menu for ${userName}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Текстовый блок с информацией о пользователе */}
        <div 
          className="profile-menu__user-info"
          data-node-id="7447:87052"
        >
          <p 
            className="profile-menu__user-name" 
            data-node-id="7447:87053"
            title={userName}
          >
            {userName}
          </p>
          <p 
            className="profile-menu__user-plan" 
            data-node-id="7447:87054"
            title={userPlan}
          >
            {userPlan}
          </p>
        </div>

        {/* Иконка стрелки */}
        <div 
          className="profile-menu__icon-container" 
          data-name="icon" 
          data-node-id="7447:87055"
        >
          <div 
            className="profile-menu__dropdown-icon profile-menu__icon" 
            data-name="icon"
            aria-hidden="true"
          >
            <DropdownIcon />
          </div>
        </div>


        {/* Выпадающее меню */}
        {isOpen && (
          <div 
            className="profile-menu__dropdown"
            data-node-id="7447:87105"
            role="menu"
            aria-label="User menu options"
          >
            {menuItems.map((item, index) => (
              <MenuItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                onClick={() => handleMenuItemClick(item)}
                data-node-id={`7447:871${(106 + index).toString().padStart(2, '0')}`}
              />
            ))}
          </div>
        )}
      </button>
    </div>
  );
}