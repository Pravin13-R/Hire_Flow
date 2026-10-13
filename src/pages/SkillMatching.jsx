import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MatchResultCard from '../components/matching/MatchResultCard'
import { calculateSkillMatch } from '../utils/skillMatcher';
import { useCandidates } from "../context/CandidateContext";


const SkillMatching = () => {
    const navigate = useNavigate();
    const { candidates, loading } = useCandidates();

    const jobs = [

         {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      skills: [
        "React",
        "JavaScript",
        "HTML",
        "CSS",
      ],
    },

    {
      id: 2,
      title: "Full Stack Developer",
      department: "Engineering",
      skills: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "JavaScript",
      ],
    },

    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      skills: [
        "Figma",
        "UI Design",
        "UX Design",
        "CSS",
      ],
    },

    {
      id: 4,
      title: "Backend Developer",
      department: "Engineering",
      skills: [
        "Node.js",
        "Express",
        "MongoDB",
        "REST API",
      ],
    },

    {
      id: 5,
      title: "Java Developer",
      department: "Engineering",
      skills: [
        "Java",
        "Spring Boot",
        "SQL",
        "Git",
      ],
    },

    {
      id: 6,
      title: "QA Engineer",
      department: "Quality Assurance",
      skills: [
        "Manual Testing",
        "Selenium",
        "Automation Testing",
        "API Testing",
      ],
    },

    {
      id: 7,
      title: "Software Engineer",
      department: "Engineering",
      skills: [
        "Data Structures",
        "Java",
        "SQL",
        "Git",
      ],
    },

    {
      id: 8,
      title: "Data Analytics",
      department: "Analytics",
      skills: [
        "SQL",
        "Python",
        "Excel",
        "Power BI",
      ],
    },
  ];


    const [selectedJobId, setSelectedJobId] = useState(1);

    const [search, setSearch] = useState("");
    const [minimumMatch, setMinimumMatch] = useState("0");

    const selectedJob = jobs.find(
        (job) => job.id === Number(selectedJobId)
    );

    const matchingCandidates = candidates.map((candidate) => {
        const result = calculateSkillMatch(
            candidate.skills, selectedJob.skills
        );

        return {
            candidate, result,
        };
    })

    .filter(({ candidate, result }) => {
        const matchesSearch = 
        candidate.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        candidate.position.toLocaleLowerCase().includes(search.toLocaleLowerCase());

        const matchesPercentage = result.percentage >= Number(minimumMatch);

       return (
        matchesSearch &&
        matchesPercentage
       );
    })

    .sort(
        (a, b) => b.result.percentage - a.result.percentage
    );

    // statatics

    const totalCandidates = matchingCandidates.length;

    const highlyMatched = matchingCandidates.filter(
        ({result}) => result.percentage >= 80
    ).length;

    const averageMatch = matchingCandidates.length > 0 
    ? Math.round( matchingCandidates.reduce(
        (total, item) => total + item.result.percentage, 0 
    ) / matchingCandidates.length
) : 0;

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
                <h2 className='fw-bold mb-1'>Skill Matching</h2>
                <p className='text-muted mb-0'>Compare candidate skills with job requirements</p>
            </div>

        </div>

        <div className='card border-0 shadow-sm mb-4'>
            <div className='card-body'>
                <div className='row align-items-end g-4'>
                    {/* job */}

                    <div className='col-md-6'>
                        <label className='form-label fw-semibold'>Select Job</label>
                        <select className='form-select' value={selectedJobId} 
                        onChange={(e) => setSelectedJobId(e.target.value)}>
                            {jobs.map((job) => (
                                <option value={job.id} key={job.id}>{job.title}</option>
                            ))}
                            

                        </select>

                    </div>

                    {/* department */}

                    <div className='col-md-6'>
                        <label className='form-label fw-semibold'>Department</label>
                        <input type="text"   className='form-control' value={selectedJob.department} readOnly />

                    </div>

                </div>

                {/* required skill */}

                <div className='mt-4'>
                    <h6 className='fw-bold mb-3'>Required Skills</h6>
                    {selectedJob.skills.map(
                        (skill) => (
                            <span key={skill} className='badge bg-primary-subtle text-primary me-2 px-3 py-2'>
                                <i className='bi bi-check2 me-1'></i>{skill}
                            </span>
                            
                        )
                    )}

                </div>

            </div>

        </div>

        {/* statatics */}

        <div className='row g-4 mb-4'>
            <div className='col-md-4'>
                <div className='card border-0 shadow-sm'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='text-muted mb-1'>Candidates</p>
                                <h3 className='fw-bold mb-0'>{totalCandidates}</h3>
                            </div>
                            <div className='bg-primary bg-opacity-10 rounded p-3'>
                                <i className='bi bi-people-fill text-primary fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* highly match */}

            <div className='col-md-4'>
                <div className='card border-0 shadow-sm'>
                    <div className='card-body '>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='text-muted mb-1'>Strong Matches</p>
                                <h3 className='fw-bold mb-0'>{highlyMatched}</h3>
                            </div>

                            <div className='bg-success bg-opacity-10 rounded p-3'>
                                <i className='bi bi-person-check-fill text-success fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* average */}

            <div className='col-md-4'>
                <div className='card border-0 shadow-sm'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='text-muted mb-1'>Average Match</p>
                                <h3 className='fw-bold mb-0'>{averageMatch}%</h3>
                            </div>
                            <div className='bg-warning bg-opacity-10 rounded p-3'>
                                <i className='bi bi-bar-char-fill text-warning fs-4'></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

            {/* search, filter */}

            <div className='card border-0 shadow-sm mb-4'>
                <div className='card-body'>
                    <div className='row g-3'>
                        <div className='col-md-8'>
                            <div className='input-group'>
                                <span className='input-group-text bg-white'>
                                    <i className='bi bi-search'></i>
                                    
                                </span>

                                <input type="text" 
                                className='form-control' placeholder='Search candidate....'
                                value={search} onChange={(e) => setSearch(e.target.value)}  />

                            </div>

                        </div>

                        <div className='col-md-4'>
                            <select className='form-select' value={minimumMatch} onChange={(e) => setMinimumMatch(e.target.value)}>
                                <option value="0">
                  All Matches
                </option>

                <option value="80">
                  80% and above
                </option>

                <option value="60">
                  60% and above
                </option>

                <option value="40">
                  40% and above
                </option>
                            </select>

                        </div>

                    </div>

                </div>

            </div>

            {/* result */}

            <div className='d-flex justify-content-between align-items-center mb-3'>
                <div>
                    <h5 className='fw-bold mb-1'>Matching Candidates</h5>
                    <small className='text-muted'>Candidates ranked by skill compatibility</small>
                </div>
                <span>{matchingCandidates.length} Candidates</span>

            </div>

            {/* candidate result */}

            {matchingCandidates.length > 0 ? (
                <div className='row g-4'>
                    {matchingCandidates.map(
                        ({ candidate, result}) => (
                            <div className='col-md-6 col-xl-4' key={candidate.id}>
                                <MatchResultCard
                                    candidate={candidate}
                                    result={result}
                                    onViewCandidate={() => navigate(`/candidates/${candidate.id}`)}
                                />

                            </div>
                        )
                    )}
                </div>
            ) : (
                <div className='card border-0 shadow-sm'>
                    <div className='card-body text-center py-5'>
                        <i className='bi bi-person-x fs-1 text-muted'></i>
                        <h5 className='mt-3'>No matching candidates</h5>
                        <p className='text-muted mb-0'>try changing the search or match percentage.</p>

                    </div>

                </div>
            ) 
        }

    </div>
  );
}

export default SkillMatching