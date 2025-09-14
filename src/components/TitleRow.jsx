import React from 'react';
import './TitleRow.css';

const TitleRow = () => {
    return (
        <div className="title-row">
            <div className="title-row__column title-row__column--name">
                <span className="title-row__text">NAME</span>
                <svg className="title-row__sort-icon" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L4 4L7 1" stroke="#666666" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className="title-row__column title-row__column--access">
                <span className="title-row__text">ACCESS</span>
            </div>
            <div className="title-row__column title-row__column--modified">
                <span className="title-row__text">MODIFIED</span>
            </div>
            <div className="title-row__column title-row__column--size">
                <span className="title-row__text">SIZE</span>
            </div>
        </div>
    );
};

export default TitleRow;
