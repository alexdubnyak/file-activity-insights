import React, { useState, useEffect } from 'react';
import './FileDetails.css';

// Импорт иконок из assets
import CloseIcon from '../assets/file-browser/CloseRounded.svg';
import DateIcon from '../assets/file-browser/date.svg'; // для date фильтра
import UsersIcon from '../assets/file-browser/usernames.svg'; // для usernames фильтра
import ActionsIcon from '../assets/file-browser/actions.svg'; // для actions фильтра
import PreviewBigIcon from '../assets/file-browser/preview-big.svg';

const FileDetails = ({ file, isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState('properties');
  const [collapsedDays, setCollapsedDays] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null); // 'date', 'users', 'actions', или null
  const [selectedDateFilter, setSelectedDateFilter] = useState('All');
  const [selectedUsersFilter, setSelectedUsersFilter] = useState('All');
  const [selectedActionsFilter, setSelectedActionsFilter] = useState('All');

  // Закрытие dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.file-details__filter-container')) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

  if (!isVisible || !file) {
    return null;
  }

  // Генерируем разные активности в зависимости от файла
  const generateFileActivity = (fileName) => {
    const activities = {
      'Playground.dwg': [
        {
          date: 'Today',
          fullDate: 'Monday, 15',
          activities: [
            { id: 1, type: 'opened', message: 'You opened this file', time: '14:25' },
            { id: 2, type: 'modified', message: 'Sarah Chen has modified this file', time: '11:15' },
            { id: 3, type: 'commented', message: 'Alex Rodriguez has commented on this file', time: '09:45' }
          ]
        },
        {
          date: 'Yesterday',
          fullDate: 'Sunday, 14',
          activities: [
            { id: 4, type: 'shared', message: 'You shared this file with Maria Garcia for editing', time: '16:30' },
            { id: 5, type: 'opened', message: 'This file was opened by David Kim', time: '13:20' }
          ]
        },
        {
          date: 'Friday, 13',
          fullDate: '',
          activities: [
            { id: 6, type: 'renamed', message: 'You renamed this file from Playground_v1.dwg to Playground.dwg', time: '10:15' },
            { id: 7, type: 'moved', message: 'This file was moved to Projects/Current by Lisa Wang', time: '09:30' }
          ]
        },
        {
          date: 'Thursday, 12',
          fullDate: '',
          activities: [
            { id: 8, type: 'subscribed', message: 'You have subscribed on this file', time: '15:45' },
            { id: 9, type: 'opened', message: 'This file was opened by John Smith', time: '12:10' }
          ]
        },
        {
          date: 'Wednesday, 11',
          fullDate: '',
          activities: [
            { id: 10, type: 'created', message: 'You have created this file', time: '08:30' }
          ]
        }
      ],
      '3D Model.dwg': [
        {
          date: 'Today',
          fullDate: 'Monday, 15',
          activities: [
            { id: 11, type: 'opened', message: 'This file was opened by Emma Thompson', time: '15:10' },
            { id: 12, type: 'commented', message: 'You have commented on this file', time: '12:45' }
          ]
        },
        {
          date: 'Saturday, 13',
          fullDate: '',
          activities: [
            { id: 13, type: 'modified', message: 'You have modified this file', time: '17:20' },
            { id: 14, type: 'shared', message: 'This file was shared with Robert Johnson by Kate Miller for viewing', time: '14:15' }
          ]
        },
        {
          date: 'Friday, 12',
          fullDate: '',
          activities: [
            { id: 15, type: 'unshared', message: 'You have removed access to this file for Tom Wilson', time: '11:30' },
            { id: 16, type: 'opened', message: 'You opened this file', time: '09:15' }
          ]
        },
        {
          date: 'Tuesday, 9',
          fullDate: '',
          activities: [
            { id: 17, type: 'restored', message: 'This file was restored from the trash by Admin User', time: '16:45' }
          ]
        }
      ],
      'Floor Plan.pdf': [
        {
          date: 'Today',
          fullDate: 'Monday, 15',
          activities: [
            { id: 18, type: 'opened', message: 'You opened this file', time: '13:55' },
            { id: 19, type: 'shared', message: 'You shared this file with Jennifer Lee for viewing', time: '10:20' }
          ]
        },
        {
          date: 'Sunday, 14',
          fullDate: '',
          activities: [
            { id: 20, type: 'modified', message: 'Michael Brown has modified this file', time: '19:30' },
            { id: 21, type: 'commented', message: 'Anna Davis has commented on this file', time: '16:10' }
          ]
        },
        {
          date: 'Thursday, 11',
          fullDate: '',
          activities: [
            { id: 22, type: 'moved', message: 'You have moved this file to Archive/2024', time: '14:25' },
            { id: 23, type: 'opened', message: 'This file was opened by Chris Wilson', time: '11:40' }
          ]
        },
        {
          date: 'Monday, 8',
          fullDate: '',
          activities: [
            { id: 24, type: 'renamed', message: 'This file was renamed from FloorPlan_draft.pdf to Floor Plan.pdf by Project Manager', time: '13:15' }
          ]
        }
      ],
      'Elevation.dwg': [
        {
          date: 'Today',
          fullDate: 'Monday, 15',
          activities: [
            { id: 25, type: 'commented', message: 'You have commented on this file', time: '16:40' },
            { id: 26, type: 'opened', message: 'This file was opened by Sophie Anderson', time: '14:20' }
          ]
        },
        {
          date: 'Friday, 12',
          fullDate: '',
          activities: [
            { id: 27, type: 'shared', message: 'This file was shared with Team Lead by Daniel Martinez for editing', time: '12:50' },
            { id: 28, type: 'modified', message: 'You have modified this file', time: '09:35' }
          ]
        },
        {
          date: 'Wednesday, 10',
          fullDate: '',
          activities: [
            { id: 29, type: 'unsubscribed', message: 'You have unsubscribed from this file', time: '15:20' },
            { id: 30, type: 'opened', message: 'You opened this file', time: '13:45' }
          ]
        },
        {
          date: 'Sunday, 7',
          fullDate: '',
          activities: [
            { id: 31, type: 'created', message: 'This file was created by Architecture Team', time: '10:00' }
          ]
        }
      ]
    };

    return activities[fileName] || activities['Playground.dwg'];
  };

  const fileActivity = generateFileActivity(file?.name);

  const toggleDayCollapse = (dayIndex) => {
    setCollapsedDays(prev => ({
      ...prev,
      [dayIndex]: !prev[dayIndex]
    }));
  };

  const toggleDropdown = (dropdownType) => {
    setOpenDropdown(openDropdown === dropdownType ? null : dropdownType);
  };

  const handleDateFilterSelect = (filter) => {
    setSelectedDateFilter(filter);
    setOpenDropdown(null);
  };

  const handleUsersFilterSelect = (filter) => {
    setSelectedUsersFilter(filter);
    setOpenDropdown(null);
  };

  const handleActionsFilterSelect = (filter) => {
    setSelectedActionsFilter(filter);
    setOpenDropdown(null);
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
          </button>
        </div>
        <button className="file-details__close" onClick={onClose}>
          <img src={CloseIcon} alt="Close" width="16" height="16" />
        </button>
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
                className={`file-details__filter-arrow ${openDropdown === 'date' ? 'file-details__filter-arrow--rotated' : ''}`}
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill="none"
              >
                <path d="M0 0L5 5L10 0H0Z" fill="currentColor" />
              </svg>
            </div>
            {openDropdown === 'date' && (
              <div className="file-details__dropdown">
                {dateFilterOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`file-details__dropdown-item ${selectedDateFilter === option.value ? 'file-details__dropdown-item--selected' : ''}`}
                    onClick={() => handleDateFilterSelect(option.value)}
                  >
                    {selectedDateFilter === option.value && (
                      <svg className="file-details__dropdown-check" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
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
                className={`file-details__filter-arrow ${openDropdown === 'users' ? 'file-details__filter-arrow--rotated' : ''}`}
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill="none"
              >
                <path d="M0 0L5 5L10 0H0Z" fill="currentColor" />
              </svg>
            </div>
            {openDropdown === 'users' && (
              <div className="file-details__dropdown">
                {usersFilterOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`file-details__dropdown-item ${selectedUsersFilter === option.value ? 'file-details__dropdown-item--selected' : ''}`}
                    onClick={() => handleUsersFilterSelect(option.value)}
                  >
                    {selectedUsersFilter === option.value && (
                      <svg className="file-details__dropdown-check" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
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
                className={`file-details__filter-arrow ${openDropdown === 'actions' ? 'file-details__filter-arrow--rotated' : ''}`}
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill="none"
              >
                <path d="M0 0L5 5L10 0H0Z" fill="currentColor" />
              </svg>
            </div>
            {openDropdown === 'actions' && (
              <div className="file-details__dropdown">
                {actionsFilterOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`file-details__dropdown-item ${selectedActionsFilter === option.value ? 'file-details__dropdown-item--selected' : ''}`}
                    onClick={() => handleActionsFilterSelect(option.value)}
                  >
                    {selectedActionsFilter === option.value && (
                      <svg className="file-details__dropdown-check" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
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
            {fileActivity.map((dayGroup, dayIndex) => (
              <div key={dayIndex} className="file-details__day-group">
                <div className="file-details__day-header">
                  <div className="file-details__day-title">
                    <span className="file-details__day-name">{dayGroup.date}</span>
                    {dayGroup.fullDate && (
                      <span className="file-details__day-full">{dayGroup.fullDate}</span>
                    )}
                  </div>
                  <button
                    className="file-details__day-toggle"
                    onClick={() => toggleDayCollapse(dayIndex)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={collapsedDays[dayIndex] ? 'file-details__arrow--collapsed' : ''}
                    >
                      <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                {!collapsedDays[dayIndex] && (
                  <div className="file-details__activities">
                    {dayGroup.activities.map((activity) => (
                      <div key={activity.id} className="file-details__activity-item">
                        <div className="file-details__activity-message">
                          {renderActivityMessage(activity.message)}
                        </div>
                        <div className="file-details__activity-time">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
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
