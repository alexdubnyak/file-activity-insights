// Импорт иконок для HelpMenu из обновленных SVG файлов
import HelpIconSvg from '../assets/help-menu/help-menu.svg?react';
import DropdownSvg from '../assets/help-menu/dropdown.svg?react';
import HelpSvg from '../assets/help-menu/type=online help.svg?react';
import QuickTourSvg from '../assets/help-menu/type=online tour.svg?react';
import AboutSvg from '../assets/help-menu/type=about.svg?react';
import NotificationsSvg from '../assets/help-menu/type=type4.svg?react';

// Экспорт иконок для HelpMenu
export const HelpIcon = () => (
  <div style={{ width: '14px', height: '14px' }}>
    <HelpIconSvg />
  </div>
);
export const HelpDropdownIcon = () => <DropdownSvg />;
export const MenuHelpIcon = () => <HelpSvg />;
export const QuickTourIcon = () => <QuickTourSvg />;
export const AboutIcon = () => <AboutSvg />;
export const NotificationsIcon = () => <NotificationsSvg />;

