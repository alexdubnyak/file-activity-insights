import React, { useState, useEffect } from 'react';
import './FileDetails.css';

// Импорт иконок из assets
import CloseIcon from '../assets/file-browser/CloseRounded.svg';
import DateIcon from '../assets/file-browser/date.svg'; // для date фильтра
import UsersIcon from '../assets/file-browser/usernames.svg'; // для usernames фильтра
import ActionsIcon from '../assets/file-browser/actions.svg'; // для actions фильтра
import PreviewBigIcon from '../assets/file-browser/preview-big.svg';

const FileDetails = ({ file, isVisible, onClose, initialTab = 'properties' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [collapsedDays, setCollapsedDays] = useState({});
  const [dateFilter, setDateFilter] = useState([]);
  const [userFilter, setUserFilter] = useState([]);
  const [actionFilter, setActionFilter] = useState([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState('All');
  const [selectedUsersFilter, setSelectedUsersFilter] = useState('All');
  const [selectedActionsFilter, setSelectedActionsFilter] = useState('All');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [visibleDaysCount, setVisibleDaysCount] = useState(5);

  // Обновляем активную вкладку при изменении initialTab
  useEffect(() => {
    console.log('FileDetails useEffect: initialTab changed to:', initialTab);
    setActiveTab(initialTab);
  }, [initialTab, file]);

  // Закрытие dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.file-details__filter-container')) {
        setShowDateDropdown(false);
        setShowUserDropdown(false);
        setShowActionDropdown(false);
      }
    };

    if (showDateDropdown || showUserDropdown || showActionDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showDateDropdown, showUserDropdown, showActionDropdown]);

  if (!isVisible || !file) {
    return null;
  }

  // Генерируем разные активности в зависимости от файла
  const generateFileActivity = (fileName) => {
    const generateDaysForFile = (filePrefix, startId) => {
      const days = [];
      const dayNames = [
        'Today', 'Yesterday', 'Friday, 13', 'Thursday, 12', 'Wednesday, 11', 'Tuesday, 10', 'Monday, 9',
        'Sunday, 8', 'Saturday, 7', 'Friday, 6', 'Thursday, 5', 'Wednesday, 4', 'Tuesday, 3', 'Monday, 2',
        'Sunday, 1', 'Saturday, 30', 'Friday, 29', 'Thursday, 28', 'Wednesday, 27', 'Tuesday, 26'
      ];
      
      const users = ['You', 'Sarah Chen', 'Alex Rodriguez', 'Maria Garcia', 'David Kim', 'Lisa Wang', 'John Smith', 'Emma Thompson', 'Admin User', 'Kate Miller', 'Robert Johnson', 'Tom Wilson'];
      const actions = ['opened', 'modified', 'commented', 'shared', 'renamed', 'moved', 'unshared', 'subscribed', 'created', 'restored'];
      
      let currentId = startId;
      
      dayNames.forEach((dayName, index) => {
        const activitiesCount = Math.floor(Math.random() * 4) + 2; // 2-5 активностей на день
        const dayActivities = [];
        
        for (let i = 0; i < activitiesCount; i++) {
          const user = users[Math.floor(Math.random() * users.length)];
          const action = actions[Math.floor(Math.random() * actions.length)];
          const hour = Math.floor(Math.random() * 16) + 8; // 8-23 часа
          const minute = Math.floor(Math.random() * 60);
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          
          let message = '';
          switch (action) {
            case 'opened':
              message = user === 'You' ? 'You opened this file' : `This file was opened by ${user}`;
              break;
            case 'modified':
              message = user === 'You' ? 'You have modified this file' : `${user} has modified this file`;
              break;
            case 'commented':
              message = user === 'You' ? 'You have commented on this file' : `${user} has commented on this file`;
              break;
            case 'shared':
              const targetUser = users[Math.floor(Math.random() * users.length)];
              const permission = Math.random() > 0.5 ? 'editing' : 'viewing';
              message = user === 'You' ? `You shared this file with ${targetUser} for ${permission}` : `This file was shared with ${targetUser} by ${user} for ${permission}`;
              break;
            case 'renamed':
              message = user === 'You' ? `You renamed this file from ${filePrefix}_old.dwg to ${filePrefix}.dwg` : `This file was renamed from ${filePrefix}_old.dwg to ${filePrefix}.dwg by ${user}`;
              break;
            case 'moved':
              const folders = ['Projects/Current', 'Archive/Models', 'Shared/Team', 'Backup/Old'];
              const folder = folders[Math.floor(Math.random() * folders.length)];
              message = `This file was moved to ${folder} by ${user}`;
              break;
            case 'unshared':
              const removedUser = users[Math.floor(Math.random() * users.length)];
              message = user === 'You' ? `You have removed access to this file for ${removedUser}` : `${user} has removed access to this file for ${removedUser}`;
              break;
            case 'subscribed':
              message = user === 'You' ? 'You have subscribed on this file' : `${user} has subscribed on this file`;
              break;
            case 'created':
              message = user === 'You' ? 'You have created this file' : `This file was created by ${user}`;
              break;
            case 'restored':
              message = `This file was restored from the trash by ${user}`;
              break;
          }
          
          dayActivities.push({
            id: currentId++,
            type: action,
            message,
            time,
            user
          });
        }
        
        days.push({
          date: dayName,
          fullDate: index === 0 ? 'Monday, 15' : (index === 1 ? 'Sunday, 14' : ''),
          activities: dayActivities
        });
      });
      
      return days;
    };

    const activities = {
      'Playground.dwg': generateDaysForFile('Playground', 1),
      '3D Model.dwg': generateDaysForFile('3D Model', 1000),
      'Floor Plan.pdf': generateDaysForFile('Floor Plan', 2000),
      'Elevation.dwg': generateDaysForFile('Elevation', 3000),
      'Site Plan.dwg': generateDaysForFile('Site Plan', 4000),
      'Details.dwg': generateDaysForFile('Details', 5000),
      'Sections.dwg': generateDaysForFile('Sections', 6000)
    };

    return activities[fileName] || activities['Playground.dwg'];
  };

  const fileActivity = generateFileActivity(file?.name);

  // Функция фильтрации активностей
  const filterActivities = (activities) => {
    return activities.map(dayGroup => {
      const filteredActivities = dayGroup.activities.filter(activity => {
        // Фильтр по пользователю
        if (selectedUsersFilter !== 'All' && activity.user !== selectedUsersFilter) {
          return false;
        }
        
        // Фильтр по типу действия
        if (selectedActionsFilter !== 'All' && activity.type !== selectedActionsFilter) {
          return false;
        }
        
        // Фильтр по дате (пока простая реализация)
        if (selectedDateFilter !== 'All') {
          if (selectedDateFilter === 'Today' && dayGroup.date !== 'Today') {
            return false;
          }
          if (selectedDateFilter === 'Last 7 days') {
            const recentDays = ['Today', 'Yesterday', 'Friday, 13', 'Thursday, 12', 'Wednesday, 11', 'Tuesday, 10', 'Monday, 8'];
            if (!recentDays.includes(dayGroup.date)) {
              return false;
            }
          }
        }
        
        return true;
      });
      
      return {
        ...dayGroup,
        activities: filteredActivities
      };
    }).filter(dayGroup => dayGroup.activities.length > 0); // Убираем дни без активностей
  };

  const filteredFileActivity = filterActivities(fileActivity);

  const toggleDayCollapse = (dayIndex) => {
    setCollapsedDays(prev => ({
      ...prev,
      [dayIndex]: !prev[dayIndex]
    }));
  };

  const loadMoreDays = () => {
    setVisibleDaysCount(prev => prev + 5);
  };

  const getVisibleDays = (days) => {
    return days.slice(0, visibleDaysCount);
  };

  const toggleDropdown = (dropdownType) => {
    if (dropdownType === 'date') {
      setShowDateDropdown(!showDateDropdown);
      setShowUserDropdown(false);
      setShowActionDropdown(false);
    } else if (dropdownType === 'users') {
      setShowUserDropdown(!showUserDropdown);
      setShowDateDropdown(false);
      setShowActionDropdown(false);
    } else if (dropdownType === 'actions') {
      setShowActionDropdown(!showActionDropdown);
      setShowDateDropdown(false);
      setShowUserDropdown(false);
    }
  };

  const handleDateFilterSelect = (filter) => {
    setSelectedDateFilter(filter);
    setShowDateDropdown(false);
  };

  const handleUsersFilterSelect = (filter) => {
    setSelectedUsersFilter(filter);
    setShowUserDropdown(false);
  };

  const handleActionsFilterSelect = (filter) => {
    setSelectedActionsFilter(filter);
    setShowActionDropdown(false);
  };

  const dateFilterOptions = [
    { value: 'All', label: 'All' },
    { value: 'Today', label: 'Today' },
    { value: 'Last 7 days', label: 'Last 7 days' },
    { value: 'Last 30 days', label: 'Last 30 days' },
    { value: 'Last 3 months', label: 'Last 3 months' },
    { value: 'Custom', label: 'Custom' }
  ];

  const usersFilterOptions = [
    { value: 'All', label: 'All' },
    { value: 'You', label: 'You' },
    { value: 'Sarah Chen', label: 'Sarah Chen' },
    { value: 'Alex Rodriguez', label: 'Alex Rodriguez' },
    { value: 'Maria Garcia', label: 'Maria Garcia' },
    { value: 'David Kim', label: 'David Kim' },
    { value: 'Lisa Wang', label: 'Lisa Wang' },
    { value: 'John Smith', label: 'John Smith' },
    { value: 'Emma Thompson', label: 'Emma Thompson' },
    { value: 'Admin User', label: 'Admin User' }
  ];

  const actionsFilterOptions = [
    { value: 'All', label: 'All' },
    { value: 'opened', label: 'Opened' },
    { value: 'modified', label: 'Modified' },
    { value: 'shared', label: 'Shared' },
    { value: 'commented', label: 'Commented' },
    { value: 'renamed', label: 'Renamed' },
    { value: 'moved', label: 'Moved' },
    { value: 'created', label: 'Created' },
    { value: 'subscribed', label: 'Subscribed' },
    { value: 'unshared', label: 'Unshared' },
    { value: 'restored', label: 'Restored' }
  ];

  // Генерируем имя редактора в зависимости от файла
  const generateEditedBy = (fileName) => {
    const editedByMap = {
      'Playground.dwg': 'Sarah Chen',
      '3D Model.dwg': 'Alex Rodriguez',
      'Floor Plan.pdf': 'Maria Garcia',
      'Elevation.dwg': 'David Kim',
      'Section.dwg': 'Lisa Wang',
      'Details.dwg': 'John Smith',
      'Layout.pdf': 'Emma Thompson',
      'Drawings.dwg': 'Michael Brown'
    };

    return editedByMap[fileName] || 'Admin User';
  };

  // Генерируем имя создателя в зависимости от файла
  const generateCreatedBy = (fileName) => {
    const createdByMap = {
      'Playground.dwg': 'John Smith',
      '3D Model.dwg': 'Emma Thompson',
      'Floor Plan.pdf': 'David Kim',
      'Elevation.dwg': 'Lisa Wang',
      'Section.dwg': 'Michael Brown',
      'Details.dwg': 'Sarah Chen',
      'Layout.pdf': 'Alex Rodriguez',
      'Drawings.dwg': 'Maria Garcia'
    };

    return createdByMap[fileName] || 'Project Manager';
  };

  const renderActivityMessage = (message) => {
    // Выделяем имена пользователей и названия файлов жирным шрифтом
    const highlightTerms = [
      'Sarah Chen', 'Alex Rodriguez', 'Maria Garcia', 'David Kim', 'Lisa Wang', 'John Smith',
      'Emma Thompson', 'Robert Johnson', 'Kate Miller', 'Tom Wilson', 'Admin User',
      'Jennifer Lee', 'Michael Brown', 'Anna Davis', 'Chris Wilson', 'Project Manager',
      'Sophie Anderson', 'Daniel Martinez', 'Team Lead', 'Architecture Team',
      'Playground_v1.dwg', 'Playground.dwg', 'FloorPlan_draft.pdf', 'Floor Plan.pdf',
      'Projects/Current', 'Archive/2024'
    ];

    const regex = new RegExp(`(${highlightTerms.join('|')})`, 'g');
    const parts = message.split(regex);

    return parts.map((part, index) => {
      if (highlightTerms.includes(part)) {
        return <span key={index} className="file-details__activity-highlight">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div className="file-details">
      <div className="file-details__header">
        <div className="file-details__tabs">
          <button
            className={`file-details__tab ${activeTab === 'properties' ? 'file-details__tab--active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            Properties
          </button>
          <button
            className={`file-details__tab ${activeTab === 'insights' ? 'file-details__tab--active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            File insights
            <div className="file-details__tab-badge">NEW</div>
          </button>
        </div>
      </div>

      {activeTab === 'insights' && (
        <div className="file-details__filters">
          <div className="file-details__filter-container">
            <div
              className="file-details__filter"
              onClick={() => toggleDropdown('date')}
            >
              <div className="file-details__filter-icon">
                <img src={DateIcon} alt="Date" width="16" height="16" />
              </div>
              <svg
                className={`file-details__filter-arrow ${showDateDropdown ? 'file-details__filter-arrow--rotated' : ''}`}
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill="none"
              >
                <path d="M0 0L5 5L10 0H0Z" fill="currentColor" />
              </svg>
            </div>
            {showDateDropdown && (
              <div className="file-details__dropdown">
                {dateFilterOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`file-details__dropdown-item ${selectedDateFilter === option.value ? 'file-details__dropdown-item--selected' : ''}`}
                    onClick={() => handleDateFilterSelect(option.value)}
                  >
                    <div className="file-details__dropdown-check-container">
                      {selectedDateFilter === option.value && (
                        <svg className="file-details__dropdown-check" width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="file-details__filter-container">
            <div
              className="file-details__filter"
              onClick={() => toggleDropdown('users')}
            >
              <div className="file-details__filter-icon">
                <img src={UsersIcon} alt="Users" width="16" height="16" />
              </div>
              <svg
                className={`file-details__filter-arrow ${showUserDropdown ? 'file-details__filter-arrow--rotated' : ''}`}
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill="none"
              >
                <path d="M0 0L5 5L10 0H0Z" fill="currentColor" />
              </svg>
            </div>
            {showUserDropdown && (
              <div className="file-details__dropdown">
                {usersFilterOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`file-details__dropdown-item ${selectedUsersFilter === option.value ? 'file-details__dropdown-item--selected' : ''}`}
                    onClick={() => handleUsersFilterSelect(option.value)}
                  >
                    <div className="file-details__dropdown-check-container">
                      {selectedUsersFilter === option.value && (
                        <svg className="file-details__dropdown-check" width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="file-details__filter-container">
            <div
              className="file-details__filter"
              onClick={() => toggleDropdown('actions')}
            >
              <div className="file-details__filter-icon">
                <img src={ActionsIcon} alt="Actions" width="16" height="16" />
              </div>
              <svg
                className={`file-details__filter-arrow ${showActionDropdown ? 'file-details__filter-arrow--rotated' : ''}`}
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill="none"
              >
                <path d="M0 0L5 5L10 0H0Z" fill="currentColor" />
              </svg>
            </div>
            {showActionDropdown && (
              <div className="file-details__dropdown">
                {actionsFilterOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`file-details__dropdown-item ${selectedActionsFilter === option.value ? 'file-details__dropdown-item--selected' : ''}`}
                    onClick={() => handleActionsFilterSelect(option.value)}
                  >
                    <div className="file-details__dropdown-check-container">
                      {selectedActionsFilter === option.value && (
                        <svg className="file-details__dropdown-check" width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="file-details__content">
        {activeTab === 'insights' && (
          <div className="file-details__activity">
            {getVisibleDays(filteredFileActivity).map((dayGroup, dayIndex) => (
              <div key={dayIndex} className="file-details__day-group">
                <div 
                  className="file-details__day-header"
                  onClick={() => toggleDayCollapse(dayIndex)}
                >
                  <div className="file-details__day-title">
                    <span className="file-details__day-name">{dayGroup.date}</span>
                    {dayGroup.fullDate && (
                      <span className="file-details__day-full">{dayGroup.fullDate}</span>
                    )}
                  </div>
                  <div className="file-details__day-toggle">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={collapsedDays[dayIndex] ? 'file-details__arrow--collapsed' : ''}
                    >
                      <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className={`file-details__activities ${collapsedDays[dayIndex] ? 'file-details__activities--collapsed' : ''}`}>
                  {dayGroup.activities.map((activity) => (
                    <div key={activity.id} className="file-details__activity-item">
                      <div className="file-details__activity-message">
                        {renderActivityMessage(activity.message)}
                      </div>
                      <div className="file-details__activity-time">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {filteredFileActivity.length > visibleDaysCount && (
              <button 
                className="file-details__load-more"
                onClick={loadMoreDays}
              >
                Load more activities
              </button>
            )}
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="file-details__properties">
            <div className="file-details__preview-container">
              <div className="file-details__preview">
                <div className="file-details__file-icon">
                  <img src={PreviewBigIcon} alt="CAD File" />
                </div>
              </div>
            </div>

            <div className="file-details__property-row">
              <span className="file-details__property-label">Size:</span>
              <div className="file-details__property-value-group">
                <span className="file-details__property-value">36.6 Kb</span>
              </div>
            </div>

            <div className="file-details__property-row">
              <span className="file-details__property-label">Created by:</span>
              <div className="file-details__property-value-group">
                <span className="file-details__property-value">{generateCreatedBy(file?.name)}</span>
              </div>
            </div>

            <div className="file-details__property-row">
              <span className="file-details__property-label">Creation time:</span>
              <div className="file-details__property-value-group">
                <span className="file-details__property-value">11/6/2024</span>
                <span className="file-details__property-value">3:02 PM</span>
              </div>
            </div>

            <div className="file-details__property-row">
              <span className="file-details__property-label">Last edited:</span>
              <div className="file-details__property-value-group">
                <span className="file-details__property-value">11/14/2024</span>
                <span className="file-details__property-value">2:45 PM</span>
              </div>
            </div>

            <div className="file-details__property-row">
              <span className="file-details__property-label">Edited by:</span>
              <div className="file-details__property-value-group">
                <span className="file-details__property-value">{generateEditedBy(file?.name)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDetails;
