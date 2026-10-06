import { createContext, useContext, useEffect, useState } from "react";
import { getInterviews } from "../services/api";
import {
  getFormStorage,
  saveToStorage
} from "../utils/storage";

const InterviewContext = createContext();

export function InterviewProvider({ children }) {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      setLoading(true);

      // 1. Check LocalStorage
      const storedInterviews = getFormStorage("hireflow_interviews");

      if (storedInterviews) {
        setInterviews(storedInterviews);
        setLoading(false);
        return;
      }

      // 2. Fetch from fake API
      const data = await getInterviews();

      const formattedInterviews = data
        .slice(0, 10)
        .map((item, index) => ({
          id: item.id,

          candidate: [
            "Arun Kumar",
            "Priya Sharma",
            "Rahul Kumar",
            "Divya Raj",
            "Vikram Singh",
            "Sneha Kumar",
            "Karan Raj",
            "Anitha Kumar",
            "John Smith",
            "David Kumar"
          ][index],

          position: [
            "Frontend Developer",
            "React Developer",
            "Backend Developer",
            "Full Stack Developer",
            "UI/UX Designer",
            "JavaScript Developer",
            "Node.js Developer",
            "Software Engineer",
            "Web Developer",
            "Product Designer"
          ][index],

          interviewer: [
            "Priya Menon",
            "John Smith",
            "Anitha Raj",
            "David Kumar",
            "Priya Menon",
            "John Smith",
            "Anitha Raj",
            "David Kumar",
            "Priya Menon",
            "John Smith"
          ][index],

          date: `2026-10-${String(index + 3).padStart(2, "0")}`,

          time: [
            "10:00 AM",
            "11:30 AM",
            "02:00 PM",
            "03:30 PM",
            "10:30 AM",
            "01:00 PM",
            "11:00 AM",
            "02:30 PM",
            "04:00 PM",
            "10:00 AM"
          ][index],

          type: index % 2 === 0 ? "Online" : "Offline",

          status:
            index < 6
              ? "Scheduled"
              : index < 9
              ? "Completed"
              : "Cancelled"
        }));

      setInterviews(formattedInterviews);

      // 3. Save to LocalStorage
      saveToStorage(
        "hireflow_interviews",
        formattedInterviews
      );
    } catch (err) {
      console.error(err);
      setError("Failed to load interviews");
    } finally {
      setLoading(false);
    }
  };

  // Add Interview
  const addInterview = (interview) => {
    const newInterview = {
      ...interview,
      id: Date.now()
    };

    const updatedInterviews = [
      ...interviews,
      newInterview
    ];

    setInterviews(updatedInterviews);

    saveToStorage(
      "hireflow_interviews",
      updatedInterviews
    );
  };

  // Update Interview
  const updateInterview = (
    interviewId,
    updatedData
  ) => {
    const updatedInterviews = interviews.map(
      (interview) =>
        interview.id === interviewId
          ? {
              ...interview,
              ...updatedData
            }
          : interview
    );

    setInterviews(updatedInterviews);

    saveToStorage(
      "hireflow_interviews",
      updatedInterviews
    );
  };

  // Delete Interview
  const deleteInterview = (interviewId) => {
    const updatedInterviews = interviews.filter(
      (interview) =>
        interview.id !== interviewId
    );

    setInterviews(updatedInterviews);

    saveToStorage(
      "hireflow_interviews",
      updatedInterviews
    );
  };

  // Update Interview Status
  const updateInterviewStatus = (
    interviewId,
    newStatus
  ) => {
    const updatedInterviews = interviews.map(
      (interview) =>
        interview.id === interviewId
          ? {
              ...interview,
              status: newStatus
            }
          : interview
    );

    setInterviews(updatedInterviews);

    saveToStorage(
      "hireflow_interviews",
      updatedInterviews
    );
  };

  return (
    <InterviewContext.Provider
      value={{
        interviews,
        loading,
        error,
        addInterview,
        updateInterview,
        deleteInterview,
        updateInterviewStatus
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterviews() {
  return useContext(InterviewContext);
}