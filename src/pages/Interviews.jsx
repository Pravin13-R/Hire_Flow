import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InterviewCard from '../components/interview/InterviewCard'
import { useInterviews } from "../context/InterviewContext";
import { useCandidates } from "../context/CandidateContext";

const Interviews = () => {
    const navigate = useNavigate();
    const {
        interviews,
        loading,
        error,
        addInterview,
        deleteInterview,
        updateInterviewStatus
    } = useInterviews();
    const {
        candidates,
        loading: candidatesLoading,
        error: candidatesError,
    } = useCandidates();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");
    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [scheduleError, setScheduleError] = useState("");
    const [scheduleForm, setScheduleForm] = useState({
        candidateId: "",
        interviewer: "",
        date: new Date().toISOString().slice(0, 10),
        time: "",
        type: "Online",
    });

    const handleScheduleChange = (event) => {
        const { name, value } = event.target;
        setScheduleForm((currentForm) => ({ ...currentForm, [name]: value }));
        setScheduleError("");
    };

    const handleScheduleSubmit = (event) => {
        event.preventDefault();
        const candidate = candidates.find(
            (item) => String(item.id) === scheduleForm.candidateId
        );

        if (!candidate) {
            setScheduleError("Select an available candidate before scheduling.");
            return;
        }

        addInterview({
            candidateId: candidate.id,
            candidate: candidate.name,
            position: candidate.position,
            interviewer: scheduleForm.interviewer.trim(),
            date: scheduleForm.date,
            time: scheduleForm.time,
            type: scheduleForm.type,
            status: "Scheduled",
        });
        setShowScheduleForm(false);
        setScheduleError("");
        setScheduleForm({
            candidateId: "",
            interviewer: "",
            date: new Date().toISOString().slice(0, 10),
            time: "",
            type: "Online",
        });
    };

    const findInterviewCandidate = (interview) =>
        candidates.find(
            (candidate) =>
                interview.candidateId != null &&
                String(candidate.id) === String(interview.candidateId)
        ) ||
        candidates.find(
            (candidate) =>
                candidate.name.trim().toLowerCase() ===
                interview.candidate.trim().toLowerCase()
        ) ||
        (interview.candidateId == null
            ? candidates.find((candidate) => String(candidate.id) === String(interview.id))
            : undefined);

    const filteredInterviews = interviews.filter((interview) => {
        const query = search.trim().toLowerCase();

        const matchesSearch =
            !query ||
            interview.candidate.toLowerCase().includes(query) ||
            interview.position.toLowerCase().includes(query) ||
            interview.interviewer.toLowerCase().includes(query);

        const matchesStatus = statusFilter === "All" || interview.status === statusFilter;
        const matchesType = typeFilter === "All" || interview.type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    const totalInterviews = interviews.length;

    const scheduledInterviews = interviews.filter(
        (interview) => interview.status === "Scheduled"
    ).length;

    const completedInterviews = interviews.filter(
        (interview) => interview.status === "Completed"
    ).length;

    const cancelledInterviews = interviews.filter(
        (interview) => interview.status === "Cancelled"
    ).length;

    if(loading){
        return(
            <div className='container-fluid p-4'>
                <div className='text-center mt-5'>
                    <div className='spinner-border text-primary' role='status'>

                    </div>
                    <p className='text-muted mt-3'>Loading interviews....</p>

                </div>

            </div>
        );
    }


  if (error) {

    return (
      <div className="container-fluid p-4">

        <div className="alert alert-danger">
          {error}
        </div>

      </div>
    );

  }









  return (
    <div className='container-fluid p-4'>
        <div className='d-flex justify-content-between align-items-center mb-4'>
            <div>
                <h2 className='fw-bold mb-1'>Interview Management</h2>
                <p className='text-muted mb-1'>schedule and manage candidate interviews</p>
            </div>
            <button
                type="button"
                className='btn btn-primary ms-auto rounded px-3 py-2 fw-semibold shadow-sm'
                onClick={() => {
                    setScheduleError("");
                    setShowScheduleForm(true);
                }}
            >
                <i className='bi bi-plus-lg me-2'></i>
                Schedule Interview
            </button>

        </div>

        {/* statustics */}

        <div className='row g-4 mb-4'>

            <div className='col-md-6 col-lg-3'>
                <div className='card border-0 shadow-sm'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='text-muted mb-2'>Total Interviews</p>
                                <h3 className='fw-bold mb-0'>{totalInterviews}</h3>
                            </div>
                            <div className='bg-primary bg-opacity-10 rounded p-3'>
                                <i className='bi bi-calendar-event-fill text-primary fs-4'></i>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* schedule */}

            <div className='col-md-6 col-lg-3'>
                <div className='card border-0 shadow-sm'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='text-muted mb-2'>Schedule</p>
                                <h3 className='fw-bold mb-0'>{scheduledInterviews}</h3>
                            </div>
                            <div className='bg-warning bg-opacity-10 rounded p-3'>
                                <i className='bi bi-clock-fill text-warning fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* complete */}

            <div className='col-md-6 col-lg-3'>
                <div className='card border-0 shadow-sm'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='text-muted mb-2'>Completed</p>
                                <h3 className='fw-bold mb-0'>{completedInterviews}</h3>
                            </div>
                            <div className='bg-success bg-opacity-10 rounded p-3'>
                                <i className='bi bi-check-circle-fill text-success fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* cancelled */}

            <div className='col-md-6 col-lg-3' >
                <div className='card border-0 shadow-sm'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='text-muted mb-2'>Cancelled</p>
                                <h3 className='fw-bold mb-2'>{cancelledInterviews}</h3>
                            </div>
                            <div className='bg-danger bg-opacity-10 rounded p-3'>
                                <i className='bi bi-x-circle-fill text-danger fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* filter and serach */}

            <div className='card border-0 shadow-sm mb-4'>
                <div className='card-body'>
                    <div className='row g-3'>

                        <div className='col-md-6'>
                            <div className='input-group'>
                                <span className='input-group-text bg-white'>
                                    <i className='bi bi-search'></i>

                                </span>

                                <input type="text" className='form-control'
                                placeholder='search candidate, position or interviewer....'
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)}/>

                            </div>

                        </div>

                        {/* status */}
                        <div className='col-md-3'>
                            <select className='form-select' value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value="All">All Status</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>

                        </div>
                        <div className='col-md-3'>
                            <select className='form-select' value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}>
                                  <option value="All">
                  All Types
                </option>

                <option value="Technical">
                  Technical
                </option>

                <option value="HR Round">
                  HR Round
                </option>

                <option value="Video Call">
                  Video Call
                </option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>

         
        </div>

           {filteredInterviews.length > 0 ? (
                <div className='row g-4'>
                    {filteredInterviews.map((interview) => {
                        const candidate = findInterviewCandidate(interview);

                        return (
                            <div className='col-md-6 col-xl-4' key={interview.id}>
                                <InterviewCard
                                    interview={interview}
                                    candidateAvailable={Boolean(candidate)}
                                    onViewCandidate={() => navigate(`/candidates/${candidate.id}`)}
                                    onEditCandidate={() => navigate(`/candidates/edit/${candidate.id}`)}
                                    onDelete={deleteInterview}
                                    onStatusChange={updateInterviewStatus}
                                />
                            </div>
                        );
                    })}

                </div>
            ) : (
                <div className='card border-0 shadow-sm'>
                    <div className='card-body text-center py-5'>
                        <i className='bi bi-calendar-x fs-1 text-muted'></i>
                        <h5 className='text-muted mb-0'>No interviews found</h5>
                        <p className='text-muted mb-0'>Try changing your search or filters.</p>

                    </div>

                </div>
            )
        }

        {showScheduleForm && (
            <>
                <div className="modal-backdrop fade show"></div>
                <div
                    className="modal d-block"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="schedule-interview-title"
                    tabIndex="-1"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <form onSubmit={handleScheduleSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="schedule-interview-title">Schedule Interview</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={() => setShowScheduleForm(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    {scheduleError && (
                                        <div className="alert alert-danger" role="alert">{scheduleError}</div>
                                    )}
                                    {candidatesError ? (
                                        <div className="alert alert-danger mb-0" role="alert">{candidatesError}</div>
                                    ) : candidatesLoading ? (
                                        <div className="text-center py-3">
                                            <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                                            <span className="ms-2">Loading candidates...</span>
                                        </div>
                                    ) : candidates.length === 0 ? (
                                        <div className="alert alert-info mb-0">
                                            No candidates are available. Add a candidate before scheduling an interview.
                                            <button
                                                type="button"
                                                className="btn btn-link p-0 ms-1 align-baseline"
                                                onClick={() => navigate('/candidates/add')}
                                            >
                                                Add candidate
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <label className="form-label" htmlFor="interview-candidate">Candidate</label>
                                                <select
                                                    id="interview-candidate"
                                                    className="form-select"
                                                    name="candidateId"
                                                    value={scheduleForm.candidateId}
                                                    onChange={handleScheduleChange}
                                                    required
                                                >
                                                    <option value="" disabled>Select a candidate</option>
                                                    {candidates.map((candidate) => (
                                                        <option key={candidate.id} value={candidate.id}>
                                                            {candidate.name} — {candidate.position}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label" htmlFor="interview-interviewer">Interviewer</label>
                                                <input
                                                    id="interview-interviewer"
                                                    className="form-control"
                                                    name="interviewer"
                                                    value={scheduleForm.interviewer}
                                                    onChange={handleScheduleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="interview-date">Date</label>
                                                <input
                                                    id="interview-date"
                                                    className="form-control"
                                                    type="date"
                                                    name="date"
                                                    value={scheduleForm.date}
                                                    onChange={handleScheduleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="interview-time">Time</label>
                                                <input
                                                    id="interview-time"
                                                    className="form-control"
                                                    type="time"
                                                    name="time"
                                                    value={scheduleForm.time}
                                                    onChange={handleScheduleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label" htmlFor="interview-type">Interview type</label>
                                                <select
                                                    id="interview-type"
                                                    className="form-select"
                                                    name="type"
                                                    value={scheduleForm.type}
                                                    onChange={handleScheduleChange}
                                                >
                                                    <option value="Online">Online</option>
                                                    <option value="Offline">Offline</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowScheduleForm(false)}
                                    >
                                        Cancel
                                    </button>
                                    {!candidatesLoading && !candidatesError && candidates.length > 0 && (
                                        <button type="submit" className="btn btn-primary">Schedule Interview</button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )}


    </div>
  )
}

export default Interviews