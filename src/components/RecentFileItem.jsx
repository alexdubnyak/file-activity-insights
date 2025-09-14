import React from 'react';
import './RecentFileItem.css';
import AresLogo from '../assets/recent-files/ARES logo.svg';
import RecentFiles01 from '../assets/recent-files/recent-files-01.png';
import ProfileIcon from '../assets/profile-menu/type=my profile.svg';

// SVG стрелки как компонент
const ArrowIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 8L10 12L14 8" stroke="#cfcfcf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const RecentFileItem = ({
    fileName = "Building elevations_conflicting_1698662341807",
    fileExtension = ".dwg",
    timeAgo = "1 seconds ago",
    thumbnailSrc = RecentFiles01,
    logoSrc = AresLogo,
    onClick = null,
    ...props
}) => {
    return (
        <div
            className="recent-file-item"
            onClick={onClick}
            {...props}
        >
            {/* Превью файла */}
            <div
                className="recent-file-item__thumbnail"
                style={{ backgroundImage: `url('${thumbnailSrc}')` }}
            />

            {/* Название файла */}
            <div className="recent-file-item__filename">
                <div className="recent-file-item__name">
                    {fileName}
                </div>
                <div className="recent-file-item__extension">
                    {fileExtension}
                </div>
            </div>

            {/* Нижняя секция с логотипом и временем */}
            <div className="recent-file-item__footer">
                <div className="recent-file-item__logo">
                    <img alt="" src={logoSrc} />
                </div>
                <div className="recent-file-item__time">
                    {timeAgo}
                </div>

                {/* Правая секция с иконками - всегда прижата к правому краю */}
                <div className="recent-file-item__icons">
                    <div className="recent-file-item__profile-icon">
                        <img alt="" src={ProfileIcon} />
                    </div>
                    <div className="recent-file-item__arrow">
                        <ArrowIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentFileItem;
