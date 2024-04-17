import React, { useState } from 'react';

function Toggler(props) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div>
            <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={isDarkMode}
                    onChange={toggleMode}
                />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                    {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </label>


            </div>
            <style>{`
                body {
                    background-color: ${isDarkMode ? '#333333' : '#ffffff'};
                    color: ${isDarkMode ? '#ffffff' : '#000000'};
                }
            `}</style>
        </div>
    );
}

export default Toggler;