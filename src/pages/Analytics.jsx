import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { useCandidates } from "../context/CandidateContext";
import { useJobs } from "../context/JobContext";
import { useInterviews } from "../context/InterviewContext";

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

function Analytics() {
  const { candidates = [], loading: candidatesLoading } =
    useCandidates();

  const { jobs = [], loading: jobsLoading } = useJobs();

  const { interviews = [], loading: interviewsLoading } =
    useInterviews();

  const loading =
    candidatesLoading || jobsLoading || interviewsLoading;

  const statusData = useMemo(() => {
    const statuses = [
      "Applied",
      "Screening",
      "Shortlisted",
      "Interview",
      "Offer",
      "Hired",
      "Rejected",
    ];

    return statuses.map((status) => ({
      status,
      count: candidates.filter(
        (candidate) =>
          candidate.status?.toLowerCase() === status.toLowerCase()
      ).length,
    }));
  }, [candidates]);

  const departmentData = useMemo(() => {
    const counts = {};

    jobs.forEach((job) => {
      const department = job.department || "Other";
      counts[department] = (counts[department] || 0) + 1;
    });

    return Object.entries(counts).map(([department, count]) => ({
      department,
      count,
    }));
  }, [jobs]);

  const hiredCandidates = candidates.filter(
    (candidate) => candidate.status?.toLowerCase() === "hired"
  ).length;

  const hiringRate =
    candidates.length > 0
      ? ((hiredCandidates / candidates.length) * 100).toFixed(1)
      : "0.0";

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <p>Loading recruitment analytics...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h2 className="fw-bold">Recruitment Analytics</h2>
        <p className="text-secondary">
          Insights from your current candidates, jobs, and interviews.
        </p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary mb-1">Total Candidates</p>
              <h3 className="fw-bold">{candidates.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary mb-1">Total Jobs</p>
              <h3 className="fw-bold">{jobs.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary mb-1">Total Interviews</p>
              <h3 className="fw-bold">{interviews.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary mb-1">Hiring Rate</p>
              <h3 className="fw-bold">{hiringRate}%</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">
                Candidates by Status
              </h5>

              <div style={{ width: "100%", height: 320 }}>
                <ResponsiveContainer>
                  <BarChart data={statusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar
                      dataKey="count"
                      fill="#6366f1"
                      radius={[5, 5, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">
                Jobs by Department
              </h5>

              {departmentData.length === 0 ? (
                <p className="text-secondary">
                  No job data available yet.
                </p>
              ) : (
                <div style={{ width: "100%", height: 320 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        dataKey="count"
                        nameKey="department"
                        cx="50%"
                        cy="50%"
                        outerRadius={95}
                        label
                      >
                        {departmentData.map((entry, index) => (
                          <Cell
                            key={entry.department}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
