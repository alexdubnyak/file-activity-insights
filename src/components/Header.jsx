import React from 'react';
import SearchInput from './SearchInput';
import HelpMenu from './HelpMenu';
import ProfileMenu from './ProfileMenu';
import AresLogo from '../assets/header/ares_logo.svg';
import './Header.css';

const Header = ({
  userName = "Alexey Dubnyak",
  userPlan = "Flex Cloud Annual",
  onSearch = null,
  onProfileMenuItemClick = null,
  onHelpMenuItemClick = null
}) => {
  return (
    <header className="header">
      {/* Left Section - Logo + My Files */}
      <div className="header__left">
        <div className="header__logo">
          <img 
            src={AresLogo} 
            alt="ARES Kudo" 
            className="header__logo-image"
          />
        </div>
        <h1 className="header__title">My Files</h1>
      </div>
      
      {/* Right Section - Search + Help + Profile */}
      <div className="header__right">
        {/* Search Input */}
        <div className="header__search">
          <SearchInput
            placeholder="Search my files"
            onSearch={onSearch}
          />
        </div>
        
        {/* Help Menu */}
        <div className="header__help">
          <HelpMenu
            onMenuItemClick={onHelpMenuItemClick}
          />
        </div>
        
        {/* Profile Menu */}
        <div className="header__profile">
          <ProfileMenu
            userName={userName}
            userPlan={userPlan}
            onMenuItemClick={onProfileMenuItemClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;