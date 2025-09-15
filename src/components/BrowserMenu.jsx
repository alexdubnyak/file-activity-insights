import React, { useEffect, useRef } from 'react';
import './BrowserMenu.css';
import Tooltip from './Tooltip';
import RenameIcon from '../assets/file-browser/Rename.svg';
import CloneIcon from '../assets/file-browser/Clone.svg';
import DownloadIcon from '../assets/file-browser/Download.svg';
import MoveIcon from '../assets/file-browser/Move.svg';
import DeleteIcon from '../assets/file-browser/Delete.svg';
import PermissionsIcon from '../assets/file-browser/Permessions.svg';

const BrowserMenu = ({
    isOpen = false,
    position = { x: 0, y: 0 },
    onClose = null,
    onRename = null,
    onClone = null,
    onDownload = null,
    onMove = null,
    onDelete = null,
    onPermissions = null,
    selectedFile = null,
    ...props
}) => {
    const menuRef = useRef(null);

    // Закрытие меню при клике вне его области и корректировка позиции
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose?.();
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose?.();
            }
        };

        // Корректировка позиции меню при открытии
        if (isOpen && menuRef.current) {
            const menu = menuRef.current;
            const rect = menu.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let adjustedX = position.x;
            let adjustedY = position.y;

            // Проверяем, не выходит ли меню за правый край экрана
            if (position.x + rect.width > viewportWidth) {
                adjustedX = position.x - rect.width;
            }

            // Проверяем, не выходит ли меню за нижний край экрана
            if (position.y + rect.height > viewportHeight) {
                adjustedY = position.y - rect.height;
            }

            // Обновляем позицию, если она изменилась
            if (adjustedX !== position.x || adjustedY !== position.y) {
                menu.style.left = `${adjustedX}px`;
                menu.style.top = `${adjustedY}px`;
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose, position]);

    // Обработчики меню
    const handleMenuClick = (action, handler) => {
        if (handler) {
            handler(selectedFile);
        }
        onClose?.();
    };

    if (!isOpen) return null;

    return (
        <div
            ref={menuRef}
            className="browser-menu"
            style={{
                left: position.x,
                top: position.y,
            }}
            {...props}
        >
            <Tooltip content={`Rename "${selectedFile?.name || 'file'}"`} position="right" delay={300}>
                <div
                    className="browser-menu__item browser-menu__item--active"
                    onClick={() => handleMenuClick('rename', onRename)}
                >
                    <img src={RenameIcon} alt="Rename" className="browser-menu__icon" />
                    <span className="browser-menu__text">Rename</span>
                </div>
            </Tooltip>

            <Tooltip content={`Create a copy of "${selectedFile?.name || 'file'}"`} position="right" delay={300}>
                <div
                    className="browser-menu__item"
                    onClick={() => handleMenuClick('clone', onClone)}
                >
                    <img src={CloneIcon} alt="Clone" className="browser-menu__icon" />
                    <span className="browser-menu__text">Clone</span>
                </div>
            </Tooltip>

            <Tooltip content={`Download "${selectedFile?.name || 'file'}" to your device`} position="right" delay={300}>
                <div
                    className="browser-menu__item"
                    onClick={() => handleMenuClick('download', onDownload)}
                >
                    <img src={DownloadIcon} alt="Download" className="browser-menu__icon" />
                    <span className="browser-menu__text">Download</span>
                </div>
            </Tooltip>

            <Tooltip content={`Move "${selectedFile?.name || 'file'}" to another location`} position="right" delay={300}>
                <div
                    className="browser-menu__item"
                    onClick={() => handleMenuClick('move', onMove)}
                >
                    <img src={MoveIcon} alt="Move" className="browser-menu__icon" />
                    <span className="browser-menu__text">Move</span>
                </div>
            </Tooltip>

            <Tooltip content={`Delete "${selectedFile?.name || 'file'}" permanently`} position="right" delay={300}>
                <div
                    className="browser-menu__item"
                    onClick={() => handleMenuClick('delete', onDelete)}
                >
                    <img src={DeleteIcon} alt="Delete" className="browser-menu__icon" />
                    <span className="browser-menu__text">Delete</span>
                </div>
            </Tooltip>

            <Tooltip content={`Manage permissions for "${selectedFile?.name || 'file'}"`} position="right" delay={300}>
                <div
                    className="browser-menu__item"
                    onClick={() => handleMenuClick('permissions', onPermissions)}
                >
                    <img src={PermissionsIcon} alt="Permissions" className="browser-menu__icon" />
                    <span className="browser-menu__text">Permissions</span>
                </div>
            </Tooltip>
        </div>
    );
};

export default BrowserMenu;
