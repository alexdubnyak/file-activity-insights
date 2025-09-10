import React from 'react';
import GoogleDriveSvg from '../assets/storage/google-drive.svg?react';
import DropboxSvg from '../assets/storage/dropbox.svg?react';
import KudoSvg from '../assets/storage/kudo.svg?react';

const CloudIconsS = ({
  type = "Kudo",
  state = "standard",
  color = "color",
  className = ""
}) => {
  const normalizedType = String(type).toLowerCase();
  const commonProps = { className, style: { width: 22, height: 22 } };

  if (normalizedType === 'google drive') {
    return <GoogleDriveSvg {...commonProps} />;
  }
  if (normalizedType === 'dropbox') {
    return <DropboxSvg {...commonProps} />;
  }
  return <KudoSvg {...commonProps} />;
};

export default CloudIconsS;
