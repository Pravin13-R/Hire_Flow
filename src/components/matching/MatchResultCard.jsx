const MatchResultCard = ({ candidate, result, onViewCandidate }) => {
    const { percentage, matchedSkills, missingSkills } = result
    const matchColor = percentage >= 80 ? 'success' : percentage >= 60 ? 'warning' : 'danger'

  return (
    <div className='card border-0 shadow-sm h-100'>
        <div className='card-body'>
            <div className='d-flex justify-content-between align-items-center gap-3 mb-3'>
                <div className='d-flex align-items-center gap-3 min-w-0'>
                    <div className='match-avatar flex-shrink-0'>
                        {candidate.name.charAt(0)}
                    </div>
                    <div className='min-w-0'>
                        <h5 className='fw-bold mb-1 text-break'>{candidate.name}</h5>
                        <p className='text-muted mb-0 small'>{candidate.position}</p>
                    </div>
                </div>
                <div className='text-end flex-shrink-0'>
                    <h4 className={`text-${matchColor} fw-bold mb-0`}>{percentage}%</h4>
                    <small className='text-muted'>Match</small>
                </div>
            </div>

            <div className='progress mb-4' style={{ height: '8px' }}>
                <div className={`progress-bar bg-${matchColor}`} role='progressbar' style={{ width: `${percentage}%` }} />
            </div>

            <div className='mb-3'>
                <h6 className='fw-semibold mb-2'>
                    <i className='bi bi-check-circle-fill text-success me-2'></i>
                    Matched Skills
                </h6>

                {matchedSkills.length > 0 ? (
                    matchedSkills.map((skill) => (
                        <span key={skill} className='badge bg-success-subtle text-success me-2 mb-2'>
                            <i className='bi bi-check me-1'></i>
                            {skill}
                        </span>
                    ))
                ) : (
                    <span className='text-muted small'>No matching skills</span>
                )}
            </div>

            <div className='mb-3'>
                <h6 className='fw-semibold mb-2'>
                    <i className='bi bi-exclamation-circle-fill text-danger me-2'></i>
                    Missing Skills
                </h6>
                <div>
                    {missingSkills.length > 0 ? (
                        missingSkills.map((skill) => (
                            <span key={skill} className='badge bg-danger-subtle text-danger me-2 mb-2'>{skill}</span>
                        ))
                    ) : (
                        <span className='text-success small'>All required skills matched</span>
                    )}
                </div>
            </div>

            <div className='mb-3'>
                <h6 className='fw-semibold mb-2'>Candidate Skills</h6>
                {candidate.skills.map((skill) => (
                    <span key={skill} className='badge bg-light text-dark border me-2 mb-2'>{skill}</span>
                ))}
            </div>

            <button
                type='button'
                className='btn btn-outline-primary btn-sm w-100 mt-3'
                onClick={onViewCandidate}
            >
                <i className='bi bi-person me-2'></i>
                View Candidate
            </button>

        </div>

    </div>
  )
}

export default MatchResultCard