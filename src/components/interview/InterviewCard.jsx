function InterviewCard({ interview, onDelete, onStatusChange }) {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-3">

          <div className="d-flex align-items-center">

            <div className="interview-avatar me-3">
              {interview.candidate.charAt(0)}
            </div>

            <div>
              <h6 className="fw-bold mb-1">
                {interview.candidate}
              </h6>

              <small className="text-muted">
                {interview.position}
              </small>
            </div>

          </div>

          <select
            aria-label={`Status for ${interview.candidate}'s interview`}
            className={`form-select form-select-sm w-auto border-0 fw-semibold ${
              interview.status === "Scheduled"
                ? "bg-primary-subtle text-primary"
                : interview.status === "Completed"
                ? "bg-success-subtle text-success"
                : "bg-danger-subtle text-danger"
            }`}
            value={interview.status}
            onChange={(event) =>
              onStatusChange(interview.id, event.target.value)
            }
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

        </div>

        <hr />

        {/* Interview Details */}

        <div className="mb-2">
          <i className="bi bi-calendar3 text-primary me-2"></i>
          <span className="text-muted">Date:</span>{" "}
          <strong>{interview.date}</strong>
        </div>

        <div className="mb-2">
          <i className="bi bi-clock text-primary me-2"></i>
          <span className="text-muted">Time:</span>{" "}
          <strong>{interview.time}</strong>
        </div>

        <div className="mb-2">
          <i className="bi bi-person text-primary me-2"></i>
          <span className="text-muted">Interviewer:</span>{" "}
          <strong>{interview.interviewer}</strong>
        </div>

        <div className="mb-3">
          <i className="bi bi-camera-video text-primary me-2"></i>
          <span className="text-muted">Type:</span>{" "}
          <strong>{interview.type}</strong>
        </div>

        {/* Actions */}

        <div className="d-flex gap-2">

          <button className="btn btn-outline-primary btn-sm flex-grow-1">
            <i className="bi bi-eye me-1"></i>
            View
          </button>

          <button className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-pencil"></i>
          </button>

          <button
            className="btn btn-outline-danger btn-sm"
            aria-label={`Delete interview with ${interview.candidate}`}
            onClick={() => onDelete(interview.id)}
          >
            <i className="bi bi-trash"></i>
          </button>

        </div>

      </div>
    </div>
  );
}

export default InterviewCard;