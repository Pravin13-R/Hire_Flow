import { useState } from 'react'
import { useJobs } from "../../context/JobContext";

const Jobs = () => {

    const {
        jobs,
        loading,
        error,
        deleteJob,
        updateJobStatus,
    } = useJobs();
    const [search, setSearch] = useState ("");
    const [department, setDepartment] = useState("All");
    const [status, setStatus] = useState("All");

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

            <button className='btn btn-primary'>
                <i className='bi bi-plus-lg me-2'></i>
                Add Jobs

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
                                                <div className='dropdown'>
                                                    <button className='btn btn-light btn-sm'
                                                    data-bs-toggle= "dropdown">
                                                        <i className='bi bi-three-dots-vertical'></i>
                                                    </button>
                                                    <ul className='dropdown-menu'>
                                                        <li>
                                                            <button className='dropdown-item'>
                                                                <i className='bi bi-eye me-2'></i>View
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className='dropdown-item'
                                                                onClick={() => updateJobStatus(
                                                                    job.id,
                                                                    job.status === "Active" ? "Closed" : "Active"
                                                                )}
                                                            >
                                                                <i className='bi bi-arrow-repeat me-2'></i>
                                                                {job.status === "Active" ? "Close job" : "Reopen job"}
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button className='dropdown-item'>
                                                                <i className='bi bi-pencil me-2'></i>Edit
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <hr className='dropdown-divider'/>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className='dropdown-item text-danger'
                                                                onClick={() => {
                                                                    if (window.confirm(`Delete "${job.title}"?`)) {
                                                                        deleteJob(job.id);
                                                                    }
                                                                }}
                                                            >
                                                                <i className='bi bi-trash me-2'></i>
                                                                Delete

                                                            </button>
                                                        </li>

                                                    </ul>

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

    </div>
  );
}

export default Jobs