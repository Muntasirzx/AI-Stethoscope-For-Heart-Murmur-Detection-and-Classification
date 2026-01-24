import React, { useState, useEffect } from 'react';

const API = 'http://3.214.247.241';

function AdvancedMode({ onSaveReport, initialReport }) {
    const [files, setFiles] = useState({ av: null, pv: null, tv: null, mv: null });
    const [patient, setPatient] = useState({ name: '', age: '', weight: '', gender: '', bloodGroup: '' });
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialReport) {
            setPatient(initialReport.patient);
            setResults(initialReport.analysis);
            setFiles({ av: null, pv: null, tv: null, mv: null });
        }
    }, [initialReport]);

    const handleFile = (e, valve) => {
        if (e.target.files && e.target.files[0]) {
            setFiles({ ...files, [valve]: e.target.files[0] });
        }
    };

    const allSelected = Object.values(files).every(f => f !== null);

    const analyze = async () => {
        if (!allSelected) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('av_file', files.av);
        formData.append('pv_file', files.pv);
        formData.append('tv_file', files.tv);
        formData.append('mv_file', files.mv);

        formData.append('name', patient.name || 'Unknown');
        formData.append('age', patient.age || 'N/A');
        formData.append('weight', patient.weight || 'N/A');
        formData.append('gender', patient.gender || 'N/A');
        formData.append('bloodGroup', patient.bloodGroup || 'N/A');

        try {
            const response = await fetch(`${API}/api/analyze_advanced/`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                setResults(data);
                const report = {
                    id: Date.now(),
                    timestamp: new Date().toISOString(),
                    patient: { ...patient },
                    analysis: data
                };
                onSaveReport(report);
            } else {
                alert('Error: ' + (data.error || 'Analysis failed'));
            }
        } catch (error) {
            alert('Error connecting to server: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const valves = [
        { id: 'av', label: 'AV', name: 'Aortic Valve' },
        { id: 'pv', label: 'PV', name: 'Pulmonary Valve' },
        { id: 'tv', label: 'TV', name: 'Tricuspid Valve' },
        { id: 'mv', label: 'MV', name: 'Mitral Valve' }
    ];

    return (
        <>
            {/* Input Panel */}
            <div className="input-panel">
                <div>
                    <div className="section-title">Patient Details</div>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={patient.name}
                            onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                            placeholder="John Doe"
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Age</label>
                            <input
                                type="number"
                                value={patient.age}
                                onChange={(e) => setPatient({ ...patient, age: e.target.value })}
                                placeholder="45"
                            />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Weight (kg)</label>
                            <input
                                type="number"
                                value={patient.weight}
                                onChange={(e) => setPatient({ ...patient, weight: e.target.value })}
                                placeholder="70"
                            />
                        </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label>Gender</label>
                        <select
                            value={patient.gender}
                            onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Blood Group</label>
                        <select
                            value={patient.bloodGroup}
                            onChange={(e) => setPatient({ ...patient, bloodGroup: e.target.value })}
                        >
                            <option value="">Select</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div className="section-title">4-Channel Audio Input</div>
                    <div className="advanced-input-grid">
                        {valves.map(valve => (
                            <div
                                key={valve.id}
                                className={`file-upload ${files[valve.id] ? 'selected' : ''}`}
                                onClick={() => document.getElementById(`${valve.id}File`).click()}
                            >
                                <input
                                    id={`${valve.id}File`}
                                    type="file"
                                    accept=".wav"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFile(e, valve.id)}
                                />
                                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{valve.label}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                                    {files[valve.id] ? files[valve.id].name : 'Upload'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="btn" onClick={analyze} disabled={!allSelected}>Analyze All Channels</button>
            </div>

            {/* Results Panel */}
            <div className="results-panel">
                {/* Empty State */}
                <div className="empty-state" style={{ display: results ? 'none' : 'flex' }}>
                    <svg style={{ width: '48px', height: '48px', fill: '#333', marginBottom: '20px' }} viewBox="0 0 24 24">
                        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                    </svg>
                    <p>Upload recordings for all 4 locations and click Analyze</p>
                </div>

                {/* Results Content */}
                <div className="results-content" style={{ display: results ? 'flex' : 'none' }}>
                    {results && (
                        <>
                            <div className="report-header">
                                <div className="report-title">Advanced Multi-Valve Heart Sound Analysis</div>
                                <div className="report-date" style={{ marginLeft: 'auto', marginRight: '20px', color: 'var(--text-secondary)' }}>
                                    {new Date().toLocaleString()}
                                </div>
                                <div className="header-actions">
                                    <button className="btn-print" onClick={() => window.print()}>
                                        <svg viewBox="0 0 24 24">
                                            <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v5H8v-5h8zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" />
                                        </svg>
                                        Print
                                    </button>
                                </div>
                            </div>

                            <div className="patient-grid">
                                <div className="patient-item">
                                    <div className="label">Patient Name</div>
                                    <div className="value">{patient.name || 'Unknown'}</div>
                                </div>
                                <div className="patient-item">
                                    <div className="label">Age</div>
                                    <div className="value">{patient.age || 'N/A'}</div>
                                </div>
                                <div className="patient-item">
                                    <div className="label">Gender</div>
                                    <div className="value">{patient.gender || 'N/A'}</div>
                                </div>
                                <div className="patient-item">
                                    <div className="label">Weight</div>
                                    <div className="value">{patient.weight ? `${patient.weight} kg` : 'N/A'}</div>
                                </div>
                                <div className="patient-item">
                                    <div className="label">Blood Group</div>
                                    <div className="value">{patient.bloodGroup || 'N/A'}</div>
                                </div>
                                <div className="patient-item">
                                    <div className="label">Analysis Type</div>
                                    <div className="value">4-Valve Comprehensive</div>
                                </div>
                            </div>

                            {/* Summary Section */}
                            <div className="section-title" style={{ marginBottom: '15px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                                Summary Overview
                            </div>
                            <div className="valve-summary-grid">
                                {valves.map(valve => {
                                    const result = results.results[valve.id];
                                    const isMurmur = result.prediction === 'Present';
                                    const color = isMurmur ? '#ff4444' : '#00ff00';
                                    const statusText = isMurmur ? 'Murmur Detected' : 'No Murmur Detected';
                                    const confidence = (result.probability * 100).toFixed(1);

                                    return (
                                        <div key={valve.id} className="valve-summary-card">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div className="valve-label" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>{valve.label}</div>
                                                <div className="status-text" style={{ color: color, fontSize: '1rem' }}>{statusText}</div>
                                            </div>
                                            <div className="progress-bar-bg">
                                                <div className="progress-bar-fill" style={{ width: `${confidence}%`, backgroundColor: color }}></div>
                                            </div>
                                            <div className="confidence-text">Confidence: {confidence}%</div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Detailed Section */}
                            <div className="section-title" style={{ marginBottom: '15px', borderBottom: '1px solid var(--border)', paddingBottom: '10px', pageBreakBefore: 'always' }}>
                                Detailed Analysis
                            </div>
                            <div className="valve-detail-list">
                                {valves.map(valve => {
                                    const result = results.results[valve.id];
                                    return (
                                        <div key={valve.id} className="valve-detail-section">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                                <div className="valve-label" style={{ fontSize: '1.2rem' }}>{valve.label}</div>
                                                <div style={{ color: 'var(--text-secondary)' }}>{valve.name}</div>
                                            </div>
                                            <div className="plot-container" style={{ minHeight: '200px' }}>
                                                <img className="screen-only" src={result.phonocardiogram} alt={`${valve.label} Phonocardiogram`} style={{ width: '100%' }} />
                                                {result.phonocardiogram_light && (
                                                    <img className="print-only" src={result.phonocardiogram_light} alt={`${valve.label} Phonocardiogram (Print)`} style={{ width: '100%' }} />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Loading Overlay */}
            <div className={`loading ${loading ? 'active' : ''}`}>
                <div className="spinner"></div>
                <div style={{ letterSpacing: '2px', fontSize: '0.9rem' }}>ANALYZING ALL CHANNELS...</div>
            </div>
        </>
    );
}

export default AdvancedMode;
