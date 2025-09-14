import React from 'react';
import './FileBrowserRow.css';
import FolderIcon from '../assets/file-browser/folder.svg';
import SharedFolderIcon from '../assets/file-browser/shared folder.svg';
import PreviewSmallIcon from '../assets/file-browser/preview-small.svg';
import ShareSharpIcon from '../assets/file-browser/ShareSharp.svg';

const FileBrowserRow = ({
    type = 'file', // 'file', 'folder', 'shared-folder'
    name = 'Untitled',
    access = null,
    modified = 'Unknown',
    size = null,
    owner = 'me',
    onClick = null,
    ...props
}) => {
    // Определяем иконку в зависимости от типа
    const getIcon = () => {
        switch (type) {
            case 'folder':
                return <img src={FolderIcon} alt="folder" className="file-browser-row__icon-img" />;
            case 'shared-folder':
                return <img src={SharedFolderIcon} alt="shared folder" className="file-browser-row__icon-img" />;
            case 'file':
            default:
                return <img src={PreviewSmallIcon} alt="file" className="file-browser-row__icon-img" />;
        }
    };

    // Форматируем размер файла
    const formatSize = (sizeStr) => {
        if (!sizeStr || type === 'folder' || type === 'shared-folder') return '';
        return sizeStr;
    };

    return (
        <div
            className={`file-browser-row ${type === 'folder' || type === 'shared-folder' ? 'file-browser-row--folder' : ''}`}
            onClick={onClick}
            {...props}
        >
            {/* NAME колонка */}
            <div className="file-browser-row__column file-browser-row__column--name">
                <div className="file-browser-row__icon">
                    {getIcon()}
                </div>
                <span className="file-browser-row__name">{name}</span>
            </div>

            {/* ACCESS колонка */}
            <div className="file-browser-row__column file-browser-row__column--access">
                {access && (
                    <div className="file-browser-row__access">
                        <img src={ShareSharpIcon} alt="shared" className="file-browser-row__share-icon" />
                    </div>
                )}
            </div>

            {/* MODIFIED колонка */}
            <div className="file-browser-row__column file-browser-row__column--modified">
                <span className="file-browser-row__modified">{modified}</span>
                <span className="file-browser-row__owner">{owner}</span>
            </div>

            {/* SIZE колонка */}
            <div className="file-browser-row__column file-browser-row__column--size">
                <span className="file-browser-row__size">{formatSize(size)}</span>
            </div>
        </div>
    );
};

export default FileBrowserRow;
