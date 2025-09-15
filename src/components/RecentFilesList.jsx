import React from 'react';
import RecentFileItem from './RecentFileItem';
import './RecentFilesList.css';
import RecentFiles01 from '../assets/recent-files/recent-files-01.png';
import RecentFiles02 from '../assets/recent-files/recent-files-02.png';
import RecentFiles03 from '../assets/recent-files/recent-files-03.png';
import RecentFiles04 from '../assets/recent-files/recent-files-04.png';

const RecentFilesList = () => {
    // Моковые данные файлов с разными именами и временем
    const recentFiles = [
        {
            id: 1,
            fileName: "Playground",
            fileExtension: ".dwg",
            timeAgo: "2 minutes ago",
            thumbnailSrc: RecentFiles01
        },
        {
            id: 2,
            fileName: "3D Model",
            fileExtension: ".dwg",
            timeAgo: "15 minutes ago",
            thumbnailSrc: RecentFiles02
        },
        {
            id: 3,
            fileName: "Floor Plan",
            fileExtension: ".pdf",
            timeAgo: "1 hour ago",
            thumbnailSrc: RecentFiles03
        },
        {
            id: 4,
            fileName: "Elevation",
            fileExtension: ".dwg",
            timeAgo: "3 hours ago",
            thumbnailSrc: RecentFiles04
        }
    ];

    const handleFileClick = (file) => {
        console.log('Открываем файл:', file);
    };

    return (
        <div className="recent-files-list">
            {/* Заголовок секции */}
            <div className="recent-files-list__header">
                <h2 className="recent-files-list__title">Recent files</h2>
            </div>

            {/* Горизонтальный ряд файлов */}
            <div className="recent-files-list__row">
                {recentFiles.map((file) => (
                    <div key={file.id} className="recent-files-list__item">
                        <RecentFileItem
                            fileName={file.fileName}
                            fileExtension={file.fileExtension}
                            timeAgo={file.timeAgo}
                            thumbnailSrc={file.thumbnailSrc}
                            onClick={() => handleFileClick(file)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentFilesList;
