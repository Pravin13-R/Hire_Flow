const Dashboard = () => {

  //{Statistics} 
  const stats = [
    {
      title : "Total Candidates",
      value : "248",
      growth : "+12%",
      icon : "bi-people-fill",
      color : "primary",
    },
    {
      title : "Active Jobs",
      value : "24",
      growth : "+4%",
      icon : "bi-briefcase-fill",
      color : "success",
    },
    {
      title : "Interviews",
      value : "18",
      growth : "+8%",
      icon : "bi-calendar-check-fill",
      color : "warning",
    },
    {
      title: "Hired",
      value: "32",
      growth: "+15%",
      icon: "bi-person-check-fill",
      color: "purple",
    },
    
  ];

    // {pipeline}

    const pipeline = [
      {
      name: "Applied",
      count: 42,
      percentage: 32,
      icon: "bi-file-earmark-text",
      color: "primary",
    },
    {
      name: "Screening",
      count: 28,
      percentage: 21,
      icon: "bi-search",
      color: "warning",
    },
    {
      name: "Shortlisted",
      count: 16,
      percentage: 12,
      icon: "bi-people-fill",
      color: "purple",
    },
    {
      name: "Interview",
      count: 12,
      percentage: 9,
      icon: "bi-calendar-check",
      color: "danger",
    },
    {
      name: "Offer",
      count: 8,
      percentage: 6,
      icon: "bi-file-earmark-check",
      color: "info",
    },
    {
      name: "Hired",
      count: 24,
      percentage: 20,
      icon: "bi-check-circle-fill",
      color: "success",
    },
    ];

    // // {recent candidates}
    const candidates = [
      {
        name : "Arthi",
        email: "arthi@gmail.com",
        position : "React Developer",
        status : "Interview",
        statusColor : "primary",
        date : "Sep 25, 2026",
        initial : "K",
      },

      {
        name : "Pugalenthi",
        email: "priya@gmail.com",
        position : "Backend Developer",
        status : "Screening",
        statusColor : "warning",
        date : "Sep 20, 2026",
        initial : "S T",
      },

    

      {
        name : "Rohan",
        email: "rahul@gmail.com",
        position : "UI/UX Designer",
        status : "Shortlister",
        statusColor : "success",
        date : "Sep 25, 2026",
        initial : "K",
      },

      {
        name : "Abinaya",
        email: "abi@gmail.com",
        position : "HR Executive",
        status : "Applied",
        statusColor : "primary",
        date : "Jun 22, 2006",
        initial : "S",
      },

      {
        name : "Pravin",
        email: "pravin@gmail.com",
        position : "Frontend Developer",
        status : "Offer",
        statusColor : "info",
        date : "Sep 18, 2026",
        initial : "R",
      },
    ];


    // // {Upcoming interviews}

    const interviews = [
        {
        name : "Arthi",
        role : "React Developer",
        round : "Technical Round",
        roundColor : "primary",
        date : "Sep 25, 2026",
        time : "12 : 30 pm",
      },

      {
        name : "Pugalenthi",
        role : "Backend Developer",
        round : "HR Round",
        roundColor : "warning",
        date : "Sep 20, 2026",
        time : "03 : 30 pm",
      },

    

      {
        name : "Rohan",
        role  : "UI/UX Designer",
        round : "Technical Round",
        roundColor : "success",
        date : "Sep 25, 2026",
        time : "11 : 30 pm",
      },

      {
      name: "Mounesh",
      role: "Full Stack Developer",
      round: "Manager Round",
      roundColor: "success",
      date: "Sep 26, 2026",
      time: "11:00 AM",
    },
    {
      name: "Thiru Kumaran",
      role: "Backend Developer",
      round: "HR Round",
      roundColor: "danger",
      date: "Sep 26, 2026",
      time: "02:00 PM",
    },
    ];
    
  return (
    <div className='container-fluid py-4'>

      <div className='card border-0 shadow-sm mb-4' style={{ background: 'linear-gradient(135deg, #eef5ff 0%, #f8f9ff 100%)' }}>
        <div className='card-body py-4'>
          <div className='d-flex justify-content-between align-items-center flex-wrap gap-3'>
            <div>
              <h2 className='fw-bold mb-1'>Dashboard</h2>
              <p className='text-muted mb-0'>Welcome, Pravin! Here's your recruitment overview.</p>
            </div>

            <button className='btn btn-light border shadow-sm d-flex align-items-center gap-2'>
              <i className='bi bi-calendar3 text-primary'></i>
              <select className='form-select form-select-sm border-0 bg-transparent shadow-none' style={{ width: '240px' }}>
                <option>Sep 01 , 2026 - Sep 30 , 2026</option>
                <option>Aug 01 , 2026 - Aug 30 , 2026</option>
              </select>
            </button>
          </div>
        </div>
      </div>


      {/* // stats */}

      
      <div className="row g-4 mb-4">

        {stats.map((stat) => (

          <div
            className="col-12 col-sm-6 col-xl-3"
            key={stat.title}
          >

            <div className="card border-0 shadow-sm h-100" style={{ transition: 'all 0.2s ease', transform: 'translateY(0)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 0.75rem 1.5rem rgba(15, 23, 42, 0.10)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}>

              <div className="card-body py-3">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-2">
                      {stat.title}
                    </p>

                    <h2 className="fw-bold mb-1">
                      {stat.value}
                    </h2>

                    <small className="text-success fw-semibold">
                      <i className="bi bi-arrow-up-right me-1"></i>
                      {stat.growth}
                    </small>

                    <small className="text-muted ms-2">
                      From last month
                    </small>

                  </div>

                  <div
                    className={`bg-${stat.color} bg-opacity-10 rounded-4 p-3`}
                    style={{ minWidth: '52px', minHeight: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >

                    <i
                      className={`bi ${stat.icon} fs-2 text-${stat.color}`}
                    ></i>

                  </div>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* pipeline */}


      <div className='row g-4 mb-4'>
        <div className="col-12 col-xl-8">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                  <h5 className="fw-bold mb-1">
                    Recruitment Pipeline
                  </h5>

                  <p className="text-muted small mb-0">
                    Track candidates through hiring stages
                  </p>

                </div>

                <button className="btn btn-primary btn-sm">
                  View Pipeline
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>

              </div>


              <div className="row g-3">

                {pipeline.map((stage) => (

                  <div
                    className="col-6 col-md-4 col-xl-2"
                    key={stage.name}
                  >

                    <div className="text-center p-3 bg-light rounded-4 h-100 border border-light-subtle" style={{ transition: 'all 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(13, 110, 253, 0.08)'; e.currentTarget.style.borderColor = '#dfe6ff'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = ''; }}>

                      <div
                        className={`bg-${stage.color} bg-opacity-10 rounded-3 p-2 d-inline-block mb-2`}
                      >

                        <i
                          className={`bi ${stage.icon} text-${stage.color} fs-4`}
                        ></i>

                      </div>

                      <p className="small text-muted mb-1">
                        {stage.name}
                      </p>

                      <h4 className="fw-bold mb-2">
                        {stage.count}
                      </h4>

                      <div className="progress mb-2" style={{ height: "5px" }}>

                        <div
                          className={`progress-bar bg-${stage.color}`}
                          style={{
                            width: `${stage.percentage}%`,
                          }}
                        ></div>

                      </div>

                      <small className="text-muted">
                        {stage.percentage}%
                      </small>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>


        {/* //candidate source */}

        <div className='col-12 col-xl-4'>
          <div className='card border-0 shadow-sm h-100'>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-item-center mb-3'>
                <h5 className='fw-bold mb-0'>Candidate sources</h5>

                <select className='form-select form-select-sm w-auto'>
                  <option >This Month</option>
                  <option >Last Month</option>
                  <option >This Year</option>
                </select>

              </div>

              {/* dount */}

              <div className='text-center my-4'>
                <div className='mx-auto rounded-circle d-flex align-items-center justify-content-center'
                 style={{
                  width: "170px", height:"170px", 
                  background: "conic-gradient(#0d6efd 0% 35%, #6f42c1 35% 60%, #dc3545 60% 78%, #ffc107 78% 90%, #20c997 90% 100%)",
                 }}
                 >
                  <div className='bg-white rounded-circle d-flex flex-column align-items-center justify-content-center'
                  style={{
                    width:"105px", height:"105px"
                  }}
                  >
                    <h4 className='fw-bold mb-0'>248</h4>
                    <small className='text-muted'>Total</small>

                  </div>

                </div>

              </div>

              {/* source list */}

              <div className='d-flex flex-column gap-2 mx-auto' style={{ maxWidth: '220px' }}>
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <span className='d-flex align-items-center'>
                    <i className='bi bi-circle-fill text-primary me-2'></i>
                    LinkedIn
                  </span>
                  <strong>35%</strong>
                </div>

                <div className='d-flex align-items-center justify-content-between w-100'>
                  <span className='d-flex align-items-center'>
                    <i className='bi bi-circle-fill text-purple me-2'></i>
                    Naukri
                  </span>
                  <strong>25%</strong>
                </div>

                <div className='d-flex align-items-center justify-content-between w-100'>
                  <span className='d-flex align-items-center'>
                    <i className='bi bi-circle-fill text-danger me-2'></i>
                    Indeed
                  </span>
                  <strong>18%</strong>
                </div>

                <div className='d-flex align-items-center justify-content-between w-100'>
                  <span className='d-flex align-items-center'>
                    <i className='bi bi-circle-fill text-warning me-2'></i>
                    Referral
                  </span>
                  <strong>12%</strong>
                </div>

                <div className='d-flex align-items-center justify-content-between w-100'>
                  <span className='d-flex align-items-center'>
                    <i className='bi bi-circle-fill text-success me-2'></i>
                    Others
                  </span>
                  <strong>10%</strong>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* recent candidate and interviews */}

      <div className='row g-4'>
        <div className='col-12 col-xl-7'>
          <div className='card border-0 shadow-sm'>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-items-center mb-3'>

                <h5 className='fw-bold mb-0'>Recent Candidate</h5>

                <button className='btn btn-link text-primary text-decoration-none'>View All  → </button>

              </div>

              <div className='table-responsive'>
                <table className='table align-middle mb-0'>
                  <thead>
                    <tr className='text-muted small'>
                      <th>Candidate </th>
                      <th>Position</th>
                      <th>Status</th>
                      <th>Applied Date</th>
                      <th>Actions</th>

                    </tr>
                  </thead>

                  <tbody>
                    {candidates.map((candidate) => (
                      
                      <tr key={candidate.name}>
                        <td>
                          <div className='d-flex align-items-center'>

                            <div className='bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-2 fw-bold'
                            style={{
                              width : "40px", height :"40px"
                            }}
                            >
                              {candidate.initial}

                            </div>

                            <div>
                              <div className='fw-semibold'>
                                {candidate.name}

                              </div>
                              <small className='text-muted'>{candidate.email}</small>
                            </div>

                          </div>
                        </td>

                        <td>{candidate.position}</td>
                        <td>
                          <span className={`badge bg-${candidate.statusColor} bg-opacity-10 text-${candidate.statusColor}`}>
                            {candidate.status}
                          </span>
                        </td>

                        <td className='text-muted small'>
                          {candidate.date}
                        </td>

                        <td>
                          <div className='d-flex gap-2'>
                             <button className="btn btn-sm btn-light">
                              <i className="bi bi-eye"></i>
                            </button>

                            <button className='btn btn-sm btn-light'>
                              <i className='bi bi-pencil'></i>

                            </button>

                          </div>
                        </td>

                      </tr>
                    )
                  )}
                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>


        {/* interview */}

        <div className='col-12 col-xl-5'>
          <div className='card border-0 shadow-sm'>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-items-center mb-3'>

                <h5 className='fw-bold mb-0'>Upcoming Interviews</h5>

                <button className='btn btn-link text-primary text-decoration-none'>View All →</button>

              </div>

              {interviews.map((interview) => (
                <div className='border-bottom py-3' key={interview.name}>

                  <div className='d-flex justify-content-between align-items-center'>

                    <div className='d-flex align-items-center'>

<div className='bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3'
                      style={{
                        width :"42px", height :"42px",
                      }}
                      >
                        <i className='bi bi-person text-primary'></i>

                      </div>

                      <div >

                        <h6 className='fw-bold mb-1'>
                          {interview.name}

                        </h6>

                        <small className='text-muted'>{interview.role}</small>

                      </div>

                    </div>

                    <div className='text-end'>

                      <span className= {`badge bg-${interview.roundColor} bg-opacity-10 text-${interview.roundColor} mb-1`}>
                        {interview.round}

                      </span>

                      <div className='small text-muted'>
                        <i className='bi bi-calender3 me-1'></i>
                        {interview.date}

                      </div>

                      <div className='small fw-semibold'>
                        {interview.time}

                      </div>

                    </div>

                  </div>

                </div>
              )
            )}

            </div>

          </div>

        </div>



        

      </div>





     
    </div>
  )
}

export default Dashboard