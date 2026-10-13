import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useJobs } from '../../context/JobContext'

const AddJob = () => {
    const navigate = useNavigate()
    const { addJob } = useJobs()
    const [form, setForm] = useState({
        title: '',
        department: '',
        location: '',
        experience: '',
        opening: '1',
        skills: '',
        status: 'Active',
        postedDate: new Date().toISOString().slice(0, 10),
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((currentForm) => ({ ...currentForm, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addJob({ ...form, opening: Number(form.opening) })
        navigate('/jobs')
    }

    return (
        <div className="container-fluid p-4">
            <div className="mb-4">
                <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm mb-3"
                    onClick={() => navigate('/jobs')}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Jobs
                </button>
                <h2 className="fw-bold mb-1">Add Job</h2>
                <p className="text-muted mb-0">Create a new job opening.</p>
            </div>

            <form className="card border-0 shadow-sm" onSubmit={handleSubmit}>
                <div className="card-body p-4">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="job-title">Job title</label>
                            <input
                                id="job-title"
                                className="form-control"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="job-department">Department</label>
                            <select
                                id="job-department"
                                className="form-select"
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select a department</option>
                                {['Engineering', 'Design', 'Technology', 'Human Resources', 'Analytics', 'Quality Assurance'].map((department) => (
                                    <option key={department} value={department}>{department}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="job-location">Location</label>
                            <input
                                id="job-location"
                                className="form-control"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="job-experience">Experience</label>
                            <input
                                id="job-experience"
                                className="form-control"
                                name="experience"
                                placeholder="e.g. 2-4 Years"
                                value={form.experience}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="job-openings">Openings</label>
                            <input
                                id="job-openings"
                                className="form-control"
                                type="number"
                                name="opening"
                                min="1"
                                step="1"
                                value={form.opening}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="job-status">Status</label>
                            <select
                                id="job-status"
                                className="form-select"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <option value="Active">Active</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="job-skills">Skills</label>
                            <input
                                id="job-skills"
                                className="form-control"
                                name="skills"
                                placeholder="e.g. React, JavaScript, CSS"
                                value={form.skills}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="job-posted-date">Posted date</label>
                            <input
                                id="job-posted-date"
                                className="form-control"
                                type="date"
                                name="postedDate"
                                value={form.postedDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/jobs')}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">Create Job</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddJob
