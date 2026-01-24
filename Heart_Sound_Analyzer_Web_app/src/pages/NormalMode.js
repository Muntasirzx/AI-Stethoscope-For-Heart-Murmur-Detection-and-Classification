import React, { useState, useRef, useEffect } from 'react';

const API = 'http://3.214.247.241';

function NormalMode({ onSaveReport, initialReport }) {
    const [file, setFile] = useState(null);
    const [patient, setPatient] = useState({ name: '', age: '', weight: '', gender: '', bloodGroup: '' });
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileRef = useRef(null);
    const circleRef = useRef(null);

    useEffect(() => {
        if (initialReport) {
            setPatient(initialReport.patient);
            setResults(initialReport.analysis);
            setFile(null);
        }
    }, [initialReport]);

    useEffect(() => {
        if (results && circleRef.current) {
            const circle = circleRef.current;
            circle.style.animation = 'none';
            void circle.offsetHeight;
            circle.style.animation = null;
            setTimeout(() => {
                circle.setAttribute('stroke-dasharray', `${results.confidence}, 100`);
            }, 100);
        }
    }, [results]);

    const handleFile = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const analyze = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('audio', file);
        formData.append('name', patient.name || 'Unknown');
        formData.append('age', patient.age || 'N/A');
        formData.append('weight', patient.weight || 'N/A');
        formData.append('gender', patient.gender || 'N/A');
        formData.append('bloodGroup', patient.bloodGroup || 'N/A');

        try {
            const response = await fetch(`${API}/api/analyze/`, {
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

    const diagnosisColor = results && results.prediction.includes('Abnormal') ? '#ff4444' : '#00ff00';

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
                    <div className="section-title">Audio Input</div>
                    <div
                        className={`file-upload ${file ? 'selected' : ''}`}
                        onClick={() => fileRef.current.click()}
                    >
                        <input
                            ref={fileRef}
                            type="file"
                            accept=".wav"
                            style={{ display: 'none' }}
                            onChange={handleFile}
                        />
                        <svg viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                        </svg>
                        <div style={{ color: 'var(--text-secondary)' }}>Click to upload WAV file</div>
                        {file && <div className="file-name">{file.name}</div>}
                    </div>
                </div>

                <button className="btn" onClick={analyze} disabled={!file}>Analyze Recording</button>
            </div>

            {/* Results Panel */}
            <div className="results-panel">
                {/* Empty State - shown when no results */}
                <div className="empty-state" style={{ display: results ? 'none' : 'flex' }}>
                    <svg style={{ width: '48px', height: '48px', fill: '#333', marginBottom: '20px' }} viewBox="0 0 24 24">
                        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                    </svg>
                    <p>Upload a recording and click Analyze to see results</p>
                </div>

                {/* Results Content - shown when results available */}
                <div className="results-content" style={{ display: results ? 'flex' : 'none' }}>
                    {results && (
                        <>
                            {/* Report Header */}
                            <div className="report-header">
                                <div className="report-title">Heart Sound Analysis Report</div>
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

                            {/* Patient Grid */}
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
                            </div>

                            {/* Analysis Section */}
                            <div className="diagnosis-box">
                                <div className="analysis-section">
                                    <div>
                                        <div className="label">Diagnosis</div>
                                        <div className="diagnosis-value" style={{ color: diagnosisColor }}>{results.prediction}</div>
                                        <div className="diagnosis-sub">Confidence Score</div>
                                    </div>
                                    <div className="confidence-meter">
                                        <svg viewBox="0 0 36 36" className="circular-chart">
                                            <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                            <path
                                                ref={circleRef}
                                                className="circle"
                                                style={{ stroke: diagnosisColor }}
                                                strokeDasharray="0, 100"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <text x="18" y="20.35" className="percentage">{results.confidence}%</text>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Plot Container */}
                            <div className="plot-container">
                                <img className="screen-only" src={results.phonocardiogram} alt="Phonocardiogram" />
                                {results.phonocardiogram_light && (
                                    <img className="print-only" src={results.phonocardiogram_light} alt="Phonocardiogram (Print)" />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Loading Overlay */}
            <div className={`loading ${loading ? 'active' : ''}`}>
                <div className="spinner"></div>
                <div style={{ letterSpacing: '2px', fontSize: '0.9rem' }}>ANALYZING...</div>
            </div>
        </>
    );
}

export default NormalMode;
