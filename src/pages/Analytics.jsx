import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Analytics = () => {

    const hiringTrend = [
        {
            month: "Apr",
            candidates: 120,
            hired: 12,
        },
          {
            month: "May",
            candidates: 145,
            hired: 15,
        },
          {
            month: "Jun",
            candidates: 165,
            hired: 18,
        },
          {
            month: "Jul",
            candidates: 220,
            hired: 21,
        },
          {
            month: "Aug",
            candidates: 220,
            hired: 27,
        },
          {
            month: "Sep",
            candidates: 248,
            hired: 32,
        },

    ];

    const recruitmentFunnel = [
        {
            stage: "Applied",
            candidate: 248,
        },
         {
            stage: "Screening",
            candidate: 180,
        },
         {
            stage: "Shortlisted",
            candidate: 95,
        },
         {
            stage: "Interview",
            candidate: 52,
        },
         {
            stage: "Offer",
            candidate: 38,
        },
         {
            stage: "Hired",
            candidate: 32,
        },
    ];

    const candidateSources =[
        {
            name: "LinkedIn",
            value: 35,
        },
        {
            name: "Naukri",
            value: 25,
        },
        {
            name: "Indeed",
            value: 18,
        },
        {
            name: "Referral",
            value: 12,
        },
        {
            name: "Others",
            value: 10,
        },
    ];

    const departmentHiring = [
        {
            department : "Engineering",
            hired: 14,

        },

          {
            department : "Design",
            hired: 5,

        },

          {
            department : "Marketing",
            hired: 4,

        },

          {
            department : "HR",
            hired: 3,

        },

          {
            department : "Sales",
            hired: 6,

        },
    ];

    const interviewData = [
        {
            type: "Technical",
            schedule: 24,
            completed: 18,
        },
        {
            type: "HR",
            schedule: 18,
            completed: 14,
        },
        {
            type: "Managerial",
            schedule: 12,
            completed: 9,
        },
    ];

    const pieColors = [
         "#0d6efd",
    "#6f42c1",
    "#dc3545",
    "#20c997",
    "#ffc107",
    ];



  return (
    <div className='container-fluid p-4'>
        <div className='d-flex justify-content-between align-items-center mb-4'>
            <div>
                <h2 className='fw-bold mb-1'>Analytics</h2>
                <p className='text-muted mb-0'>Recruitment performance and hiring insights</p>
            </div>
            <button className='btn btn-outline-secondary'>
                <i className='bi bi-calendar3 me-2'></i>
                Last 6 Months 
                <i className='bi bi-chevron-down ms-2'></i>

            </button>

        </div>

        {/* statistics */}

        <div className='row g-4 mb-4'>
            <div className='col-md-6 col-xl-3'>
                <div className='card border-0 shadow-sm h-100'>
                    <div className='card-body'>
                        <div className='d-flex justofy-content-between align-items-center'>
                            <div>
                                <p className='text-muted mb-2'>Total Candidates</p>
                                <h3 className='fw-bold mb-1'>248</h3>
                                <small className='text-success'>
                                    <i className='bi bi-arrow-up'></i>
                                    12% from last month

                                </small>
                            </div>

                            <div className='analytics-icon bg-primary bg-opacity-10'>
                                <i className='bi bi-people-fill text-primary fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* active jobs */}

            <div className='col-md-6 col-xl-3'>
                <div className='card border-0 shadow-sm h-100'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-beteween align-items-center'>
                            <div>
                                <p className='text-muted mb-2'>Active Jobs</p>
                                <h3 className='fw-bold mb-1'>24</h3>
                                <small className='text-success'>
                                    <i className='bi bi-arrow-up'></i>
                                    4% from last month

                                </small>
                            </div>

                            <div className='analytics-icon bg-success bg-opacity-10'>
                                <i className='bi bi-briefcase-fill text-success fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* interview */}

            <div className='col-md-6 col-xl-3'>
                <div className='card border-0 shadow-sm h-100'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p>Interviews</p>
                                <h3 className='fw-bold mb-1'>18</h3>

                                <small className='text-success'>
                                    <i className='bi bi-arrow-up'></i>
                                    8% from last month

                                </small>
                            </div>

                            <div className='analytics-icon bg-warning bg-opacity-10'>
                                <i className='bi bi-calender-check-fill text-warning fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* hired */}

            <div className='col-md-6 col-xl-3'>
                <div className='card border-0 shadow-sm h-100'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='text-muted mb-2'>Hired</p>
                                <h3 className='fw-bold mb-2'>32</h3>
                                <small className='text-success'>
                                    <i className='bi bi-arrow-up'></i>
                                    15% from last month

                                </small>
                            </div>

                            <div className='analytics-icon bg-info bg-opacity-10'>
                                <i className='bi bi-person-check-fill text-info fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>


        {/* hiring */}

        <div className='card border-0 shadow-sm mb-4'>
            <div className='card-body'>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                    <div>
                        <h5 className='fw-bold mb-1'>Hiring Overview</h5>
                        <p>Candidate applications and hiring trends</p>
                    </div>

                </div>

                <div style={{width: "100%", height: 350}}>
                    <ResponsiveContainer>
                        <LineChart data= {hiringTrend}>
                            <CartesianGrid strokeDasharray="3 3"    />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                            type="monotone"
                            dataKey="candidate"
                            stroke="#0d6efd"
                            strokeWidth={3}
                            name="Candidate"

                            />
                             <Line 
                            type="monotone"
                            dataKey="hired"
                            stroke="#20c997"
                            strokeWidth={3}
                            name="Hired"

                            />

                        </LineChart>
                    </ResponsiveContainer>

                </div>

            </div>

        </div>

        {/* funnel+ source */}

        <div className='row g-4 mb-4'>
            <div className='col-xl-7'>
                <div className='card border-0 shadow-sm h-100'>
                    <div className='card-body'>
                        <h5 className='fw-bold mb-1'>Recruitment Funnel</h5>
                        <p>Candidate progression through hiring stages</p>
                        <div style={{width:"100%", height: 350}}>
                            <ResponsiveContainer>
                                <BarChart data={recruitmentFunnel} layout="vertical">
                                    <CartesianGrid  strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis type="category" dataKey="stage" width={90} />
                                    <Tooltip />
                                    <Bar dataKey="candidate" fill="#0d6efd" radius={[0, 6, 6, 0]} />

                                </BarChart>
                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

            </div>

            {/* candidate source */}

            <div className='col-xl-5'>
                <div className='card border-0 shadow-sm h-100'>
                    <div className='card-body'>
                        <h5 className='fw-bold mb-1'>Candidate Sources</h5>
                        <p className='text-muted small mb-3'>Where candidates are coming from</p>

                        <div style={{ width: "100%", height: 280, }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={candidateSources}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}
                                        outerRadius={100}
                                        paddingAngle={3}
                                    >
                                        {candidateSources.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={pieColors[index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>

                        </div>

                        {/* source */}

                        <div>
                            {candidateSources.map(
                                (source, index) => (
                                    <div key={source.name} className='d-flex justify-content-between align-items-center mb-2'>
                                        <div className='d-flex align-items-center'>
                                            <span className='source-dot me-2' style={{backgroundColor: pieColors[index],}}>

                                            </span>
                                            <span>{source.name}</span>

                                        </div>
                                        <strong>{source.value}%</strong>

                                    </div>
                                )
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>

        <div className='row g-4'>
            <div className='col-xl-6'>
                <div className='card border-0 shadow-sm h-100'>
                    <div className='card-body'>
                        <h5 className='fw-bold mb-1'>Department Hiring</h5>
                        <p className='text-muted small mb-4'>Number of candidates hired by department</p>

                        <div style={{ width: "100%", height: 320, }}>
                            <ResponsiveContainer>
                                 <BarChart data={departmentHiring}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="department" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="hired"
                      fill="#6f42c1"
                      radius={[6, 6, 0, 0]}
                    />

                  </BarChart>


                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

            </div>


            {/* interview */}

              <div className="col-xl-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body">

              <h5 className="fw-bold mb-1">
                Interview Statistics
              </h5>

              <p className="text-muted small mb-4">
                Scheduled and completed interviews
              </p>


              <div
                style={{
                  width: "100%",
                  height: 320,
                }}
              >

                <ResponsiveContainer>

                  <BarChart data={interviewData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="type" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="scheduled"
                      fill="#0d6efd"
                      name="Scheduled"
                      radius={[6, 6, 0, 0]}
                    />

                    <Bar
                      dataKey="completed"
                      fill="#20c997"
                      name="Completed"
                      radius={[6, 6, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

        </div>

        </div>

    </div>
  )
}

export default Analytics