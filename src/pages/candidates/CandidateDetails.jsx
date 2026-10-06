import { useNavigate,useParams } from 'react-router-dom'
import { useCandidates } from "../../context/CandidateContext"

const CandidateDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const {candidates, loading, deleteCandidate} = useCandidates();

    const candidate = candidates.find(
        (item) => String(item.id) === String(id)
    );

    if(loading) {
        return (
            <div className='container-fluid py-4'>
                <div className='text-center py-5'>
                    <div className='spinner-border text-primary'></div>
                    <p className='text-muted mt-3'>Loading candidate...</p>

                </div>

            </div>
        )
    }

    if (!candidate) {

        return (
            <div className='container-fluid py-5 text-center'>
            <i className='bi bi-person-x fs-1 text-muted'></i>
            <h4 className='mt-3'>Candiadte Not Found</h4>

            <p className='text-muted'>The candidate you're looking for does not exist.</p>

            <button className='btn btn-primary' onClick={() => navigate("/candidates")}>
                <i className='bi bi-arrow-left me-2'></i>
                Back to Candidates

            </button>

        </div>
        );
    }

    const initials = candidate.name.split( " " )
    .map((word) => word.charAt(0))
    .join("")
    .slice(0,2)
    .toUpperCase();

    const handleDelete = () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${candidate.name}?`
        );

        if (!confirmDelete) return;

        deleteCandidate(candidate.id);
        navigate("/candidates");

    };



  return (
    <div className='container-fluid py-4'>

        <div className='d-flex justify-content-between align-items-center mb-4'>
            <div>
                <button className='btn btn-outline-secondary btn-sm mb-3' onClick={() => navigate("/candidates")}>
                    <i className='bi bi-arrow-left me-2'></i>
                    Back to Candidates

                </button>

                <h3 className='fw-bold mb-1'>
                    Candidate Details

                </h3>
                <p className='text-muted mb-0'>View candidate information and recruitment status.</p>
            </div>

            <div className='d-flex gap-2'>
                <button className='btn btn-outline-primary' onClick={() => navigate(`/candidates/edit/${candidate.id}`)}>
                    <i className='bi bi-pencil me-2'></i>
                    Edit
                </button>

                 <button
            className="btn btn-outline-danger"
            onClick={handleDelete}
          >
            <i className="bi bi-trash me-2"></i>
            Delete
          </button>

            </div>

        </div>


        <div className='row g-4'>

            {/* profile card */}
            <div  className='col-lg-4'>
                <div className='card border-0 shadow-sm'>
                    <div className='card-body text-center p-4'>
                        <div className='candidate-details-avatar mx-auto mb-3'>
                            {initials}
                        </div>
                        <h4 className='fw-bold mb-1'>{candidate.name}</h4>
                        <p className='text-muted mb-3'>{candidate.position}</p>

                        <span className={`badge ${
                            candidate.status === "Hired"
                            ? "bg-success"
                            : candidate.status === "Rejected"
                            ? "bg-danger"
                            : "bg-primary"
                        } px-3 py-2`}>
                            {candidate.status}

                        </span>
                        <hr />

                        <div className='text-start'>
                            <div className='mb-3'>
                                <small className='text-muted d-block'>
                                    Email
                                </small>

                                <span>{candidate.email}</span>

                            </div>

                            <div className='mb-3'>
                                <small className='text-muted d-block'>Phone</small>

                                <span>{candidate.phone}</span>

                            </div>

                            <div className='mb-3'>
                                <small className='text-muted d-block'>Location</small>

                                <span>{candidate.location}</span>

                            </div>

                            <div>
                                <small className='text-muted d-block'>Applied Date</small>

                                <span>{candidate.appliedDate}</span>

                            </div>

                        </div>

                    </div>

                </div>
                
            </div>

            {/* information */}

            <div className='col-lg-8'>
                <div className='card border-0 shadow-sm mb-4'>
                    <div className='card-body p-4'>
                        <h5 className='fw-bold mb-4'>
                            <i className='bi bi-briefcase me-2 text-primary'></i>
                            Professional Information
                        </h5>

                        <div className='row g-4'>
                            <div className='col-md-6'>
                                <small className='text-muted d-block mb-1'>
                                    Position

                                </small>
                                <h6 className='fw-semibold'>{candidate.position}</h6>

                            </div>

                            <div className='col-md-6'>
                                <small className='text-muted d-block mb-1'>Experience

                                </small>
                                <h6 className='fw-semibold'>{candidate.experience}</h6>

                            </div>

                            <div className='col-md-6'>
                                <small className='text-muted d-block mb-1'>
                                    Current Status
                                </small>

                                <span className='badge bg-primary'>{candidate.status}</span>

                            </div>

                            <div className='col-md-6'>
                                <small className='text-muted d-block mb-1'>Applied Date</small>
                                <h6 className='fw-semibold'>{candidate.appliedDate}</h6>

                            </div>

                        </div>

                    </div>

                </div>

                {/* skill */}

                <div className='card border-0 shadow-sm mb-4'>
                    <div className='card-body p-4'>
                        <h5 className='fw-bold mb-3'>
                            <i className='bi bi-satrs me-2 text-warning'></i>
                            Skills

                        </h5>

                        <div className='d-flex flex-wrap gap-2'>

                            {candidate.skills?.map(
                                (skill, index) => (
                                    <span className='badge bg-light text-dark border px-3 py-2' key={index}>{skill}</span>
                                )
                            )}

                        </div>

                    </div>

                </div>

                {/* timeline */}

                <div className='card border-0 shadow-sm'>
                    <div className='card-body p-4'>
                        <h5 className='fw-bold mb-4'>
                            <i className='bi bi-clock-history me-2 text-success'></i>
                            Recruitment Timeline

                        </h5>
                        <div className='candidate-timeline'>
                            <div className='timeline-item'>
                                <div>
                                    <h6 className='mb-1'>Application Received</h6>

                                    <small className='text-muted'>{candidate.appliedDate}</small>
                                </div>

                            </div>

                            <div className='timeline-item'>
                                <div className='timeline-dot bg-warning'>

                                </div>
                                <div className='timeline-item'>
                                    <div className='timeline-dot bg-warning'></div>
                                    <div>
                                        <h6 className='mb-1'>
                                            Current Stage
                                        </h6>
                                        <small className='text-muted'>Candidate is currently in{ " " }
                                        <strong>{candidate.status}</strong>{ " " }
                                        stage.
                                        </small>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    </div>
  )
}

export default CandidateDetails