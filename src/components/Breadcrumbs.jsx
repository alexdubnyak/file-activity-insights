import React from 'react';
import './Breadcrumbs.css';
import homeIcon from '../assets/breadcrumbs/home.svg';
import arrowIcon from '../assets/breadcrumbs/arrow.svg';

const Breadcrumbs = ({
    items = [],
    onItemClick = null,
    className = '',
    ...props
}) => {
    const defaultItems = [
        { id: 'home', label: 'My files', isActive: false, isHome: true },
        { id: 'current', label: 'DWG Sample Files', isActive: true }
    ];

    const breadcrumbItems = items.length > 0 ? items : defaultItems;

    const handleItemClick = (item, index) => {
        if (onItemClick && !item.isActive) {
            onItemClick(item, index);
        }
    };

    return (
        <nav
            className={`breadcrumbs ${className}`}
            aria-label="Breadcrumb navigation"
            {...props}
        >
            <ol className="breadcrumbs__list">
                {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                        {/* Иконка домика для первого элемента */}
                        {item.isHome && (
                            <li className="breadcrumbs__item">
                                <button
                                    className={`breadcrumbs__home ${item.isActive ? 'breadcrumbs__home--active' : ''}`}
                                    onClick={() => handleItemClick(item, index)}
                                    aria-label="Home"
                                >
                                    <img src={homeIcon} alt="" width="20" height="20" />
                                </button>
                            </li>
                        )}

                        {/* Стрелка перед каждым текстом (кроме самого первого если это только домик) */}
                        {(index > 0 || item.isHome) && (
                            <li className="breadcrumbs__item">
                                <span className="breadcrumbs__separator" aria-hidden="true">
                                    <img src={arrowIcon} alt="" width="20" height="20" />
                                </span>
                            </li>
                        )}

                        {/* Текст элемента */}
                        <li className="breadcrumbs__item">
                            <button
                                className={`breadcrumbs__link ${item.isActive ? 'breadcrumbs__link--active' : ''}`}
                                onClick={() => handleItemClick(item, index)}
                                aria-current={item.isActive ? 'page' : undefined}
                            >
                                {item.label}
                            </button>
                        </li>
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
