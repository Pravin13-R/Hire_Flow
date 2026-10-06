import { createContext, useContext, useEffect, useState } from "react";
import { getCandidates } from "../services/api";
import { getFormStorage,saveToStorage } from "../utils/storage";

const CandidateContext = createContext(null);
const CANDIDATE_STORAGE_KEY = "hireflow_candidates";

const formatCandidates = (data) =>
    data.map((item, index) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        position: [
            "Frontend Developer",
            "React Developer",
            "Full Stack Developer",
            "UI/UX Designer",
            "Backend Developer",
            "Software Engineer",
            "Java Developer",
            "Data Analyst",
            "QA Engineer",
            "Web Developer",
        ][index],
        experience: [
            "2 Years",
            "1 Year",
            "3 Years",
            "2 Years",
            "4 Years",
            "2 Years",
            "3 Years",
            "1 Year",
            "2 Years",
            "3 Years",
        ][index],
        location: [
            "Chennai",
            "Bangalore",
            "Chennai",
            "Coimbatore",
            "Bangalore",
            "Hyderabad",
            "Chennai",
            "Coimbatore",
            "Chennai",
            "Bangalore",
        ][index],
        skills: [
            "React, JavaScript, CSS",
            "React, JavaScript, Bootstrap",
            "React, Node.js, MongoDB",
            "Figma, UI Design, CSS",
            "Node.js, Express, MongoDB",
            "Java, SQL, Git",
            "Java, Spring Boot, SQL",
            "Excel, SQL, Power BI",
            "Selenium, Java, Testing",
            "HTML, CSS, JavaScript",
        ][index].split(", "),
        status: "Applied",
        appliedDate: "2026-09-03",
    }));

export function CandidateteProvider({ children }) {
    const [candidates, setCandidates] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState( "" );


    useEffect(() => {
        const loadCandidates = async () => {
            try {
                const storedCandidates = getFormStorage(CANDIDATE_STORAGE_KEY);

                if (storedCandidates) {
                    setCandidates(storedCandidates);
                    setLoading(false);
                    return;
                }

                const data = await getCandidates();

                const candidateData = formatCandidates(data);

                saveToStorage(CANDIDATE_STORAGE_KEY, candidateData);
                setCandidates(candidateData);
                setLoading(false);
            } catch (err) {

                console.error(err);

                setError("Unable to load candidate");

                setLoading(false);
            }
        };

        loadCandidates();
    },[]);

    const restoreCandidates = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getCandidates();
            const candidateData = formatCandidates(data);

            saveToStorage(CANDIDATE_STORAGE_KEY, candidateData);
            setCandidates(candidateData);
        } catch (err) {
            console.error(err);
            setError("Unable to restore sample candidates");
        } finally {
            setLoading(false);
        }
    };

    // add

    const addCandidate = (candidate) => {
        const newCandidate = {
            ...candidate,
            id: Date.now(),
        };

        const updatedCandidates = [
            ...candidates,
            newCandidate,
        ];

        setCandidates(updatedCandidates);

        saveToStorage("hireflow_candidates", updatedCandidates);
    };


    // update

    const updateCandidate = (
        candidateId, updateData
    ) => {

        const updatedCandidates = candidates.map((candidate) =>
            candidate.id === candidateId
        ? {
            ...candidate, 
            ...updateData,
        }
        : candidate
        );

        setCandidates(updatedCandidates);

        saveToStorage("hireflow_candidates", updatedCandidates);
    };



    // delete
   const deleteCandidate = (
    candidateId
  ) => {

    const updatedCandidates =
      candidates.filter(
        (candidate) =>
          candidate.id !== candidateId
      );


    setCandidates(
      updatedCandidates
    );


    saveToStorage(
      "hireflow_candidates",
      updatedCandidates
    );

  };

//   change

const updateCandidateStatus = (
    candidateId,
    newStatus
  ) => {

    const updatedCandidates =
      candidates.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              status: newStatus,
            }
          : candidate
      );


    setCandidates(
      updatedCandidates
    );


    saveToStorage(
      "hireflow_candidates",
      updatedCandidates
    );

  };

  return(
    <CandidateContext.Provider value={{
        candidates,
        loading,
        error,

        restoreCandidates,
        addCandidate,
        updateCandidate,
        deleteCandidate,
        updateCandidateStatus,
    }} >
        {children}
    </CandidateContext.Provider>

  );

}

// eslint-disable-next-line react-refresh/only-export-components
export function useCandidates() {
  const context = useContext(CandidateContext);

  if (!context) {
    throw new Error("useCandidates must be used within CandidateteProvider");
  }

  return context;
}
