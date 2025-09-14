import React from 'react';
import TitleRow from './TitleRow';
import FileBrowserRow from './FileBrowserRow';
import './FileBrowser.css';

const FileBrowser = ({
    files = [],
    onFileClick = null,
    onFolderClick = null,
    ...props
}) => {
    // Пример данных файлов (как на новом скриншоте)
    const defaultFiles = [
        {
            id: 1,
            type: 'file',
            name: '2D Metro Berlin22.pdf',
            access: 'shared',
            modified: '2 years ago',
            owner: 'me',
            size: '3 MB'
        },
        {
            id: 2,
            type: 'file',
            name: '3D Playground.dwg',
            access: 'shared',
            modified: 'last year',
            owner: 'me',
            size: '52.8 KB'
        },
        {
            id: 3,
            type: 'file',
            name: 'A3 - Plan General.pdf',
            access: 'shared',
            modified: '2 years ago',
            owner: 'me',
            size: '13.8 MB'
        },
        {
            id: 4,
            type: 'file',
            name: 'A4 Elevation.pdf',
            access: 'shared',
            modified: '2 years ago',
            owner: 'me',
            size: '3 MB'
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
                        onClick={() => handleItemClick(file)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FileBrowser;
