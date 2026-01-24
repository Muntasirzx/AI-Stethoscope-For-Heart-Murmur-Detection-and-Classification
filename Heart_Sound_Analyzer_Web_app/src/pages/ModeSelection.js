import React from 'react';

function ModeSelection({ onSelectMode }) {
    return (
        <div className="mode-selection" id="modeSelection" style={{ display: 'flex' }}>
            <div className="mode-card" onClick={() => onSelectMode('normal')}>
                <h2>Normal Mode</h2>
                <p>Single-Channel Rapid Analysis</p>
            </div>
            <div className="mode-card" onClick={() => onSelectMode('advanced')}>
                <h2>Advanced Mode</h2>
                <p>4-Valve Comprehensive Analysis</p>
            </div>
        </div>
    );
}

export default ModeSelection;
