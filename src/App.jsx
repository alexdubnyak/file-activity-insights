import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const handleHeaderSearch = (value) => {
    console.log(`Поиск: ${value}`);
  };

  const handleHeaderProfileClick = (item) => {
    console.log(`ProfileMenu: ${item.label}`);
  };

  const handleHeaderHelpClick = (item) => {
    console.log(`HelpMenu: ${item.label}`);
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
          <Sidebar />
        </div>
        
        {/* Content Area - белая активная область */}
        <div style={{ 
          flex: 1, 
          backgroundColor: '#ffffff',
          overflow: 'hidden',
          margin: 0,
          padding: 0
        }}>
        </div>
      </div>
    </div>
  );
}

export default App;
