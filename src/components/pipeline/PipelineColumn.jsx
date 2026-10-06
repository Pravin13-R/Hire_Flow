const PipelineColumn = ({ title, candidates, onStatusChange }) => {
  return (
    <div className='pipeline-stage-row'>

      <div className='pipeline-stage-heading'>
            <h6 className='fw-bold mb-0'>{title}</h6>

            <span className='badge bg-primary rounded-pill'>
                {candidates.length}

            </span>

        </div>

        <div className='candidate-list'>
            {candidates.length > 0 ? (
                candidates.map((candidate) =>(

                    <div className='card candidate-card shadow-sm' key={candidate.id}>
                        <div className='card-body'>
                            <div className='d-flex align-items-center mb-3'>
                                <div className='candidate-avatar me-2'>
                                    {candidate.name.charAt(0)}

                                </div>
                                <div>
                                    <h6 className='mb-0 fw-semibold'>{candidate.name}</h6>
                                    <small className='text-muted'>{candidate.position}</small>
                                </div>

                            </div>

                            <div className='small text-muted mb-2'>
                                <i className='bi bi-briefcase me-2'></i>
                                {candidate.experience}
                            </div>
                            <div className='small text-muted mb-3'>
                                <i className="bi bi-geo-alt me-2"></i>
                                {candidate.location}

                            </div>
                            <div className='mb-3'>
                                {candidate.skills.map((skill) =>(
                                    <span key={skill} className='badge bg-light text-dark border me-1 mb-1'>
                                        {skill}
                                    </span>
                                )
                            )}

                            </div>
                            <select className='form-select form-select-sm' value={candidate.status}
                            onChange={(e) => onStatusChange(candidate.id,e.target.value)}>
                                <option value="Applied">
                    Applied
                  </option>

                  <option value="Screening">
                    Screening
                  </option>

                  <option value="Shortlisted">
                    Shortlisted
                  </option>

                  <option value="Interview">
                    Interview
                  </option>

                  <option value="Offer">
                    Offer
                  </option>

                  <option value="Hired">
                    Hired
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>
                            </select>

                        </div>


                    </div>
                ))
            ) : (
                   <div className="candidate-empty text-muted">
                 <i className="bi bi-inbox fs-3"></i>

            <p className="small mt-2 mb-0">
              No candidates
            </p>
               </div> 
            )
        } 

        </div>

    </div>
  );
}

export default PipelineColumn