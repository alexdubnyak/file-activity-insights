import React from 'react';
import ButtonToolbar from './ButtonToolbar';
import FileFilterDropdown from './FileFilterDropdown';
import Tooltip from './Tooltip';
import './ToolBarRow.css';

// Импорт иконок из assets/tool-bar-row
import UploadDrawingIcon from '../assets/tool-bar-row/upload drawing.svg';
import CreateFileIcon from '../assets/tool-bar-row/create file.svg';
import CreateFolderIcon from '../assets/tool-bar-row/create folder.svg';
import RecycleBinIcon from '../assets/tool-bar-row/Frame.svg';

const ToolBarRow = ({
    onUploadDrawing = null,
    onCreateFile = null,
    onCreateFolder = null,
    onRecycleBin = null,
    onFilterChange = null,
    className = '',
    ...props
}) => {
    const handleUploadDrawing = () => {
        console.log('Upload Drawing clicked');
        if (onUploadDrawing) onUploadDrawing();
    };

    const handleCreateFile = () => {
        console.log('Create File clicked');
        if (onCreateFile) onCreateFile();
    };

    const handleCreateFolder = () => {
        console.log('Create Folder clicked');
        if (onCreateFolder) onCreateFolder();
    };

    const handleRecycleBin = () => {
        console.log('Recycle Bin clicked');
        if (onRecycleBin) onRecycleBin();
    };

    const handleFilterChange = (filter) => {
        console.log('Filter changed:', filter);
        if (onFilterChange) onFilterChange(filter);
    };

    return (
        <div
            className={`toolbar-row ${className}`}
            {...props}
        >
            {/* Левая сторона - кнопки с иконками */}
            <div className="toolbar-row__left">
                <ButtonToolbar size="medium" align="left" gap="small">
                    <Tooltip content="Upload Drawing" position="bottom">
                        <ButtonToolbar.Button
                            variant="default"
                            onClick={handleUploadDrawing}
                        >
                            <img src={UploadDrawingIcon} alt="" className="toolbar-icon" />
                        </ButtonToolbar.Button>
                    </Tooltip>

                    <Tooltip content="Create File" position="bottom">
                        <ButtonToolbar.Button
                            variant="default"
                            onClick={handleCreateFile}
                        >
                            <img src={CreateFileIcon} alt="" className="toolbar-icon" />
                        </ButtonToolbar.Button>
                    </Tooltip>

                    <Tooltip content="Create Folder" position="bottom">
                        <ButtonToolbar.Button
                            variant="default"
                            onClick={handleCreateFolder}
                        >
                            <img src={CreateFolderIcon} alt="" className="toolbar-icon" />
                        </ButtonToolbar.Button>
                    </Tooltip>
                </ButtonToolbar>
            </div>

            {/* Правая сторона - Recycle bin и фильтр */}
            <div className="toolbar-row__right">
                {/* Recycle bin */}
                <Tooltip content="Open Recycle Bin" position="bottom">
                    <div
                        className="toolbar-row__recycle-bin"
                        onClick={handleRecycleBin}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleRecycleBin();
                            }
                        }}
                    >
                        <span className="toolbar-row__recycle-text">Recycle bin</span>
                        <img src={RecycleBinIcon} alt="" className="toolbar-row__recycle-icon" />
                    </div>
                </Tooltip>

                {/* Фильтр файлов */}
                <div className="toolbar-row__filter">
                    <FileFilterDropdown
                        initialFilter="all"
                        onFilterChange={handleFilterChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ToolBarRow;
