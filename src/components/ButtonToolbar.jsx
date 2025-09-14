import React from 'react';
import './ButtonToolbar.css';

const ButtonToolbar = ({
    children,
    size = 'medium',
    align = 'left', // 'left', 'center', 'right', 'space-between'
    gap = 'medium', // 'small', 'medium', 'large'
    className = '',
    ...props
}) => {
    const toolbarClasses = [
        'button-toolbar',
        `button-toolbar--${size}`,
        `button-toolbar--align-${align}`,
        `button-toolbar--gap-${gap}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <div
            className={toolbarClasses}
            role="toolbar"
            {...props}
        >
            {children}
        </div>
    );
};

// Компонент кнопки для тулбара
const ToolbarButton = ({
    children,
    variant = 'default', // 'default', 'primary', 'secondary', 'danger'
    size = 'medium',
    disabled = false,
    active = false,
    onClick = null,
    className = '',
    ...props
}) => {
    const buttonClasses = [
        'toolbar-button',
        `toolbar-button--${variant}`,
        `toolbar-button--${size}`,
        active && 'toolbar-button--active',
        disabled && 'toolbar-button--disabled',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            className={buttonClasses}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

ButtonToolbar.Button = ToolbarButton;

export default ButtonToolbar;
