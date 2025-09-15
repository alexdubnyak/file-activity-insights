import React from 'react';
import './TitleRow.css';
import Tooltip from './Tooltip';

const TitleRow = () => {
    return (
        <div className="table-header">
            <Tooltip content="Sort files by name" position="bottom" delay={400}>
                <div className="table-header__name-section">
                    <span className="table-header__text">NAME</span>
                    <div className="table-header__sort-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 10L12 15L17 10" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </Tooltip>
            <Tooltip content="File sharing permissions" position="bottom" delay={400}>
                <div className="table-header__access-section">
                    <span className="table-header__text">ACCESS</span>
                </div>
            </Tooltip>
            <Tooltip content="Last modified date and time" position="bottom" delay={400}>
                <div className="table-header__modified-section">
                    <span className="table-header__text">MODIFIED</span>
                </div>
            </Tooltip>
            <Tooltip content="File size in bytes" position="bottom" delay={400}>
                <div className="table-header__size-section">
                    <span className="table-header__text">SIZE</span>
                </div>
            </Tooltip>
        </div>
    );
};

export default TitleRow;
