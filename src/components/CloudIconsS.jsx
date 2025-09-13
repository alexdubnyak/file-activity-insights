import React from 'react';
// Импорт иконок из assets/storage как URL
import GoogleDriveActiveIcon from '../assets/storage/google-active.svg';
import GoogleDriveInactiveIcon from '../assets/storage/google-unactive.svg';
import DropboxActiveIcon from '../assets/storage/dropbox-active.svg';
import DropboxInactiveIcon from '../assets/storage/dropbox-unactive.svg';
import AresActiveIcon from '../assets/storage/ares-active.svg';
import AresInactiveIcon from '../assets/storage/ares-unactive.svg';

const CloudIconsS = ({
  type = "kudo",
  state = "standard",
  className = ""
}) => {
  const normalizedType = String(type).toLowerCase();
  const isActive = state === "active";
  
  let iconSrc;
  let altText;

  if (normalizedType === 'google drive') {
    iconSrc = isActive ? GoogleDriveActiveIcon : GoogleDriveInactiveIcon;
    altText = `Google Drive ${isActive ? 'active' : 'inactive'}`;
  } else if (normalizedType === 'dropbox') {
    iconSrc = isActive ? DropboxActiveIcon : DropboxInactiveIcon;
    altText = `Dropbox ${isActive ? 'active' : 'inactive'}`;
  } else {
    // Kudo/ARES по умолчанию
    iconSrc = isActive ? AresActiveIcon : AresInactiveIcon;
    altText = `ARES Kudo ${isActive ? 'active' : 'inactive'}`;
  }

  return (
    <img 
      src={iconSrc}
      alt={altText}
      className={className}
      style={{ width: 22, height: 22 }}
    />
  );
};

export default CloudIconsS;
