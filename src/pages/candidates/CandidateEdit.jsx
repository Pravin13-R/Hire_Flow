import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCandidates } from '../../context/CandidateContext'

function CandidateEditForm({ candidate, onCancel, onSave }) {
    const [form, setForm] = useState({
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        position: candidate.position,
        experience: candidate.experience,
        location: candidate.location,
        skills: candidate.skills.join(', '),
        status: candidate.status,
        appliedDate: candidate.appliedDate,
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((currentForm) => ({ ...currentForm, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSave({
            ...form,
            skills: form.skills.split(',').map((skill) => skill.trim()).filter(Boolean),
        })
    }

    return (
        <div className="container-fluid py-4">
            <div className="mb-4">
                <button className="btn btn-outline-secondary btn-sm mb-3" onClick={onCancel}>
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Candidate
                </button>
                <h3 className="fw-bold mb-1">Edit Candidate</h3>
                <p className="text-muted mb-0">Update candidate information.</p>
            </div>

            <form className="card border-0 shadow-sm" onSubmit={handleSubmit}>
                <div className="card-body p-4">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="candidate-name">Name</label>
                            <input id="candidate-name" className="form-control" name="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="candidate-email">Email</label>
                            <input id="candidate-email" className="form-control" type="email" name="email" value={form.email} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="candidate-phone">Phone</label>
                            <input id="candidate-phone" className="form-control" name="phone" value={form.phone} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="candidate-position">Position</label>
                            <input id="candidate-position" className="form-control" name="position" value={form.position} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="candidate-experience">Experience</label>
                            <input id="candidate-experience" className="form-control" name="experience" value={form.experience} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="candidate-location">Location</label>
                            <input id="candidate-location" className="form-control" name="location" value={form.location} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="candidate-skills">Skills</label>
                            <input id="candidate-skills" className="form-control" name="skills" value={form.skills} onChange={handleChange} />
                            <div className="form-text">Separate skills with commas.</div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="candidate-status">Status</label>
                            <select id="candidate-status" className="form-select" name="status" value={form.status} onChange={handleChange}>
                                {['Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected'].map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="candidate-applied-date">Applied date</label>
                            <input id="candidate-applied-date" className="form-control" type="date" name="appliedDate" value={form.appliedDate} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default function CandidateEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { candidates, loading, error, updateCandidate } = useCandidates()
    const candidate = candidates.find((item) => String(item.id) === String(id))

    if (loading) {
        return (
            <div className="container-fluid py-4 text-center">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="text-muted mt-3">Loading candidate...</p>
            </div>
        )
    }

    if (error) {
        return <div className="container-fluid py-4"><div className="alert alert-danger">{error}</div></div>
    }

    if (!candidate) {
        return (
            <div className="container-fluid py-5 text-center">
                <h4 className="mt-3">Candidate Not Found</h4>
                <p className="text-muted">The candidate you are trying to edit does not exist.</p>
                <button className="btn btn-primary" onClick={() => navigate('/candidates')}>Back to Candidates</button>
            </div>
        )
    }

    const candidatePath = `/candidates/${candidate.id}`

    return (
        <CandidateEditForm
            key={candidate.id}
            candidate={candidate}
            onCancel={() => navigate(candidatePath)}
            onSave={(updatedCandidate) => {
                updateCandidate(candidate.id, updatedCandidate)
                navigate(candidatePath)
            }}
        />
    )
}
