import { useState } from 'react'
import TeamMemberCard from '../components/team/TeamMemberCard'
import { useTeam } from "../context/TeamContext";

const Team = () => {

    const { team, loading, error, deleteTeamMember } = useTeam();

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("All");

    const filteredTeam = team.filter(
        (member) => {
            const matchesSearch = 
            member.name.toLowerCase().includes(search.toLowerCase()) ||
            member.role.toLowerCase().includes(search.toLowerCase()) ||
            member.email.toLowerCase().includes(search.toLowerCase());

            const matchesDepartment = department === "All" || member.department === department;
            return(
                matchesSearch && matchesDepartment
            );
        }
    );

    const totalMembers = team.length;
    const activeMembers = team.filter(
        (member) => member.status === "Active"
    ).length;

    const recruiters = team.filter(
        (member) => member.department === "Recruitment"
    ).length;

    if (loading) {
        return (
            <div className='container-fluid p-4'>
                <div className='text-center mt-5'>
                    <div className='spinner-border text-primary' role='status'>

                    </div>
                    <p className='text-muted mt-3'>Loading team...</p>

                </div>

            </div>
        );
    }

    if (error) {
        return (
            <div className='container-fluid p-4'>
                <div className='alert alert-danger' role='alert'>
                    {error}
                </div>
            </div>
        );
    }


  return (
    <div>
        <div className='container-fluid p-4'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <div>
                    <h2 className='fw-bold mb-1'>Team Management</h2>
                    <p className='text-muted mb-0'>Manage your recruitment team</p>
                </div>

                <button className='btn btn-primary'>
                    <i className='bi bi-person-plus-fill me-2'></i>
                    Add Team Member

                </button>

            </div>

            {/* statistics */}
            <div className='row g-4 mb-4'>
                <div className='col-md-4'>
                    <div className='card border-0 shadow-sm'>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <p className='fw-bold mb-0'>Total Members</p>
                                    <h3>{totalMembers}</h3>
                                </div>
                                <div className='bg-primary bg-opacity-10 rounded p-3'>
                                    <i className='bi bi-people-fill text-primary fs-4'></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className='col-md-4'>
                    <div className='card border-0 shadow-sm'>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <p className='text-muted mb-1'>Active Members</p>
                                    <h3 className='fw-bold mb-0'>{activeMembers}</h3>
                                </div>

                                <div className='bg-success bg-opacity-10 rounded p-3'>
                                    <i className='bi bi-person-check-fill text-success fs-4'></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className='col-md-4'>
                    <div className='card border-0 shadow-sm'>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <p className='text-muted mb-1'>Recruiters</p>
                                    <h3 className='fw-bold mb-0'>{recruiters}</h3>
                                </div>
                                <div className='bg-warning bg-opacity-10 rounded p-3'>
                                    <i className='bi bi-person-badge-fill text-warning fs-4'></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* serach */}

                <div className='card border-0 shadow-sm mb-4'>
                    <div className='card-body'>
                        <div className='row g-3'>
                            <div className='col-md-8'>
                                <div className='input-group'>
                                    <span className='input-group-text bg-white'>
                                        <i className='bi bi-search'></i>

                                    </span>

                                    <input type="text"  
                                    className='form-control' placeholder='Search team members...' value={search}
                                    onChange={(e) => setSearch(e.target.value)} />

                                </div>

                            </div>

                            <div className='col-md-4'>
                                <select className='form-select' value={department}
                                onChange={(e) => setDepartment(e.target.value)} >

                                     <option value="All">
                  All Departments
                </option>

                <option value="Human Resources">
                  Human Resources
                </option>

                <option value="Recruitment">
                  Recruitment
                </option>

                <option value="Engineering">
                  Engineering
                </option>


                                </select>

                            </div>

                        </div>

                    </div>

                </div>

                <div className='row g-4'>
                    {filteredTeam.map((member) => (
                        <div className='col-md-6 col-xl-4' key={member.id}>
                            <TeamMemberCard
                                member={member}
                                onDelete={() => deleteTeamMember(member.id)}
                            />

                        </div>
                    ))}

                </div>
            </div>

        </div>
    </div>
  )
}

export default Team