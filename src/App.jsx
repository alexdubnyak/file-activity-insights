import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RecentFilesList from './components/RecentFilesList';
import ToolBarRow from './components/ToolBarRow';
import Breadcrumbs from './components/Breadcrumbs';
import FileBrowser from './components/FileBrowser';
import FileDetails from './components/FileDetails';
import './App.css';

function App() {
  const [recentFilesEnabled, setRecentFilesEnabled] = useState(true);
  const [selectedFile, setSelectedFile] = useState({ id: 1, type: 'file', name: 'Playground.dwg', access: 'shared', modified: '2 years ago', owner: 'me', size: '3 MB' });
  const [fileDetailsVisible, setFileDetailsVisible] = useState(true);
  const [fileDetailsTab, setFileDetailsTab] = useState('properties');

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

  const handleFileClick = (file) => {
    console.log('File clicked:', file);
    setSelectedFile(file);
    setFileDetailsVisible(true);
    setFileDetailsTab('properties');
  };

  const handleFolderClick = (folder) => {
    console.log('Folder clicked:', folder);
  };

  const handleFileShare = (file) => {
    console.log('Share file:', file);
    // Здесь можно добавить логику для открытия модала или копирования ссылки
    alert(`Поделиться файлом: ${file.name}`);
  };

  const handleFileLink = (file) => {
    console.log('Get link for file:', file);
    // Здесь можно добавить логику для получения публичной ссылки
    alert(`Получить ссылку для файла: ${file.name}`);
  };

  // Обработчики контекстного меню
  const handleFileRename = (file) => {
    console.log('Rename file:', file);
    const newName = prompt(`Переименовать файл "${file.name}":`, file.name);
    if (newName && newName !== file.name) {
      alert(`Файл переименован в: ${newName}`);
      // Здесь можно добавить логику переименования
    }
  };

  const handleFileClone = (file) => {
    console.log('Clone file:', file);
    alert(`Клонировать файл: ${file.name}`);
    // Здесь можно добавить логику клонирования
  };

  const handleFileDownload = (file) => {
    console.log('Download file:', file);
    alert(`Скачать файл: ${file.name}`);
    // Здесь можно добавить логику скачивания
  };

  const handleFileMove = (file) => {
    console.log('Move file:', file);
    alert(`Переместить файл: ${file.name}`);
    // Здесь можно добавить логику перемещения
  };

  const handleFileDelete = (file) => {
    console.log('Delete file:', file);
    const confirmed = confirm(`Удалить файл "${file.name}"?`);
    if (confirmed) {
      alert(`Файл удален: ${file.name}`);
      // Здесь можно добавить логику удаления
    }
  };

  const handleFilePermissions = (file) => {
    console.log('handleFilePermissions called with file:', file);
    console.log('Setting fileDetailsTab to insights');
    setSelectedFile(file);
    setFileDetailsVisible(true);
    setFileDetailsTab('insights');
    console.log('State updates called');
  };

  const handleCloseFileDetails = () => {
    setFileDetailsVisible(false);
    setSelectedFile(null);
    setFileDetailsTab('properties');
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
          overflow: 'hidden',
          margin: 0,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Recent Files - только этот блок скрывается тогглом с анимацией */}
          <div
            className={`recent-files-wrapper ${recentFilesEnabled ? 'recent-files-wrapper--visible' : 'recent-files-wrapper--hidden'}`}
            style={{ flexShrink: 0 }}
          >
            <RecentFilesList />
          </div>

          {/* ToolBar Row - всегда виден */}
          <div style={{ flexShrink: 0 }}>
            <ToolBarRow
              onUploadDrawing={handleUploadDrawing}
              onCreateFile={handleCreateFile}
              onCreateFolder={handleCreateFolder}
              onRecycleBin={handleRecycleBin}
              onFilterChange={handleFileFilterChange}
              style={{ marginTop: '0px' }}
            />
          </div>

          {/* Breadcrumbs - всегда виден */}
          <div style={{ flexShrink: 0 }}>
            <Breadcrumbs
              onItemClick={handleBreadcrumbClick}
            />
          </div>

          {/* FileBrowser Container - flex layout */}
          <div style={{ 
            display: 'flex', 
            marginTop: '20px',
            gap: '0',
            flex: 1,
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}>
            {/* FileBrowser - сужается при открытии панели */}
            <div style={{
              flex: fileDetailsVisible ? '1' : '1',
              width: fileDetailsVisible ? 'calc(100% - 289px)' : '100%',
              transition: 'width 0.3s ease',
              height: '100%'
            }}>
              <FileBrowser
                selectedFileId={selectedFile?.id}
                onFileClick={handleFileClick}
                onFolderClick={handleFolderClick}
                onFileShare={handleFileShare}
                onFileLink={handleFileLink}
                onFileRename={handleFileRename}
                onFileClone={handleFileClone}
                onFileDownload={handleFileDownload}
                onFileMove={handleFileMove}
                onFileDelete={handleFileDelete}
                onFilePermissions={handleFilePermissions}
              />
            </div>
            
            {/* File Details Panel - появляется справа */}
            {fileDetailsVisible && (
              <FileDetails
                file={selectedFile}
                isVisible={fileDetailsVisible}
                onClose={handleCloseFileDetails}
                initialTab={fileDetailsTab}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
