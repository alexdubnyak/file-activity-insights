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
                        onClick={() => handleItemClick(file)}
                        onShare={() => handleFileShare(file)}
                        onLink={() => handleFileLink(file)}
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
