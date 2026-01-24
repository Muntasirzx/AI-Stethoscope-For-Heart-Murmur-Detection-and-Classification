import React, { useState, useEffect } from 'react';
import ModeSelection from './pages/ModeSelection';
import NormalMode from './pages/NormalMode';
import AdvancedMode from './pages/AdvancedMode';
import './App.css';

const STORAGE_KEY = 'heart_sound_history';

function App() {
  const [currentMode, setCurrentMode] = useState('selection');
  const [sidebarActive, setSidebarActive] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const handleSaveReport = (reportData) => {
    const newHistory = [reportData, ...history];
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  const loadReport = (id) => {
    const report = history.find(item => item.id === id);
    if (report) {
      setSelectedReport(report);
      // Determine mode based on report data structure
      // Advanced mode reports have 'results' object with valve keys, Normal mode has 'prediction'
      if (report.analysis && report.analysis.results) {
        setCurrentMode('advanced');
      } else {
        setCurrentMode('normal');
      }
      setSidebarActive(false);
    }
  };

  const handleBackToSelection = () => {
    setCurrentMode('selection');
    setSelectedReport(null);
  };

  return (
    <div className="app">
      {/* Overlay */}
      <div
        className={`overlay ${sidebarActive ? 'active' : ''}`}
        onClick={() => setSidebarActive(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarActive ? 'active' : ''}`} id="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">History</div>
          <button className="close-btn" onClick={() => setSidebarActive(false)}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
        <div className="history-list" id="historyList">
          {history.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>No history yet</div>
          ) : (
            history.map(item => (
              <div key={item.id} className="history-item" onClick={() => loadReport(item.id)}>
                <div className="history-date">{new Date(item.timestamp).toLocaleString()}</div>
                <div className="history-name">{item.patient.name || 'Unknown'}</div>
                <div
                  className="history-result"
                  style={{
                    color: (item.analysis.prediction && item.analysis.prediction.includes('Abnormal')) ||
                      (item.analysis.results && Object.values(item.analysis.results).some(r => r.prediction === 'Present'))
                      ? '#ff4444' : '#00ff00'
                  }}
                >
                  {item.analysis.prediction || 'Advanced Analysis'}
                </div>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Header */}
      <header>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="menu-btn" onClick={toggleSidebar}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
          <div className="logo">
            <svg viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Heart Sound Analyzer
          </div>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>v1.0.0</div>
      </header>

      {/* Main Content */}
      {currentMode === 'selection' && (
        <ModeSelection onSelectMode={setCurrentMode} />
      )}

      {currentMode === 'normal' && (
        <>
          <button
            id="backToModeBtn"
            className="back-btn"
            onClick={handleBackToSelection}
            style={{ display: 'flex' }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            Change Mode
          </button>
          <main>
            <NormalMode
              onSaveReport={handleSaveReport}
              initialReport={selectedReport}
            />
          </main>
        </>
      )}

      {currentMode === 'advanced' && (
        <>
          <button
            id="backToModeBtn"
            className="back-btn"
            onClick={handleBackToSelection}
            style={{ display: 'flex' }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            Change Mode
          </button>
          <main>
            <AdvancedMode
              onSaveReport={handleSaveReport}
              initialReport={selectedReport}
            />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
