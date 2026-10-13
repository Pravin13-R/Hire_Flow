import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCandidates } from '../../context/CandidateContext';

const Candidates = () => {
    const navigate = useNavigate();

    const {
        candidates,
        loading,
        error,
        deleteCandidate,
    } = useCandidates();

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");
    const [positionFilter, setPositionFilter] = useState("All");

    const filteredCandidates = candidates.filter((candidate) =>{
        const searchValue = search.trim().toLowerCase();

        const matchesSearch = 
        candidate.name.toLowerCase().includes(searchValue) ||
        candidate.email.toLowerCase().includes(searchValue) ||
        candidate.position.toLowerCase().includes(searchValue) ;

        const matchesStatus = 
        statusFilter === "All" ||
        candidate.status === statusFilter;

        const matchesPosition =
        positionFilter === "All" ||
        candidate.position === positionFilter;

        return(
            matchesSearch &&
            matchesStatus &&
            matchesPosition
        );

    });


    const totalCandidates = candidates.length;

    const activeCandidates = candidates.filter(
        (candidate) => 
        candidate.status !== "Hired" &&
        candidate.status !== "Rejected"
    ).length;

    const shortlistedCandidates = candidates.filter(
        (candidate) => candidate.status === "Shortlisted"
    ).length;

    const hiredCandidates = candidates.filter(
        (candidate) => candidate.status === "Hired"
    ).length;

    const handleReset = () => {
        setSearch ("");
        setStatusFilter("All");
        setPositionFilter("All");
    };

    if(loading){
        return (
            <div className='container-fluid py-5 text-center'>
                <div className='spinner-border text-primary'></div>
                <p className='mt-3 text-muted'>Loading candidates...</p>

            </div>
        );
    }


    if (error) {
        return (
            <div className='container-fluid py-4'>
                <div className='alert alert-danger'>
                    <i className='bi bi-exclamation-triangle me-2'></i>
                    {error}
                </div>
            </div>
        );
    }


  return (
    <div className='container-fluid py-4'>

        <div className='d-flex justify-content-between align-items-center mb-4'>

            <div>
                <h2 className='fw-bold mb-1'>Candidates</h2>
                <p className='text-muted mb-0'>Manage and track your candidates</p>
            </div>

            <div className='d-flex gap-2'>
                {/* <button
                    className='btn btn-outline-secondary'
                    onClick={() => {
                        if (window.confirm("Restore the original sample candidates? This replaces the current candidate list.")) {
                            restoreCandidates();
                        }
                    }}
                >
                    <i className='bi bi-arrow-counterclockwise me-2'></i>
                    Restore Sample Candidates
                </button> */}
                <button className='btn btn-primary' onClick={() => navigate('/candidates/add')}>
                    <i className='bi bi-person-plus me-2'></i>
                    Add Candidate
                </button>
            </div>

        </div>


        <div className='row g-4 mb-4'>

            <div className='col-12 col-sm-6 col-xl-3'>
                <div className='card border-0 shadow-sm h-100'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>

                            <div>
                                <p className='text-muted mb-2'>Total Candidates</p>
                                <h3 className='fw-bold mb-0'>{totalCandidates}</h3>
                            </div>

                            <div className='bg-primary bg-opacity-10 rounded-3 p-3'>
                                <i className='bi bi-people-fill text-primary fs-3'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            <div className='col-12 col-sm-6 col-xl-3'>

                <div className='card border-0 shadow-sm h-100'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>

                            <div>
                                <p className='text-muted mb-2'>Active Candidates</p>
                                <h3 className='fw-bold mb-0'>{activeCandidates}</h3>
                            </div>

                            <div className='bg-success bg-opacity-10 rounded-3 p-3'>
                                <i className='bi bi-person-check-fill text-success fs-3'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            <div className='col-12 col-sm-6 col-xl-3'>

                <div className='card border-0 shadow-sm h-100'>

                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>

                            <div>
                                <p className='text-muted mb-2'>Shortlisted</p>

                                <h3 className='fw-bold mb-0'>{shortlistedCandidates}</h3>
                            </div>

                            <div className='bg-warning bg-opacity-10 rounded-3 p-3'>
                                <i className='bi bi-star-fill text-warning fs-3'></i>

                            </div>
                            
                        </div>

                    </div>

                </div>

            </div>



            <div className='col-12 col-sm-6 col-xl-3'>
                <div className='card border-0 shadow-sm h-100'>
                    <div className='card-body'>

                        <div className='d-flex justify-content-between align-items-center'>

                            <div>
                                <p className='text-muted mb-2'>Hired</p>

                                <h3 className='fw-bold mb-0'>{hiredCandidates}</h3>
                            </div>

                            <div className='bg-info bg-opacity-10 rounded-3 p-3'>
                                <i className='bi bi-trophy-fill text-info fs-3'></i>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>






        <div className='card border-0 shadow-sm mb-4'>
            <div className='card-body'>
                <div className='row g-3 align-items-end'>

                    <div className='col-12 col-lg-5'>
                        <label className='form-lable fw-semibold'>Search Candidates</label>
                        <div className='input-group'>
                            <span className='input-group-text bg-white'>
                                <i className='bi bi-search'></i>

                            </span>
                            <input type="text" className='form-control' placeholder='Search by name, email or Position......'
                            value={search} onChange={(e) => setSearch(e.target.value)} />

                        </div>

                    </div>


                    <div className='col-12 col-md-4 col-lg-2'>
                        <label className='form-lable fw-semibold'>Status</label>

                        <select className='form-select' value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="All">All Status</option>
                        <option value="Applied">Applied</option>
                        <option value="Screening">Screening</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Hired">Hired</option>
                        </select>
                        

                    </div>


                    <div className='col-12 col-md-4 col-lg-3'>
                        <label className='form-lable fw-semibold'>Position</label>

                        <select className='form-select' value={positionFilter}
                        onChange={(e) => setPositionFilter(e.target.value)}>

                            <option value="All">All Position</option>
                            <option value="React Developer">React Developer</option>
                            <option value="UI/UX Developer">UI/UX Developer</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Full Stack Developer">Full Stack Developer</option>
                        </select>

                    </div>


                    <div className='col-12 col-md-4 col-lg-2'>
                        <button className='btn btn-outline-secondary w-100' onClick={handleReset}>
                            <i className='bi bi-arrow-counterclockwise me-2'></i>
                            Reset
                        </button>

                    </div>

                </div>

            </div>


        </div>


        <div className='card border-0 shadow-sm'>
            <div className='card-body'>
                <div className='d-flex justify-content-between align-items-center mb-3'>

                    <div>
                        <h5 className='fw-bold mb-1'>Candidates</h5>
                        <small className='text-muted'>Showing {filteredCandidates.length} of {""}
                            {totalCandidates} candidates
                        </small>
                    </div>
                    <button className='btn btn-light border'>
                        <i className='bi bi-funnel me-2'></i>
                        Filter

                    </button>

                </div>


                <div className='table-responsive'>
                    <table className='table align-middle'>
                        <thead>
                            <tr className='text-muted'>
                                <th>Candidate</th>
                                <th>Position</th>
                                <th>Experience</th>
                                <th>Status</th>
                                <th>Applied Date</th>
                                <th className='text-end'>Actions</th> 

                            </tr>
                        </thead>

                        <tbody>
                            {filteredCandidates.length > 0 ? (
                                filteredCandidates.map((candidate) => (
                                    <tr key={candidate.id}>

                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <div
                                                className='bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold me-3'
                                                style={{
                                                    width : "45px",
                                                    height : "45px",
                                                }}>
                                                    {candidate.name.charAt(0)}

                                                </div>
                                                <div>
                                                    <div className='fw-semibold text-dark'>{candidate.name}</div>
                                                    <small className='text-muted'>{candidate.email}</small>
                                                </div>

                                            </div>
                                        </td>

                                        {/* position */}

                                        <td>{candidate.position}</td>
                                        {/* exp */}
                                        <td>{candidate.experience}</td>
                                        {/* status */}

                                        <td>
                                            <span className={`badge ${getStatusClass(candidate.status)}`}>
                                                {candidate.status}

                                            </span>
                                        </td>

                                        {/* date */}

                                        <td className='text-muted'>
                                            {candidate.appliedDate}
                                        </td>

                                        {/* action */}
                                        <td>
                                            <div className='d-flex justify-content-end gap-2'>

                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => navigate(`/candidates/${candidate.id}`)}
                                                >
                                                    <i className="bi bi-eye me-1"></i>
                                                    View
                                                </button>

                                                <button
                                                    className='btn btn-sm btn-light'
                                                    title='Edit'
                                                    onClick={() => navigate(`/candidates/edit/${candidate.id}`)}
                                                >
                                                    <i className='bi bi-pencil'></i>
                                                </button>

                                                <button
                                                    className='btn btn-sm btn-light text-danger'
                                                    title='Delete'
                                                    onClick={() => {
                                                        if (window.confirm(`Delete ${candidate.name}?`)) {
                                                            deleteCandidate(candidate.id);
                                                        }
                                                    }}
                                                >
                                                    <i className='bi bi-trash'></i>
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                )
                            )
                                
                            ) : (
                                <tr>

                                    <td colSpan="6" className='text-center py-5'>
                                        <i className='bi bi-person-x fs-1 text-muted'></i>
                                        <h5 className='mt-3'>No candidates found</h5>
                                        <p className='text-muted'>Try changing your search or filter.</p>
                                        <button className='btn btn-outline-primary' onClick={handleReset}>Reset Filter</button>
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
  )
}

function getStatusClass(status){
    switch (status){
        case "Applied" : 
        return "bg-primary bg-opacity-10 text-primary"

        case "Screening" : 
        return "bg-warning bg-opacity-10 text-warning"

         case "Shortlisted":
      return "bg-success bg-opacity-10 text-success";

    case "Interview":
      return "bg-info bg-opacity-10 text-info";

    case "Offer":
            return "bg-warning-subtle text-warning-emphasis";

    case "Hired":
      return "bg-success bg-opacity-10 text-success";

    default:
      return "bg-secondary";
    }
}

export default Candidates