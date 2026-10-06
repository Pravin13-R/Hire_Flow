const TeamMemberCard = ({ member, onDelete }) => {
  return (
    <div className='card border-0 shadow-sm h-100'>
        <div className='card-body text-center'>
            <div className='team-avatar mx-auto mb-3'>
                {member.name.charAt(0)}
            </div>
            <h5 className='fw-bold mb-1'>{member.name}</h5>
            <p className='text-primary mb-1'>{member.role}</p>
            <p className='text-muted small mb-3'>{member.department}</p>
            <div className='border-top pt-3'>
                <div className='small text-muted mb-2'>
                    <i className='bi bi-envelope me-2'></i>
                    {member.email}

                </div>

                <div className='small text-muted mb-3'>
                    <i className='bi bi-telephone me-2'></i>
                    {member.phone}

                </div>
                <span className={`badge ${member.status === "Active"
                    ? "bg-success-subtle text-success"
                    : "bg-secondary-subtle text-secondary"
                }`}>
                    {member.status}

                </span>
                <div className='mt-3'>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        aria-label={`Delete team member ${member.name}`}
                        onClick={onDelete}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>

            </div>

        </div>

    </div>
  );
}

export default TeamMemberCard