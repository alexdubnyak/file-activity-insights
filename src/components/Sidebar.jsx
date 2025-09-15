import React, { useState } from 'react';
import RecentFiles from './RecentFiles';
import StorageRow from './StorageRow';
import Storage from './Storage';
import Tooltip from './Tooltip';
import './Sidebar.css';

const Sidebar = ({ recentFilesEnabled = true, onRecentFilesToggle }) => {
  const [activeStorage, setActiveStorage] = useState('kudo'); // ARES Kudo Drive активен по умолчанию

  const handleAddStorageClick = () => {
    console.log('Добавление нового хранилища');
  };

  const handleStorageClick = (type) => {
    // Если кликнули на уже активный - деактивируем, иначе делаем активным только его
    setActiveStorage(prev => prev === type ? null : type);
    console.log(`Storage ${type}: ${activeStorage === type ? 'деактивирован' : 'активирован'}`);
  };

  // Функция для получения состояния storage
  const getStorageState = (type) => {
    return activeStorage === type ? 'active' : 'standard';
  };

  return (
    <div className="sidebar">
      {/* Main Content */}
      <div className="sidebar__main">
        {/* Recent Files */}
        <RecentFiles
          enabled={recentFilesEnabled}
          onToggle={onRecentFilesToggle}
        />

        {/* Storage Row */}
        <StorageRow
          label="Storage"
          onAddClick={handleAddStorageClick}
        />

        {/* Storage Items */}
        <Tooltip content="ARES Kudo Drive - Cloud Storage" position="right">
          <Storage
            state={getStorageState('kudo')}
            type="kudo"
            onItemClick={() => handleStorageClick('kudo')}
          />
        </Tooltip>

        <Tooltip content="Google Drive - Cloud Storage" position="right">
          <Storage
            state={getStorageState('googleDrive')}
            type="google drive"
            onItemClick={() => handleStorageClick('googleDrive')}
          />
        </Tooltip>

        <Tooltip content="Dropbox - Cloud Storage" position="right">
          <Storage
            state={getStorageState('dropbox')}
            type="dropbox"
            onItemClick={() => handleStorageClick('dropbox')}
          />
        </Tooltip>
      </div>

      {/* Footer */}
      <div className="sidebar__footer">
        <div className="sidebar__footer-text">
          <p>© Graebert GmbH</p>
          <p>
            <a href="https://kudo.graebert.com/terms" className="sidebar__footer-link">
              Terms of Use
            </a>
            <br />
            <a href="https://customer-portal.graebert.com/about/privacypolicy" className="sidebar__footer-link">
              Privacy policy
            </a>
          </p>
          <p className="sidebar__footer-version">v. 1.203.37.4fd0f82.6233328.Ock</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;