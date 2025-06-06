import React from 'react';

export const Spinner = () => {
    return (
        <div className="spinner-overlay">
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};