import React, { useEffect, useState } from 'react'

const Settings = () => {

    const defaultSettings = {
        fullName: 'Pravin R',
        email: 'pravin@example.com',
        company: 'HireFlow',
        role: 'HR Manager',
        emailNotifications: true,
        interviewReminders: true,
        candidateUpdates: true,
        jobNotifications: false,
        compactMode: false,
        darkMode: false,
    };

    const [settings, setSettings] = useState(defaultSettings);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const storedSettings = localStorage.getItem('hireflow_settings');

        if (storedSettings) {
            try {
                const parsedSettings = JSON.parse(storedSettings);
                setSettings({ ...defaultSettings, ...parsedSettings });
            } catch (error) {
                console.error('Failed to parse saved settings:', error);
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setSettings((previousSettings) => ({
            ...previousSettings,
            [name]: type === 'checkbox' ? checked : value,
        }));

        setSaved(false);
    };

    const handleSave = (e) => {
        e.preventDefault();

        localStorage.setItem('hireflow_settings', JSON.stringify(settings));
        setSaved(true);

        window.setTimeout(() => {
            setSaved(false);
        }, 3000);
    };

    const handleReset = () => {
        const resetSettings = { ...defaultSettings };

        setSettings(resetSettings);
        localStorage.setItem('hireflow_settings', JSON.stringify(resetSettings));
        setSaved(false);
    };




    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="fw-bold mb-1">Settings</h3>
                    <p className="mb-0">Manage your HireFlow account and preferences</p>
                </div>

                {saved && (
                    <div className="alert alert-success mb-0 py-2">
                        <i className="bi bi-check-circle me-2"></i>
                        Settings saved successfully
                    </div>
                )}
            </div>

            <form onSubmit={handleSave}>
                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-1">
                                    <i className="bi bi-person-circle me-2 text-primary"></i>
                                    Profile Settings
                                </h5>
                                <p className="text-muted small mb-4">
                                    Update your personal and company information.
                                </p>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fullName"
                                            value={settings.fullName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={settings.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Company</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="company"
                                            value={settings.company}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Role</label>
                                        <select
                                            className="form-select"
                                            name="role"
                                            value={settings.role}
                                            onChange={handleChange}
                                        >
                                            <option value="HR Manager">HR Manager</option>
                                            <option value="Recruiter">Recruiter</option>
                                            <option value="HR Executive">HR Executive</option>
                                            <option value="Hiring Manager">Hiring Manager</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-1">
                                    <i className="bi bi-bell me-2 text-warning"></i>
                                    Notifications
                                </h5>
                                <p className="text-muted small mb-4">
                                    Choose which notifications you want to receive.
                                </p>

                                <div className="d-flex justify-content-between align-items-center py-2">
                                    <div>
                                        <h6 className="mb-1">Email Notifications</h6>
                                        <small className="text-muted">
                                            Receive important HireFlow updates by email.
                                        </small>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input
                                            type="checkbox"
                                            name="emailNotifications"
                                            className="form-check-input"
                                            checked={settings.emailNotifications}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center py-2">
                                    <div>
                                        <h6 className="mb-1">Interview Reminders</h6>
                                        <small className="text-muted">
                                            Get reminders about upcoming interviews.
                                        </small>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input
                                            type="checkbox"
                                            name="interviewReminders"
                                            className="form-check-input"
                                            checked={settings.interviewReminders}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center py-2">
                                    <div>
                                        <h6 className="mb-1">Candidate Updates</h6>
                                        <small className="text-muted">
                                            Receive updates when candidate status changes.
                                        </small>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input
                                            type="checkbox"
                                            name="candidateUpdates"
                                            className="form-check-input"
                                            checked={settings.candidateUpdates}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center py-2">
                                    <div>
                                        <h6 className="mb-1">Job Notifications</h6>
                                        <small className="text-muted">
                                            Receive notifications about job openings.
                                        </small>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input
                                            type="checkbox"
                                            name="jobNotifications"
                                            className="form-check-input"
                                            checked={settings.jobNotifications}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-1">
                                    <i className="bi bi-palette me-2 text-success"></i>
                                    Appearance
                                </h5>
                                <p className="text-muted small mb-4">
                                    Customize your HireFlow interface.
                                </p>

                                <div className="d-flex justify-content-between align-items-center py-2">
                                    <div>
                                        <h6 className="mb-1">Compact Mode</h6>
                                        <small className="text-muted">
                                            Reduce spacing between interface elements.
                                        </small>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input
                                            type="checkbox"
                                            name="compactMode"
                                            className="form-check-input"
                                            checked={settings.compactMode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center py-2">
                                    <div>
                                        <h6 className="mb-1">Dark Mode</h6>
                                        <small className="text-muted">
                                            Enable dark interface mode.
                                        </small>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input
                                            type="checkbox"
                                            name="darkMode"
                                            className="form-check-input"
                                            checked={settings.darkMode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <div className="settings-profile-avatar mx-auto mb-3 d-flex align-items-center justify-content-center bg-primary text-white fw-bold rounded-circle">
                                        {settings.fullName ? settings.fullName.trim().charAt(0).toUpperCase() : 'H'}
                                    </div>
                                    <h5 className="fw-bold mb-1">{settings.fullName}</h5>
                                    <p className="text-muted mb-1">{settings.role}</p>
                                    <small className="text-muted">{settings.email}</small>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h6 className="fw-bold mb-3">Account Actions</h6>

                                <button className="btn btn-primary w-100 mb-2" type="submit">
                                    <i className="bi bi-check-lg me-2"></i>
                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary w-100"
                                    onClick={handleReset}
                                >
                                    <i className="bi bi-arrow-counterclockwise me-2"></i>
                                    Reset Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Settings;