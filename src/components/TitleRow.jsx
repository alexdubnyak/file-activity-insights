import React from 'react';
import './TitleRow.css';

const TitleRow = () => {
    return (
        <div className="table-header">
            <div className="table-header__name-section">
                <span className="table-header__text">NAME</span>
                <div className="table-header__sort-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 10L12 15L17 10" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            <div className="table-header__access-section">
                <span className="table-header__text">ACCESS</span>
            </div>
            <div className="table-header__modified-section">
                <span className="table-header__text">MODIFIED</span>
            </div>
            <div className="table-header__size-section">
                <span className="table-header__text">SIZE</span>
            </div>
        </div>
    );
};

export default TitleRow;
