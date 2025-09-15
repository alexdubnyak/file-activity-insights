import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.css';

const Tooltip = ({
    children,
    content,
    position = 'top', // 'top', 'bottom', 'left', 'right'
    delay = 500,
    disabled = false,
    className = '',
    ...props
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const tooltipRef = useRef(null);
    const timeoutRef = useRef(null);

    const showTooltip = () => {
        if (disabled || !content) return;
        
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            calculatePosition();
        }, delay);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    const calculatePosition = () => {
        if (!triggerRef.current || !tooltipRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let top = 0;
        let left = 0;

        switch (position) {
            case 'top':
                top = triggerRect.top - tooltipRect.height - 8;
                left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = triggerRect.bottom + 8;
                left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.left - tooltipRect.width - 8;
                break;
            case 'right':
                top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.right + 8;
                break;
            default:
                top = triggerRect.top - tooltipRect.height - 8;
                left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        }

        // Корректировка если тултип выходит за границы экрана
        if (left < 8) left = 8;
        if (left + tooltipRect.width > viewportWidth - 8) {
            left = viewportWidth - tooltipRect.width - 8;
        }
        if (top < 8) top = 8;
        if (top + tooltipRect.height > viewportHeight - 8) {
            top = viewportHeight - tooltipRect.height - 8;
        }

        setTooltipPosition({ top, left });
    };

    useEffect(() => {
        if (isVisible) {
            calculatePosition();
        }
    }, [isVisible]);

    useEffect(() => {
        const handleScroll = () => {
            if (isVisible) {
                hideTooltip();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);

    if (!content) {
        return children;
    }

    return (
        <div
            className={`tooltip-wrapper ${className}`}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
            ref={triggerRef}
            {...props}
        >
            {children}
            
            {isVisible && (
                <div
                    ref={tooltipRef}
                    className={`tooltip tooltip--${position}`}
                    style={{
                        position: 'fixed',
                        top: tooltipPosition.top,
                        left: tooltipPosition.left,
                        zIndex: 9999
                    }}
                >
                    <div className="tooltip__content">
                        {content}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
