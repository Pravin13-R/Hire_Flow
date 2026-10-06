import { createContext, useContext, useEffect,useState } from "react";
import { getTeamMembers } from "../services/api";
import { getFormStorage,saveToStorage } from "../utils/storage";

const TeamContext = createContext();

export function TeamProvider ({children}) {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTeam = async () => {
            try {
                setLoading(true);
                setError("");

                const storedTeam = getFormStorage("hireflow_team");

                if (storedTeam !== null) {
                    setTeam(storedTeam);
                    return;
                }

                const data = await getTeamMembers();

                const roles = [
                     "HR Manager",
          "Technical Recruiter",
          "HR Executive",
          "Senior Recruiter",
          "Talent Acquisition",
          "Recruitment Lead",
          "HR Specialist",
          "Recruiter",
          "Hiring Manager",
          "HR Coordinator"
                ];

                const formattedTeam = data.map((member, index) => ({
                    id: member.id,
                    name: member.name,
                    email: member.email,
                    phone: member.phone,

                     role: roles[index % roles.length],

          department:
            index % 2 === 0
              ? "Human Resources"
              : "Recruitment",

          status:
            index % 3 === 0
              ? "Inactive"
              : "Active",

          location: member.address?.city || "Chennai"
                }));

                setTeam(formattedTeam);

                saveToStorage("hireflow_team", formattedTeam);

            } catch (err) {
                console.error(err);
                setError("Failed to load team members");

            } finally {
                setLoading(false);
            }
        };
        loadTeam();
    }, []);

    const addTeamMember = (member) => {
        setTeam((previous) => {
            const updatedTeam = [
                ...previous,
                {
                    ...member, id: Date.now()
                }
            ];

            saveToStorage("hireflow_team", updatedTeam);

            return updatedTeam;
        });
    };

    const updateTeamMember = (memberId, updatedData) => {
        setTeam((previousTeam) => {
            const updatedTeam = previousTeam.map((member) => 
            member.id === memberId
            ? {...member, ...updatedData}
            : member
            );

            saveToStorage("hireflow_team", updatedTeam);

            return updatedTeam;
        });
    };

    const deleteTeamMember = (memberId) => {
        setTeam((previousTeam) => {
            const updatedTeam = previousTeam.filter(
                (member) => member.id !== memberId
            );

            saveToStorage("hireflow_team", updatedTeam);
            return updatedTeam;
        });
    };

    const  updateTeamStatus = (memberId, newStatus) => {
    setTeam((previousTeam) => {
      const updatedTeam = previousTeam.map((member) =>
        member.id === memberId
          ? { ...member, status: newStatus }
          : member
      );

      saveToStorage("hireflow_team", updatedTeam);

      return updatedTeam;
    });
  };

  return (
    <TeamContext.Provider
      value={{
        team,
        loading,
        error,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        updateTeamStatus
      }}
    >
      {children}
    </TeamContext.Provider>
  );

}

export function useTeam() {
  return useContext(TeamContext);
}