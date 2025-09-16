import React, { useState } from 'react';
import TitleRow from './TitleRow';
import FileBrowserRow from './FileBrowserRow';
import BrowserMenu from './BrowserMenu';
import './FileBrowser.css';

const FileBrowser = ({
    files = [],
    onFileClick = null,
    onFolderClick = null,
    onFileShare = null,
    onFileLink = null,
    onFileRename = null,
    onFileClone = null,
    onFileDownload = null,
    onFileMove = null,
    onFileDelete = null,
    onFilePermissions = null,
    selectedFileId = null, // Добавляем пропс для выбранного файла
    ...props
}) => {
    // Состояние для контекстного меню
    const [contextMenu, setContextMenu] = useState({
        isOpen: false,
        position: { x: 0, y: 0 },
        file: null
    });
    // Пример данных файлов согласно дизайну из Figma
    const defaultFiles = [
        {
            id: 1,
            type: 'file',
            name: 'Playground.dwg',
            access: 'shared',
            modified: '2 years ago',
            owner: 'me',
            size: '3 MB'
        },
        {
            id: 2,
            type: 'file',
            name: '3D Model.dwg',
            access: 'shared',
            modified: '1 year ago',
            owner: 'me',
            size: '2.1 MB'
        },
        {
            id: 3,
            type: 'file',
            name: 'Floor Plan.pdf',
            access: 'shared',
            modified: '6 months ago',
            owner: 'me',
            size: '1.5 MB'
        },
        {
            id: 4,
            type: 'file',
            name: 'Elevation.dwg',
            access: 'shared',
            modified: '3 months ago',
            owner: 'me',
            size: '4.2 MB'
        },
        {
            id: 5,
            type: 'file',
            name: 'Site Plan.dwg',
            access: 'shared',
            modified: '2 months ago',
            owner: 'Sarah Chen',
            size: '5.8 MB'
        },
        {
            id: 6,
            type: 'file',
            name: 'Details.dwg',
            access: 'shared',
            modified: '1 month ago',
            owner: 'Alex Rodriguez',
            size: '2.7 MB'
        },
        {
            id: 7,
            type: 'file',
            name: 'Sections.dwg',
            access: 'shared',
            modified: '3 weeks ago',
            owner: 'Maria Garcia',
            size: '3.4 MB'
        },
        {
            id: 8,
            type: 'file',
            name: 'Structural Plan.pdf',
            access: 'shared',
            modified: '2 weeks ago',
            owner: 'David Kim',
            size: '6.2 MB'
        },
        {
            id: 9,
            type: 'file',
            name: 'Electrical Layout.dwg',
            access: 'shared',
            modified: '1 week ago',
            owner: 'Lisa Wang',
            size: '4.1 MB'
        },
        {
            id: 10,
            type: 'file',
            name: 'HVAC System.dwg',
            access: 'shared',
            modified: '3 days ago',
            owner: 'John Smith',
            size: '7.3 MB'
        }
    ];

    const filesToRender = files.length > 0 ? files : defaultFiles;

    const handleItemClick = (file) => {
        if (file.type === 'folder' || file.type === 'shared-folder') {
            onFolderClick?.(file);
        } else {
            onFileClick?.(file);
        }
    };

    const handleFileShare = (file) => {
        onFileShare?.(file);
    };

    const handleFileLink = (file) => {
        onFileLink?.(file);
    };

    // Обработчик контекстного меню
    const handleContextMenu = (event, data) => {
        setContextMenu({
            isOpen: true,
            position: { x: data.x, y: data.y },
            file: data.file
        });
    };

    // Закрытие контекстного меню
    const handleCloseContextMenu = () => {
        setContextMenu({
            isOpen: false,
            position: { x: 0, y: 0 },
            file: null
        });
    };

    // Обработчики действий меню
    const handleMenuRename = (file) => {
        onFileRename?.(file);
    };

    const handleMenuClone = (file) => {
        onFileClone?.(file);
    };

    const handleMenuDownload = (file) => {
        onFileDownload?.(file);
    };

    const handleMenuMove = (file) => {
        onFileMove?.(file);
    };

    const handleMenuDelete = (file) => {
        onFileDelete?.(file);
    };

    const handleMenuPermissions = (file) => {
        onFilePermissions?.(file);
    };

    return (
        <div className="file-browser" {...props}>
            <TitleRow />
            <div className="file-browser__content">
                {filesToRender.map((file) => (
                    <FileBrowserRow
                        key={file.id}
                        type={file.type}
                        name={file.name}
                        access={file.access}
                        modified={file.modified}
                        size={file.size}
                        owner={file.owner}
                        fileData={file}
                        isActive={selectedFileId === file.id} // Передаем активное состояние
                        onClick={() => handleItemClick(file)}
                        onShare={() => handleFileShare(file)}
                        onLink={() => handleFileLink(file)}
                        onPermissions={onFilePermissions}
                        onContextMenu={handleContextMenu}
                    />
                ))}
            </div>

            {/* Контекстное меню */}
            <BrowserMenu
                isOpen={contextMenu.isOpen}
                position={contextMenu.position}
                selectedFile={contextMenu.file}
                onClose={handleCloseContextMenu}
                onRename={handleMenuRename}
                onClone={handleMenuClone}
                onDownload={handleMenuDownload}
                onMove={handleMenuMove}
                onDelete={handleMenuDelete}
                onPermissions={handleMenuPermissions}
            />
        </div>
    );
};

export default FileBrowser;
