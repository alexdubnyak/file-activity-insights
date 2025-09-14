import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RecentFilesList from './components/RecentFilesList';
import ToolBarRow from './components/ToolBarRow';
import Breadcrumbs from './components/Breadcrumbs';
import './App.css';

function App() {
  const [recentFilesEnabled, setRecentFilesEnabled] = useState(true);

  const handleHeaderSearch = (value) => {
    console.log(`Поиск: ${value}`);
  };

  const handleHeaderProfileClick = (item) => {
    console.log(`ProfileMenu: ${item.label}`);
  };

  const handleHeaderHelpClick = (item) => {
    console.log(`HelpMenu: ${item.label}`);
  };

  const handleRecentFilesToggle = (enabled) => {
    setRecentFilesEnabled(enabled);
    console.log(`Recent Files: ${enabled ? 'включен' : 'выключен'}`);
  };

  const handleFileFilterChange = (filter) => {
    console.log(`File Filter changed to: ${filter}`);
  };

  const handleUploadDrawing = () => {
    console.log('Upload Drawing action');
  };

  const handleCreateFile = () => {
    console.log('Create File action');
  };

  const handleCreateFolder = () => {
    console.log('Create Folder action');
  };

  const handleRecycleBin = () => {
    console.log('Recycle Bin action');
  };

  const handleBreadcrumbClick = (item, index) => {
    console.log('Breadcrumb clicked:', item, 'at index:', index);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      backgroundColor: '#111827',
      overflow: 'hidden'
    }}>
      {/* Header - полная ширина экрана */}
      <Header
        userName="Alexey Dubnyak"
        userPlan="Flex Cloud Annual"
        onSearch={handleHeaderSearch}
        onProfileMenuItemClick={handleHeaderProfileClick}
        onHelpMenuItemClick={handleHeaderHelpClick}
      />

      {/* Main Layout - Sidebar + Content без отступов */}
      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        margin: 0,
        padding: 0
      }}>
        {/* Sidebar - приклеен к левой части */}
        <div style={{
          width: '182px',
          flexShrink: 0,
          margin: 0,
          padding: 0
        }}>
          <Sidebar
            recentFilesEnabled={recentFilesEnabled}
            onRecentFilesToggle={handleRecentFilesToggle}
          />
        </div>

        {/* Content Area - белая активная область */}
        <div style={{
          flex: 1,
          backgroundColor: '#ffffff',
          overflow: 'auto',
          margin: 0,
          padding: '20px'
        }}>
          {recentFilesEnabled && <RecentFilesList />}

          {/* ToolBar Row - под блоком Recent files */}
          {recentFilesEnabled && (
            <ToolBarRow
              onUploadDrawing={handleUploadDrawing}
              onCreateFile={handleCreateFile}
              onCreateFolder={handleCreateFolder}
              onRecycleBin={handleRecycleBin}
              onFilterChange={handleFileFilterChange}
              style={{ marginTop: '20px' }}
            />
          )}

          {/* Breadcrumbs - под ToolBarRow */}
          {recentFilesEnabled && (
            <Breadcrumbs
              onItemClick={handleBreadcrumbClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
