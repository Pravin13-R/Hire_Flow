import { createContext, useContext, useEffect, useState } from "react";
import {getJobs} from "../services/api";
import { getFormStorage,saveToStorage } from "../utils/storage";

const JobContext = createContext();

export function JobProvider({children}) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadJob = async () => {
            try {
                const storedJobs = getFormStorage("hireflow_jobs");

                if (storedJobs) {
                    setJobs(storedJobs);
                    setLoading(false);
                    return;
                }

                const data = await getJobs();

                const formattedJobs = data.slice(0, 10).map((job, index) => ({
                    id: job.id,
                    title: [
                        "Frontend Developer",
                        "React Developer",
                        "Backend Developer",
                        "Full Stack Developer",
                        "UI/UX Designer",
                        "JavaScript Developer",
                        "Node.js Developer",
                        "Software Engineer",
                        "Web Developer",
                        "Product Designer",
                    ][index],
                    department: [
                        "Engineering",
                        "Engineering",
                        "Engineering",
                        "Engineering",
                        "Design",
                        "Engineering",
                        "Engineering",
                        "Technology",
                        "Engineering",
                        "Design",
                    ][index],
                    location: [
                        "Chennai",
                        "Bangalore",
                        "Hyderabad",
                        "Chennai",
                        "Coimbatore",
                        "Bangalore",
                        "Chennai",
                        "Hyderabad",
                        "Pune",
                        "Bangalore",
                    ][index],
                    experience: `${index + 1}-${index + 3} Years`,
                    opening: (index % 4) + 1,
                    skills: [
                        "HTML, CSS, JavaScript, React",
                        "React, JavaScript, Bootstrap",
                        "Node.js, Express, MongoDB",
                        "React, Node.js, MongoDB",
                        "Figma, UI Design, UX",
                        "JavaScript, React, API",
                        "Node.js, Express, MongoDB",
                        "JavaScript, React, Git",
                        "HTML, CSS, React",
                        "Figma, UX, CSS",
                    ][index],
                    status: index % 3 === 0 ? "Active" : "Closed",
                    postedDate: "2026-09-30",
                }));

                setJobs(formattedJobs);
                saveToStorage("hireflow_jobs", formattedJobs);
            } catch (err) {
                setError("Failed to load jobs");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadJob();
    }, []);


    const addJob = (job) => {
        const newJob = {
            ...job, id: Date.now()
        };


        const updatedJobs = [...jobs, newJob];

        setJobs(updatedJobs);
        saveToStorage("hireflow_jobs", updatedJobs);
    };

    const updateJob = (jobId, updateData) => {
        const updatedJobs = jobs.map((job) =>
        job.id === jobId
        ? {...job, ...updateData}
        : job
        );

        setJobs(updatedJobs);
        saveToStorage("hireflow_jobs", updatedJobs);
    };

    const updateJobStatus = (jobId, newStatus) => {
        const updatedJobs = jobs.map((job) => 
        job.id === jobId
        ? {...job, status: newStatus}
        : job
        );

        setJobs(updatedJobs);
        saveToStorage("hireflow_jobs", updatedJobs);
    };

    const deleteJob = (jobId) => {
        const updatedJobs = jobs.filter((job) => job.id !== jobId);

        setJobs(updatedJobs);
        saveToStorage("hireflow_jobs", updatedJobs);
    };


    return (
        <JobContext.Provider 
        value={{
        jobs,
        loading,
        error,
        addJob,
        updateJob,
        deleteJob,
        updateJobStatus
      }}
    >
      {children}
    </JobContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useJobs() {
  return useContext(JobContext);
}