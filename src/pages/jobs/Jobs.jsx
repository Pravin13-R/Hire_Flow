import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useJobs } from "../../context/JobContext";

const Jobs = () => {
    const navigate = useNavigate();

    const {
        jobs,
        loading,
        error,
        deleteJob,
        updateJob,
        updateJobStatus,
    } = useJobs();
    const [search, setSearch] = useState ("");
    const [department, setDepartment] = useState("All");
    const [status, setStatus] = useState("All");
    const [selectedJob, setSelectedJob] = useState(null);
    const [actionMode, setActionMode] = useState(null);
    const [editForm, setEditForm] = useState(null);

    const openJobDetails = (job) => {
        setSelectedJob(job);
        setActionMode('view');
    };

    const openJobEditor = (job) => {
        setSelectedJob(job);
        setEditForm({
            title: job.title,
            department: job.department,
            location: job.location,
            experience: job.experience,
            opening: String(job.opening),
            skills: job.skills,
            status: job.status,
            postedDate: job.postedDate,
        });
        setActionMode('edit');
    };

    const closeJobDialog = () => {
        setSelectedJob(null);
        setActionMode(null);
        setEditForm(null);
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditForm((currentForm) => ({ ...currentForm, [name]: value }));
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
        updateJob(selectedJob.id, {
            ...editForm,
            opening: Number(editForm.opening),
        });
        closeJobDialog();
    };

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.department.toLowerCase().includes(search.toLowerCase()) ||
            job.location.toLowerCase().includes(search.toLowerCase())

        const matchesDepartment = department === "All" || job.department === department
        const matchesStatus = status === "All" || job.status === status

        return matchesSearch && matchesDepartment && matchesStatus
    })

    const totalJobs = jobs.length
    const activeJobs = jobs.filter((job) => job.status === "Active").length
    const closedJobs = jobs.filter((job) => job.status === "Closed").length
    const totalOpenings = jobs.reduce((total, job) => total + job.opening, 0)

    if (loading) {
        return (
            <div className='container-fluid p-4'>
                <div className='text-center mt-5'>
                    <div className='spinner-border text-primary' role="status" />
                    <p className='mt-3 text-muted'>Loading Jobs...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='container-fluid p-4'>
                <div className='alert alert-danger'>{error}</div>
            </div>
        )
    }


  return (
    <div className='container-fluid p-4'>

        <div className='d-flex justify-content-between align-items-center mb-4'>
            <div>
                <h2 className='fw-bold mb-1'>Job Management</h2>
                <p className='text-muted mb-1'>Manage your job openings and hiring requirements</p>
            </div>

            <button className='btn btn-primary' onClick={() => navigate('/jobs/add')}>
                <i className='bi bi-plus-lg me-2'></i>
                Add Job

            </button>
        </div>

        {/* statics */}

        <div className='row g-4 mb-4'>
            {/* total jobs */}

            <div className='col-md-6 col-lg-3'>
                <div className='card border-0 shadow-sm h-100'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='fw-bold mb-0'>Total Jobs</p>
                                <h3 className='fw-bold mb-0'>{totalJobs}</h3>
                            </div>

                            <div className='bg-primary bg-opacity-10 rounded p-3'>
                                <i className='bi bi-briefcase-fill text-primary fs-4'></i>

                            </div>
                        </div>

                    </div>

                </div>

            </div>

            {/* active */}

            <div className='col-md-6 col-lg-3'>
                <div className='card border-0 shadow-sm h-100'>
                    <div className='card-body'>

                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='text-muted mb-2'>Active Jobs</p>
                                <h3 className='fw-bold mb-0'>{activeJobs}</h3>
                            </div>

                            <div className='bg-success bg-opacity-10 rounded p-3'>
                                <i className='bi bi-check-circle-fill text-sucess fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* closed jod */}

            <div className='col-md-6 col-lg-3'>
                <div className='card border-0 shadow-sm h-100'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='text-muted mb-2'>Closed Jobs</p>
                                <h3 className='fw-bold mb-0'>{closedJobs}</h3>
                            </div>
                            <div className='bg-danger bg-opacity-10 rounded p-3'>
                                <i className='bi bi-x-circle-fill text-danger fs-4'></i>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* total opening */}

            <div className='col-md-6 col-lg-3'>
                <div className='card border-0 shadow-sm h-100'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='text-muted mb-2'>Total Openings</p>
                                <h3 className='fw-bold mb-0'>{totalOpenings}</h3>
                            </div>

                            <div className='bg-warning bg-opacity-10 rounded p-3'>
                                <i className='bi bi-people-fill text-warning fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* search and filter */}

            <div className='card border-0 shadow-sm mb-4'>
                <div className='card-body'>
                    <div className='row g-3'>
                        {/* search */}

                        <div className='col-md-6'>
                            <div className='input-group'>
                                <span className='input-group-text bg-white'>
                                    <i className='bi bi-search'></i>

                                </span>
                                <input type="text"
                                className='form-control' 
                                placeholder='Search jobs...'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}/>

                            </div>

                        </div>

                        {/* dept */}

                        <div className='col-md-3'>
                            <select className='form-select'
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}>

                                <option value="All">All</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Design">Design</option>
                                <option value="Technology">Technology</option>
                                <option value="Human Resources">Human Resources</option>
                                <option value="Analytics">Analytics</option>
                                <option value="Quality Assurance">Quality Assurance</option>
                            </select>

                        </div>

                        {/* status */}

                       <div className='col-md-3'>
                         <select className='form-select' value={status} onChange={(e) => setStatus(e.target.value)}>

                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Closed">Closed</option>
                         </select>
                       </div>

                    </div>

                </div>

            </div>

            {/* job */}

            <div className='card border-0 shadow-sm'>
                <div className='card-body p-0'>
                    <div className='table-responsive'>
                        <table className='table table-hover align-middle mb-0'>
                            <thead className='table-light'>
                                <tr>
                                    <th className='px-4 py-3'>Job

                                    </th>
                                    <th>Department</th>
                                    <th>Location</th>
                                    <th>Experience</th>
                                    <th>Openings</th>
                                    <th>Status</th>
                                    <th>Posted</th>
                                    <th>Action</th>
                                </tr>

                            </thead>

                            <tbody>
                                {filteredJobs.length > 0 ? (
                                    filteredJobs.map((job) => (
                                        <tr key={job.id}>
                                            <td className='px-4'>
                                                <div className='d-flex align-items-center'>
                                                    <div className='bg-primary bg-opacity-10 rounded p-2 me-3'>
                                                        <i className='bi bi-briefcase text-primary'></i>

                                                    </div>
                                                    <div>
                                                        <h6 className='mb-1 fw-semibold'>
                                                            {job.title}

                                                        </h6>
                                                        <small className='text-muted'>
                                                            {job.skills}

                                                        </small>

                                                    </div>

                                                </div>

                                            </td>

                                            <td>{job.department}</td>
                                            <td>
                                                <i className='bi bi-geo-alt me-1 text-muted'></i>
                                                {job.location}
                                            </td>
                                            <td>
                                                {job.experience}
                                            </td>
                                            <td>
                                                <span className='fw-semibold'>{job.opening}</span>
                                            </td>
                                            <td>
                                                <span className={`badge ${job.status === "Active"
                                                    ? "bg-success-subtle text-success"
                                                    : "bg-danger-subtle text-danger"
                                                }`}>{job.status}</span>
                                            </td>

                                            <td>
                                                <small className='text-muted'>{job.postedDate}</small>
                                            </td>

                                            <td>
                                                <div className='d-flex flex-wrap gap-1'>
                                                    <button
                                                        type='button'
                                                        className='btn btn-sm btn-outline-primary'
                                                        aria-label={`View ${job.title}`}
                                                        onClick={() => openJobDetails(job)}
                                                    >
                                                        <i className='bi bi-eye me-1'></i>View
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className='btn btn-sm btn-outline-secondary'
                                                        aria-label={`Edit ${job.title}`}
                                                        onClick={() => openJobEditor(job)}
                                                    >
                                                        <i className='bi bi-pencil me-1'></i>Edit
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className='btn btn-sm btn-light'
                                                        aria-label={`${job.status === "Active" ? "Close" : "Reopen"} ${job.title}`}
                                                        onClick={() => updateJobStatus(
                                                            job.id,
                                                            job.status === "Active" ? "Closed" : "Active"
                                                        )}
                                                    >
                                                        <i className='bi bi-arrow-repeat'></i>
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className='btn btn-sm btn-outline-danger'
                                                        aria-label={`Delete ${job.title}`}
                                                        onClick={() => {
                                                            if (window.confirm(`Delete "${job.title}"?`)) {
                                                                deleteJob(job.id);
                                                            }
                                                        }}
                                                    >
                                                        <i className='bi bi-trash'></i>
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr >
                                        <td colSpan= "8" className='text-center py-5'>
                                            <i className='bi bi-search fs-1 text-muted'></i>
                                            <h5 className='mt-3'>No jobs found</h5>
                                            <p className='text-muted mb-0'>Try changing your search or filter.

                                            </p>

                                        </td>

                                    </tr>
                                )
                            }
                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

        {selectedJob && (
            <>
                <div className="modal-backdrop fade show"></div>
                <div
                    className="modal d-block"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="job-dialog-title"
                    tabIndex="-1"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="job-dialog-title">
                                    {actionMode === 'edit' ? 'Edit Job' : selectedJob.title}
                                </h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeJobDialog}></button>
                            </div>
                            {actionMode === 'edit' ? (
                                <form onSubmit={handleEditSubmit}>
                                    <div className="modal-body">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="edit-job-title">Job title</label>
                                                <input id="edit-job-title" className="form-control" name="title" value={editForm.title} onChange={handleEditChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="edit-job-department">Department</label>
                                                <input id="edit-job-department" className="form-control" name="department" value={editForm.department} onChange={handleEditChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="edit-job-location">Location</label>
                                                <input id="edit-job-location" className="form-control" name="location" value={editForm.location} onChange={handleEditChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="edit-job-experience">Experience</label>
                                                <input id="edit-job-experience" className="form-control" name="experience" value={editForm.experience} onChange={handleEditChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="edit-job-openings">Openings</label>
                                                <input id="edit-job-openings" className="form-control" type="number" name="opening" min="1" step="1" value={editForm.opening} onChange={handleEditChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="edit-job-status">Status</label>
                                                <select id="edit-job-status" className="form-select" name="status" value={editForm.status} onChange={handleEditChange}>
                                                    <option value="Active">Active</option>
                                                    <option value="Closed">Closed</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="edit-job-skills">Skills</label>
                                                <input id="edit-job-skills" className="form-control" name="skills" value={editForm.skills} onChange={handleEditChange} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="edit-job-posted-date">Posted date</label>
                                                <input id="edit-job-posted-date" className="form-control" type="date" name="postedDate" value={editForm.postedDate} onChange={handleEditChange} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-secondary" onClick={closeJobDialog}>Cancel</button>
                                        <button type="submit" className="btn btn-primary">Save Changes</button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className="modal-body">
                                        <dl className="row mb-0">
                                            <dt className="col-sm-4">Department</dt><dd className="col-sm-8">{selectedJob.department}</dd>
                                            <dt className="col-sm-4">Location</dt><dd className="col-sm-8">{selectedJob.location}</dd>
                                            <dt className="col-sm-4">Experience</dt><dd className="col-sm-8">{selectedJob.experience}</dd>
                                            <dt className="col-sm-4">Openings</dt><dd className="col-sm-8">{selectedJob.opening}</dd>
                                            <dt className="col-sm-4">Status</dt><dd className="col-sm-8">{selectedJob.status}</dd>
                                            <dt className="col-sm-4">Skills</dt><dd className="col-sm-8">{selectedJob.skills}</dd>
                                            <dt className="col-sm-4">Posted</dt><dd className="col-sm-8">{selectedJob.postedDate}</dd>
                                        </dl>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-secondary" onClick={closeJobDialog}>Close</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )}

    </div>
  );
}

export default Jobs