import PipelineColumn from '../components/pipeline/PipelineColumn';
import { useCandidates } from "../context/CandidateContext";
import { useNavigate } from "react-router-dom";

const Pipeline = () => {
    const navigate = useNavigate();
    const {
      candidates,
      loading,
      updateCandidateStatus,
    } = useCandidates();

     const pipelineStages = [
    {
      title: "Applied",
      status: "Applied",
    },
    {
      title: "Screening",
      status: "Screening",
    },
    {
      title: "Shortlisted",
      status: "Shortlisted",
    },
    {
      title: "Interview",
      status: "Interview",
    },
    {
      title: "Offer",
      status: "Offer",
    },
    {
      title: "Hired",
      status: "Hired",
    },
  ];

  const handleStatusChange = (candidateId, newStatus) => {
    updateCandidateStatus(candidateId, newStatus);
  };


  const totalCandidates = candidates.length;
  const hiredCandidates = candidates.filter(
    (candidate) => candidate.status === "Hired"
  ).length;

  const interviewCandidates = candidates.filter(
    (candidate) => candidate.status === "Interview"
  ).length;

  const offerCandidates = candidates.filter(
    (candidate) => candidate.status === "Offer"
  ).length;

  if (loading) {
    return (
      <div className='container-fluid py-5 text-center'>
        <div className='spinner-border text-primary'></div>
        <p className='mt-3 text-muted'>Loading candidates...</p>
      </div>
    );
  }


  return (
    <div className='container-fluid p-4'>

        <div className='d-flex justify-content-between align-items-center mb-4'>
            <div>
                <h2 className='fw-bold mb-1'>Recruitment Pipeline</h2>
                <p className='text-muted mb-0'> Track candidates through every stage of the hiring process</p>
            </div>
            <button className='btn btn-primary' onClick={() => navigate("/candidates/add")}>
                <i className='bi bi-plus-lg me-2 '></i>
                Add Candidate
            </button>

        </div>

        {/* statics */}
        <div className='row g-4 mb-4'>
            <div className='col-md-6 col-lg-3'>
                <div className='card border-0 shadow-sm'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <p className='text-muted mb-1'>
                                    Total Candidates
                                </p>
                                <h3 className='fw-bold mb-0'>
                                    {totalCandidates}

                                </h3>
                            </div>
                            <div className='bg-primary bg-opacity-10 rounded p-3'>
                                <i className='bi bi-people-fill text-primary fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className='col-md-6 col-lg-3'>
                <div className='card border-0 shadow-sm'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <p className='text-muted mb-1'>Interviews</p>
                                <h3 className='fw-bold mb-0'>{interviewCandidates}</h3>
                            </div>
                            <div className='bg-warning bg-opacity-10 rounded p-3'>
                                <i className='bi bi-calendar-check-fill text-warning fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className='col-md-6 col-lg-3'>
                <div className='card border-0 shadow-sm'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <p className='text-muted mb-1'>Offers</p>
                                <h3 className='fw-bold mb-0'>{offerCandidates}</h3>
                            </div>
                            <div className='bg-info bg-opacity-10 rounded p-3'>
                                <i className='bi bi-file-earmark-text-fill text-info fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className='col-md-6 col-lg-3'>
                <div className='card border-0 shadow-sm'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between '>
                            <div>
                                <p className='text-muted mb-1'>Hired</p>
                                <h3 className='fw-bold mb-0'>{hiredCandidates}</h3>
                            </div>
                            <div className='bg-success bg-opacity-10 rounded p-3'>
                                <i className='bi bi-check-circle-fill text-success fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

          </div>

          {/* pipeline */}

            <div className='pipeline-wrapper'>
              {pipelineStages.map((stage) => {
                const stageCandidates = candidates.filter(
                  (candidate) => candidate.status === stage.status
                );

                return (
                  <PipelineColumn
                    key={stage.status}
                    title={stage.title}
                    candidates={stageCandidates}
                    onStatusChange={handleStatusChange}
                  />
                );
              })}
            </div>

    </div>
  )
}

export default Pipeline