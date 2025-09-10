// Импорт иконок из обновленных SVG файлов 20×20px
import StorageSvg from '../assets/profile-menu/type=storage.svg?react';
import FilesSvg from '../assets/profile-menu/type=files.svg?react';
import DrawingsSvg from '../assets/profile-menu/type=drawings automation.svg?react';
import ResourcesSvg from '../assets/profile-menu/type=resources.svg?react';
import ProfileSvg from '../assets/profile-menu/type=my profile.svg?react';
import UsersSvg from '../assets/profile-menu/type=users.svg?react';
import CompanySvg from '../assets/profile-menu/type=company.svg?react';
import WebGLSvg from '../assets/profile-menu/type=web gl test.svg?react';
import LogoutSvg from '../assets/profile-menu/type=logout.svg?react';

// Для dropdown стрелки используем простую SVG
const DropdownSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.1 8L9.9 12.5L13.9 8L13.4 7.5L9.9 11.4L6.7 7.5L6.1 8Z" fill="currentColor"/>
  </svg>
);

// Экспорт иконок 20×20px из обновленных файлов
export const StorageIcon = () => <StorageSvg />;
export const FilesIcon = () => <FilesSvg />;
export const DrawingsIcon = () => <DrawingsSvg />;
export const ResourcesIcon = () => <ResourcesSvg />;
export const ProfileIcon = () => <ProfileSvg />;
export const UsersIcon = () => <UsersSvg />;
export const CompanyIcon = () => <CompanySvg />;
export const WebGLIcon = () => <WebGLSvg />;
export const LogoutIcon = () => <LogoutSvg />;
export const DropdownIcon = () => <DropdownSvg />;