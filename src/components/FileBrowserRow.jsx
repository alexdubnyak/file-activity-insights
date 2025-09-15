import React from 'react';
import './FileBrowserRow.css';
import Tooltip from './Tooltip';
import PreviewSmallIcon from '../assets/file-browser/preview-small.svg';
import ShareSharpIcon from '../assets/file-browser/ShareSharp.svg';
import LinkSharpIcon from '../assets/file-browser/LinkSharp.svg';

const FileBrowserRow = ({
    type = 'file', // 'file', 'folder', 'shared-folder'
    name = 'Untitled',
    access = null,
    modified = 'Unknown',
    size = null,
    owner = 'me',
    onClick = null,
    onShare = null,
    onLink = null,
    onContextMenu = null,
    fileData = null,
    ...props
}) => {
    // Форматируем размер файла
    const formatSize = (sizeStr) => {
        if (!sizeStr || type === 'folder' || type === 'shared-folder') return '';
        return sizeStr;
    };

    // Обработчики для кнопок действий
    const handleShare = (e) => {
        e.stopPropagation();
        onShare?.();
    };

    const handleLink = (e) => {
        e.stopPropagation();
        onLink?.();
    };

    // Обработчик правого клика
    const handleContextMenu = (e) => {
        e.preventDefault(); // Предотвращаем стандартное контекстное меню браузера
        if (onContextMenu) {
            const rect = e.currentTarget.getBoundingClientRect();
            onContextMenu(e, {
                x: e.clientX,
                y: e.clientY,
                file: fileData || {
                    type,
                    name,
                    access,
                    modified,
                    size,
                    owner
                }
            });
        }
    };

    return (
        <div
            className="file-browser-row"
            onClick={onClick}
            onContextMenu={handleContextMenu}
            {...props}
        >
            {/* NAME секция */}
            <div className="file-browser-row__name-section">
                <div className="file-browser-row__icon">
                    <img src={PreviewSmallIcon} alt="file" className="file-browser-row__icon-img" />
                </div>
                <Tooltip content={`Open "${name}"`} position="top" delay={500}>
                    <span className="file-browser-row__name">{name}</span>
                </Tooltip>
            </div>

            {/* ACCESS секция - кнопки действий */}
            <div className="file-browser-row__access-section">
                <Tooltip content={`Share access to "${name}"`} position="top" delay={300}>
                    <button
                        className="file-browser-row__action-btn"
                        onClick={handleShare}
                    >
                        <img src={ShareSharpIcon} alt="Share" />
                    </button>
                </Tooltip>
                <Tooltip content={`Create view-only link for "${name}"`} position="top" delay={300}>
                    <button
                        className="file-browser-row__action-btn"
                        onClick={handleLink}
                    >
                        <img src={LinkSharpIcon} alt="Link" />
                    </button>
                </Tooltip>
            </div>

            {/* MODIFIED секция */}
            <div className="file-browser-row__modified-section">
                <span className="file-browser-row__modified-text">
                    {modified}, <strong>{owner}</strong>
                </span>
            </div>

            {/* SIZE секция */}
            <div className="file-browser-row__size-section">
                <span className="file-browser-row__size">{formatSize(size)}</span>
            </div>
        </div>
    );
};

export default FileBrowserRow;
