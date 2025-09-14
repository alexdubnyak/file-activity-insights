import React, { useState, useRef, useEffect } from 'react';
import './FileFilterDropdown.css';

// Импорт полигона из assets
import PolygonIcon from '../assets/tool-bar-row/Polygon 1.svg';

const FileFilterDropdown = ({
    initialFilter = 'all',
    onFilterChange = null,
    className = '',
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(initialFilter);
    const [isHovered, setIsHovered] = useState(false);
    const dropdownRef = useRef(null);

    // Опции фильтрации
    const filterOptions = [
        {
            id: 'all',
            label: 'Show all files',
            description: 'All file types'
        },
        {
            id: 'drawings-pdfs',
            label: 'Show drawings & PDFs',
            description: 'DWG, DXF, DWT, DWF, PDF files'
        },
        {
            id: 'drawings-only',
            label: 'Show drawings only (DWG/DXF/DWT/DWF files)',
            description: 'CAD drawings only'
        }
    ];

    const currentOption = filterOptions.find(option => option.id === selectedFilter);

    // Закрытие при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (optionId) => {
        setSelectedFilter(optionId);
        setIsOpen(false);
        if (onFilterChange) {
            onFilterChange(optionId);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
        }
    };

    return (
        <div
            ref={dropdownRef}
            className={`file-filter-dropdown ${className}`}
            {...props}
        >
            <button
                className={`file-filter-dropdown__trigger ${isHovered ? 'file-filter-dropdown__trigger--hover' : 'file-filter-dropdown__trigger--standard'
                    } ${isOpen ? 'file-filter-dropdown__trigger--open' : ''}`}
                onClick={handleToggle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onKeyDown={handleKeyDown}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                data-name={isHovered ? "state=hover" : "state=standard"}
            >
                <span className="file-filter-dropdown__text">
                    {currentOption?.label}
                </span>

                <div className={`file-filter-dropdown__arrow ${isOpen ? 'file-filter-dropdown__arrow--open' : ''}`}>
                    <img src={PolygonIcon} alt="" className="file-filter-dropdown__polygon" />
                </div>
            </button>

            {isOpen && (
                <div className="file-filter-dropdown__menu" role="listbox">
                    {filterOptions.map((option) => (
                        <button
                            key={option.id}
                            className={`file-filter-dropdown__option ${selectedFilter === option.id ? 'file-filter-dropdown__option--selected' : ''
                                }`}
                            onClick={() => handleOptionSelect(option.id)}
                            role="option"
                            aria-selected={selectedFilter === option.id}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileFilterDropdown;
