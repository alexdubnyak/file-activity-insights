import React, { useState } from 'react';
import './SidebarItem.css';

// Импорт SVG иконок как React компонентов
const RecentFilesIcon = ({ className = '', ...props }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path 
      d="M10 4.2C13.2 4.2 15.8 6.8 15.8 10C15.8 13.2 13.2 15.8 10 15.8C6.8 15.8 4.2 13.2 4.2 10C4.2 6.8 6.8 4.2 10 4.2ZM10 3C6.1 3 3 6.1 3 10C3 13.9 6.1 17 10 17C13.9 17 17 13.9 17 10C17 6.1 13.9 3 10 3Z" 
      fill="currentColor"
    />
    <path 
      d="M12 11V10H10V6H9V11H12Z" 
      fill="currentColor"
    />
  </svg>
);

const StorageIcon = ({ className = '', ...props }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path 
      d="M9.3 6C11 6 12.4 6.9 13.1 8.4L13.3 8.9L13.8 9C15.2 9.3 16.7 10 17 13H3C3.2 11.2 4 10.6 5.4 9.9L6 9.6V9C6 7.6 7.4 6 9.3 6ZM9.3 5C6.9 5 5 7 5 9C3 10 2 11 2 14C5 14 15 14 18 14C18 10 16.4 8.5 14 8C13.2 6.1 11.3 5 9.3 5Z" 
      fill="currentColor"
    />
  </svg>
);

// Мапинг иконок
const iconMap = {
  'recent-files': RecentFilesIcon,
  'storage': StorageIcon
};

const SidebarItem = ({
  icon = 'recent-files',
  label = 'Recent Files',
  active = false,
  disabled = false,
  onClick = null,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const IconComponent = iconMap[icon] || RecentFilesIcon;
  
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
      className={`sidebar-item ${active ? 'sidebar-item--active' : ''} ${disabled ? 'sidebar-item--disabled' : ''} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      type="button"
      role="menuitem"
      aria-selected={active}
      aria-label={label}
    >
      <div className="sidebar-item__icon">
        <IconComponent />
      </div>
      <span className="sidebar-item__label">
        {label}
      </span>
    </button>
  );
};

export default SidebarItem;
