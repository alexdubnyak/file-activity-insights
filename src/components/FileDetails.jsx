import React, { useState } from 'react';
import './FileDetails.css';

// Импорт иконок из assets
import CloseIcon from '../assets/file-browser/CloseRounded.svg';
import DateIcon from '../assets/file-browser/date.svg'; // для date фильтра
import UsersIcon from '../assets/file-browser/usernames.svg'; // для usernames фильтра
import ActionsIcon from '../assets/file-browser/actions.svg'; // для actions фильтра

const FileDetails = ({ file, isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState('insights');

  if (!isVisible || !file) {
    return null;
  }

  // Моковые данные для активности файла
  const fileActivity = [
    {
      date: 'Today',
      fullDate: 'Monday, 3',
      activities: [
        {
          id: 1,
          type: 'share',
          message: 'You shared this file with Rodrigo Leiria for editing.',
          time: '12:30'
        },
        {
          id: 2,
          type: 'share',
          message: 'This file was shared with Vikas Kumar by Andre Neumann for editing.',
          time: '12:30'
        },
        {
          id: 3,
          type: 'rename',
          message: 'This file was renamed from Old-name.dwg to New-name.dwg by Gautham',
          time: '12:30'
        }
      ]
    },
    {
      date: 'Saturday, 7',
      fullDate: '',
      activities: [
        {
          id: 4,
          type: 'share',
          message: 'You shared this file with Rodrigo Leiria for editing.',
          time: '12:30'
        },
        {
          id: 5,
          type: 'share',
          message: 'This file was shared with Vikas Kumar by Andre Neumann for editing.',
          time: '12:30'
        },
        {
          id: 6,
          type: 'rename',
          message: 'This file was renamed from Old-name.dwg to New-name.dwg by Gautham',
          time: '12:30'
        }
      ]
    }
  ];

  const renderActivityMessage = (message) => {
    // Выделяем имена пользователей и названия файлов жирным шрифтом
    const parts = message.split(/(Rodrigo Leiria|Vikas Kumar|Andre Neumann|Gautham|Old-name\.dwg|New-name\.dwg)/);
    return parts.map((part, index) => {
      if (['Rodrigo Leiria', 'Vikas Kumar', 'Andre Neumann', 'Gautham', 'Old-name.dwg', 'New-name.dwg'].includes(part)) {
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

      <div className="file-details__filters">
        <div className="file-details__filter">
          <div className="file-details__filter-icon">
            <img src={DateIcon} alt="Date" width="16" height="16" />
          </div>
          <svg className="file-details__filter-arrow" width="10" height="5" viewBox="0 0 10 5" fill="none">
            <path d="M0 0L5 5L10 0H0Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="file-details__filter">
          <div className="file-details__filter-icon">
            <img src={UsersIcon} alt="Users" width="16" height="16" />
          </div>
          <svg className="file-details__filter-arrow" width="10" height="5" viewBox="0 0 10 5" fill="none">
            <path d="M0 0L5 5L10 0H0Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="file-details__filter">
          <div className="file-details__filter-icon">
            <img src={ActionsIcon} alt="Actions" width="16" height="16" />
          </div>
          <svg className="file-details__filter-arrow" width="10" height="5" viewBox="0 0 10 5" fill="none">
            <path d="M0 0L5 5L10 0H0Z" fill="currentColor"/>
          </svg>
        </div>
      </div>

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
                  <button className="file-details__day-toggle">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
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
              </div>
            ))}
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="file-details__properties">
            <div className="file-details__property">
              <span className="file-details__property-label">Name:</span>
              <span className="file-details__property-value">{file.name}</span>
            </div>
            <div className="file-details__property">
              <span className="file-details__property-label">Size:</span>
              <span className="file-details__property-value">{file.size}</span>
            </div>
            <div className="file-details__property">
              <span className="file-details__property-label">Modified:</span>
              <span className="file-details__property-value">{file.modified}</span>
            </div>
            <div className="file-details__property">
              <span className="file-details__property-label">Owner:</span>
              <span className="file-details__property-value">{file.owner}</span>
            </div>
            <div className="file-details__property">
              <span className="file-details__property-label">Access:</span>
              <span className="file-details__property-value">{file.access}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDetails;
