import React, { useState } from 'react';
import ProfileMenu from './components/ProfileMenu';
import HelpMenu from './components/HelpMenu';
import SearchInput from './components/SearchInput';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Storage from './components/Storage';
import StorageItem from './components/StorageItem';
import './App.css';

function App() {
  const [profileMenuState, setProfileMenuState] = useState("standard");
  const [helpMenuState, setHelpMenuState] = useState("standard");
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedHelpItem, setSelectedHelpItem] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  const handleProfileStateChange = (newState) => {
    setProfileMenuState(newState);
    addToLog(`ProfileMenu состояние: ${newState}`);
  };

  const handleProfileMenuItemClick = (item) => {
    setSelectedMenuItem(item);
    addToLog(`ProfileMenu выбран: ${item.label}`);
  };

  const handleHelpStateChange = (newState) => {
    setHelpMenuState(newState);
    addToLog(`HelpMenu состояние: ${newState}`);
  };

  const handleHelpMenuItemClick = (item) => {
    setSelectedHelpItem(item);
    addToLog(`HelpMenu выбран: ${item.label}`);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    addToLog(`Поиск изменен: "${value}"`);
  };

  const handleSearch = (value) => {
    if (value.trim()) {
      const mockResults = [
        `Результат 1 для "${value}"`,
        `Результат 2 для "${value}"`,
        `Документ "${value}.pdf"`
      ];
      setSearchResults(mockResults);
      addToLog(`Выполнен поиск: "${value}"`);
    }
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setSearchResults([]);
    addToLog(`Поиск очищен`);
  };

  const handleHeaderSearch = (value) => {
    if (value.trim()) {
      const mockResults = [
        `Header результат 1 для "${value}"`,
        `Header результат 2 для "${value}"`,
        `Header документ "${value}.pdf"`
      ];
      setSearchResults(mockResults);
      addToLog(`Header поиск: "${value}"`);
    }
  };

  const handleHeaderProfileClick = (item) => {
    addToLog(`Header ProfileMenu: ${item.label}`);
  };

  const handleHeaderHelpClick = (item) => {
    addToLog(`Header HelpMenu: ${item.label}`);
  };

  const addToLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setActivityLog(prev => [...prev.slice(-4), { time: timestamp, message }]);
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="title">
          Демонстрация компонентов: Header, ProfileMenu, HelpMenu, SearchInput и Storage
        </h1>

        {/* Демонстрация Header */}
        <div className="demo-section">
          <h2 className="section-title">
            Header компонент
          </h2>
          <p className="description">
            Полноценный хедер, объединяющий все созданные компоненты (1446×50px)
          </p>
          <p className="small-text">
            Включает логотип, "My Files", SearchInput, HelpMenu и ProfileMenu
          </p>

          <div style={{
            width: '100%',
            maxWidth: '1446px',
            margin: '1rem 0',
            border: '1px solid #333',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <Header
              userName="Alexey Dubnyak"
              userPlan="Flex Cloud Annual"
              onSearch={handleHeaderSearch}
              onProfileMenuItemClick={handleHeaderProfileClick}
              onHelpMenuItemClick={handleHeaderHelpClick}
            />
          </div>

          {/* Показать результаты поиска из Header */}
          {searchResults.length > 0 && (
            <div style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: '#1f2937', borderRadius: '0.25rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Результаты поиска из Header:</p>
              {searchResults.map((result, index) => (
                <div key={index} style={{ fontSize: '0.8rem', color: '#d1d5db', marginBottom: '0.25rem' }}>
                  • {result}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Демонстрация Sidebar */}
        <div className="demo-section">
          <h2 className="section-title">Sidebar компонент</h2>
          <p className="description">Левая панель как в Figma (182×733px)</p>
          <div style={{
            display: 'flex',
            gap: '24px'
          }}>
            <Sidebar
              storageItems={[
                { icon: <span className="dot" />, title: 'ARES Kudo Drive', subtitle: 'Alexey Dubnyak', progress: true, active: false },
                { icon: <span className="dot" />, title: 'Google Drive', subtitle: 'alexey.dubnyak@graebert....', active: false },
                { icon: <span className="dot" />, title: 'Dropbox', subtitle: 'dubnyak404@gmail.com', active: false },
              ]}
              footer={(
      <div>
                  <div>© Graebert GmbH</div>
                  <div><u>Terms of Use</u></div>
                  <div><u>Privacy policy</u></div>
                  <div style={{ color: '#646464' }}>v. 1.203.37.4fd0f82.6233328.Ock</div>
                </div>
              )}
            />
          </div>
        </div>

        {/* Демонстрация Storage компонентов */}
        <div className="demo-section">
          <h2 className="section-title">
            Storage компоненты
          </h2>
          <p className="description">
            Компоненты для отображения облачных хранилищ (Figma компоненты)
          </p>

          <div className="demo-grid">
            {/* Интерактивный (uncontrolled) */}
            <div className="demo-card">
              <h3 className="card-title">Интерактивный (клик = toggle)</h3>
              <p className="description">Клик по хедеру или элементу переключает standard/active</p>
              <div className="flex-center">
                <Storage
                  type="kudo"
                  onItemClick={() => addToLog('Storage toggle клик')}
                />
              </div>
            </div>
            {/* Kudo Drive */}
            <div className="demo-card">
              <h3 className="card-title">Kudo Drive - Standard</h3>
              <p className="description">
                Обычное состояние с прогресс-баром
              </p>
              <div className="flex-center">
                <Storage
                  state="standard"
                  type="kudo"
                  onItemClick={() => addToLog('Kudo Drive клик')}
                />
              </div>
            </div>

            <div className="demo-card">
              <h3 className="card-title">Kudo Drive - Active</h3>
              <p className="description">
                Активное состояние с белым фоном
              </p>
              <div className="flex-center">
                <Storage
                  state="active"
                  type="kudo"
                  onItemClick={() => addToLog('Kudo Drive active клик')}
                />
              </div>
            </div>

            {/* Google Drive */}
            <div className="demo-card">
              <h3 className="card-title">Google Drive - Standard</h3>
              <p className="description">
                Стандартное состояние с Google Drive иконкой
              </p>
              <div className="flex-center">
                <Storage
                  state="standard"
                  type="google drive"
                  onItemClick={() => addToLog('Google Drive клик')}
                />
              </div>
            </div>

            <div className="demo-card">
              <h3 className="card-title">Google Drive - Active</h3>
              <p className="description">
                Активное состояние с белым фоном
              </p>
              <div className="flex-center">
                <Storage
                  state="active"
                  type="google drive"
                  onItemClick={() => addToLog('Google Drive active клик')}
                />
              </div>
            </div>

            {/* Dropbox */}
            <div className="demo-card">
              <h3 className="card-title">Dropbox - Standard</h3>
              <p className="description">
                Стандартное состояние с Dropbox иконкой
              </p>
              <div className="flex-center">
                <Storage
                  state="standard"
                  type="dropbox"
                  onItemClick={() => addToLog('Dropbox клик')}
                />
              </div>
            </div>

            <div className="demo-card">
              <h3 className="card-title">Dropbox - Active</h3>
              <p className="description">
                Активное состояние с белым фоном
              </p>
              <div className="flex-center">
                <Storage
                  state="active"
                  type="dropbox"
                  onItemClick={() => addToLog('Dropbox active клик')}
                />
              </div>
            </div>
          </div>

          {/* StorageItem демонстрация */}
          <div style={{ marginTop: '2rem' }}>
            <h3 className="section-title">StorageItem состояния</h3>
            <p className="description">
              Элементы хранения с состояниями standard и hover
            </p>

            <div className="demo-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="demo-card">
                <h3 className="card-title">Standard</h3>
                <p className="description">
                  Обычное состояние с серым текстом
                </p>
                <div className="flex-center">
                  <StorageItem
                    state="standard"
                    label="alexey.dubnyak@graebert.com"
                    onClick={() => addToLog('StorageItem standard клик')}
                  />
                </div>
              </div>

              <div className="demo-card">
                <h3 className="card-title">Hover</h3>
                <p className="description">
                  Состояние при наведении с синим фоном
                </p>
                <div className="flex-center">
                  <StorageItem
                    state="hover"
                    label="dubnyak404@gmail.com"
                    onClick={() => addToLog('StorageItem hover клик')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Интерактивная демонстрация */}
        <div className="demo-section">
          <h2 className="section-title">
            Отдельные компоненты
          </h2>
          
          <div className="demo-grid">
            {/* ProfileMenu демо */}
            <div className="demo-card">
              <h3 className="card-title">ProfileMenu</h3>
              <p className="description">
                Состояние: <span className="current-state">{profileMenuState}</span>
              </p>
              {selectedMenuItem && (
                <p className="description">
                  Выбран: <span className="current-state">{selectedMenuItem.label}</span>
                </p>
              )}
              
              <div className="flex-center">
                <ProfileMenu 
                  onStateChange={handleProfileStateChange}
                  onMenuItemClick={handleProfileMenuItemClick}
                  userName="Alexey Dubnyak"
                  userPlan="Flex Cloud Annual"
                />
              </div>
            </div>

            {/* HelpMenu демо */}
            <div className="demo-card">
              <h3 className="card-title">HelpMenu</h3>
              <p className="description">
                Состояние: <span className="current-state">{helpMenuState}</span>
              </p>
              {selectedHelpItem && (
                <p className="description">
                  Выбран: <span className="current-state">{selectedHelpItem.label}</span>
                </p>
              )}
              
              <div className="flex-center">
                <HelpMenu 
                  onStateChange={handleHelpStateChange}
                  onMenuItemClick={handleHelpMenuItemClick}
                />
              </div>
            </div>

            {/* SearchInput демо */}
            <div className="demo-card">
              <h3 className="card-title">SearchInput</h3>
              <p className="description">
                Значение: <span className="current-state">"{searchValue}"</span>
              </p>
              {searchResults.length > 0 && (
                <div className="description">
                  <p>Найдено результатов: <span className="current-state">{searchResults.length}</span></p>
                </div>
              )}
              
              <div className="flex-center">
                <SearchInput 
                  value={searchValue}
                  onChange={handleSearchChange}
                  onSearch={handleSearch}
                  onClear={handleClearSearch}
                  placeholder="Search my files"
                />
              </div>

              {/* Результаты поиска */}
              {searchResults.length > 0 && (
                <div style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: '#1f2937', borderRadius: '0.25rem' }}>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Результаты поиска:</p>
                  {searchResults.map((result, index) => (
                    <div key={index} style={{ fontSize: '0.8rem', color: '#d1d5db', marginBottom: '0.25rem' }}>
                      • {result}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Лог активности */}
          {activityLog.length > 0 && (
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#1f2937', borderRadius: '0.5rem' }}>
              <h3 className="card-title">Лог активности:</h3>
              <div style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
                {activityLog.map((log, index) => (
                  <div key={index} style={{ marginBottom: '0.25rem' }}>
                    <span style={{ color: '#9ca3af' }}>[{log.time}]</span> {log.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Демонстрация состояний HelpMenu */}
        <div className="demo-section">
          <h2 className="section-title">
            Состояния HelpMenu
          </h2>
          
          <div className="demo-grid">
            {/* Standard состояние */}
            <div className="demo-card">
              <h3 className="card-title">Standard</h3>
              <p className="description">
                Обычное состояние компонента
              </p>
              <div className="flex-center">
                <HelpMenu state="standard" />
              </div>
            </div>

            {/* Hover состояние */}
            <div className="demo-card">
              <h3 className="card-title">Hover</h3>
              <p className="description">
                Состояние при наведении с темным фоном
              </p>
              <div className="flex-center">
                <HelpMenu state="hover" />
              </div>
            </div>

            {/* Active состояние */}
            <div className="demo-card">
              <h3 className="card-title">Active</h3>
              <p className="description">
                Активное состояние с открытым меню
              </p>
              <div className="flex-center">
                <HelpMenu 
                  state="active" 
                  onMenuItemClick={(item) => alert(`Выбран: ${item.label}`)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Демонстрация SearchInput */}
        <div className="demo-section">
          <h2 className="section-title">
            Демонстрация SearchInput
          </h2>
          
          <div className="demo-grid">
            {/* Обычное состояние */}
            <div className="demo-card">
              <h3 className="card-title">Обычное состояние</h3>
              <p className="description">
                Поле поиска с плейсхолдером
              </p>
              <div className="flex-center">
                <SearchInput placeholder="Search my files" />
              </div>
            </div>

            {/* С текстом */}
            <div className="demo-card">
              <h3 className="card-title">С введенным текстом</h3>
              <p className="description">
                Поле с предварительно заполненным значением
              </p>
              <div className="flex-center">
                <SearchInput 
                  value="My document"
                  placeholder="Search my files"
                />
              </div>
            </div>

            {/* Отключенное состояние */}
            <div className="demo-card">
              <h3 className="card-title">Отключенное</h3>
              <p className="description">
                Неактивное поле поиска
              </p>
              <div className="flex-center">
                <SearchInput 
                  placeholder="Search my files"
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Пункты HelpMenu */}
        <div className="demo-section">
          <h2 className="section-title">
            Пункты HelpMenu
          </h2>
          <p className="description">
            Выпадающее меню содержит следующие пункты:
          </p>
          <div className="info-text">
            <ul className="info-list">
              <li>Online Help - онлайн справочная информация</li>
              <li>Online Tour - интерактивный тур по приложению</li>
              <li>About - информация о приложении</li>
              <li>App Notifications - настройки уведомлений</li>
            </ul>
          </div>
        </div>

        {/* Сравнение компонентов */}
        <div className="demo-section">
          <h2 className="section-title">
            Сравнение компонентов
          </h2>
          
          <div className="demo-grid">
            <div className="demo-card">
              <h3 className="card-title">Header (1446×50px)</h3>
              <p className="description">
                Полный хедер со всеми компонентами
              </p>
              <div style={{ width: '100%', overflow: 'hidden', border: '1px solid #333' }}>
                <Header 
                  userName="Демо пользователь"
                  userPlan="Демо план"
                  onSearch={(value) => alert(`Header поиск: ${value}`)}
                  onProfileMenuItemClick={(item) => alert(`Header Profile: ${item.label}`)}
                  onHelpMenuItemClick={(item) => alert(`Header Help: ${item.label}`)}
                />
              </div>
            </div>

            <div className="demo-card">
              <h3 className="card-title">ProfileMenu (178×44px)</h3>
              <p className="description">
                Полный профиль пользователя с 9 пунктами меню
              </p>
              <div className="flex-center">
                <ProfileMenu 
                  userName="Иван Петров"
                  userPlan="Премиум"
                  onMenuItemClick={(item) => alert(`ProfileMenu: ${item.label}`)}
                />
              </div>
            </div>

            <div className="demo-card">
              <h3 className="card-title">HelpMenu (84×44px)</h3>
              <p className="description">
                Компактное меню помощи с 4 пунктами
              </p>
              <div className="flex-center">
                <HelpMenu 
                  onMenuItemClick={(item) => alert(`HelpMenu: ${item.label}`)}
                />
              </div>
      </div>

            <div className="demo-card">
              <h3 className="card-title">SearchInput (400×36px)</h3>
              <p className="description">
                Поле поиска с поддержкой Enter и Escape
              </p>
              <div className="flex-center">
                <SearchInput 
                  placeholder="Search my files"
                  onSearch={(value) => alert(`Поиск: ${value}`)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Информация о проекте */}
        <div className="demo-section">
          <h2 className="section-title">
            О проекте
          </h2>
          <div className="info-text">
            <ul className="info-list">
              <li>React проект на Vite</li>
              <li>Кастомные CSS стили без фреймворков</li>
              <li>Шесть основных компонентов: Header, ProfileMenu, HelpMenu, SearchInput, Storage и StorageItem</li>
              <li>Header (1446×50px) - объединяет все компоненты с логотипом</li>
              <li>ProfileMenu и HelpMenu: три состояния (standard, hover, active)</li>
              <li>SearchInput: обычное, фокус и отключенное состояния</li>
              <li>Storage компоненты: Kudo, Google Drive, Dropbox с состояниями standard/active</li>
              <li>StorageItem: элементы хранения с состояниями standard/hover</li>
              <li>Полноценные выпадающие меню с анимациями</li>
              <li>Поиск с поддержкой Enter и Escape клавиш</li>
              <li>SVG логотип и иконки из Figma (24×24px для storage, 20×20px и 14×14px)</li>
              <li>Обработка кликов вне компонента</li>
              <li>Полная адаптивность для всех устройств</li>
              <li>Поддержка доступности (ARIA атрибуты, плейсхолдеры)</li>
              <li>Точное соответствие дизайну Figma</li>
              <li>Интерактивный лог активности</li>
              <li>Компонентная архитектура с переиспользованием</li>
              <li>Интеграция с Figma через MCP для точного воспроизведения дизайна</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;