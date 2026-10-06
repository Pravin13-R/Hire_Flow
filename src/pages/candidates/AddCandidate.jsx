import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCandidates } from "../../context/CandidateContext";

function AddCandidate() {
  const navigate = useNavigate();

  const { addCandidate } = useCandidates();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    location: "",
    skills: "",
    status: "Applied",
    appliedDate: new Date().toISOString().split("T")[0]
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.position ||
      !formData.experience ||
      !formData.location ||
      !formData.skills
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const candidate = {
      ...formData,

      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "")
    };

    addCandidate(candidate);

    navigate("/candidates");
  };

  return (
    <div className="container-fluid py-4">

      {/* Header */}
      <div className="mb-4">

        <button
          type="button"
          className="btn btn-outline-secondary btn-sm mb-3"
          onClick={() => navigate("/candidates")}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Candidates
        </button>

        <h3 className="fw-bold mb-1">
          Add Candidate
        </h3>

        <p className="text-muted mb-0">
          Add a new candidate to your recruitment pipeline.
        </p>

      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-circle me-2"></i>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="row g-4">

          {/* Personal Information */}
          <div className="col-lg-8">

            <div className="card border-0 shadow-sm mb-4">

              <div className="card-body p-4">

                <h5 className="fw-bold mb-1">
                  <i className="bi bi-person me-2 text-primary"></i>
                  Personal Information
                </h5>

                <p className="text-muted small mb-4">
                  Enter the candidate's basic information.
                </p>

                <div className="row g-3">

                  {/* Name */}
                  <div className="col-md-6">

                    <label className="form-label">
                      Full Name <span className="text-danger">*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter candidate name"
                      value={formData.name}
                      onChange={handleChange}
                    />

                  </div>

                  {/* Email */}
                  <div className="col-md-6">

                    <label className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="candidate@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />

                  </div>

                  {/* Phone */}
                  <div className="col-md-6">

                    <label className="form-label">
                      Phone <span className="text-danger">*</span>
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                  </div>

                  {/* Location */}
                  <div className="col-md-6">

                    <label className="form-label">
                      Location <span className="text-danger">*</span>
                    </label>

                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      placeholder="Chennai"
                      value={formData.location}
                      onChange={handleChange}
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* Professional Information */}
            <div className="card border-0 shadow-sm mb-4">

              <div className="card-body p-4">

                <h5 className="fw-bold mb-1">
                  <i className="bi bi-briefcase me-2 text-success"></i>
                  Professional Information
                </h5>

                <p className="text-muted small mb-4">
                  Add the candidate's professional details.
                </p>

                <div className="row g-3">

                  {/* Position */}
                  <div className="col-md-6">

                    <label className="form-label">
                      Position <span className="text-danger">*</span>
                    </label>

                    <select
                      name="position"
                      className="form-select"
                      value={formData.position}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select position
                      </option>

                      <option value="Frontend Developer">
                        Frontend Developer
                      </option>

                      <option value="React Developer">
                        React Developer
                      </option>

                      <option value="Backend Developer">
                        Backend Developer
                      </option>

                      <option value="Full Stack Developer">
                        Full Stack Developer
                      </option>

                      <option value="UI/UX Designer">
                        UI/UX Designer
                      </option>

                      <option value="JavaScript Developer">
                        JavaScript Developer
                      </option>
                    </select>

                  </div>

                  {/* Experience */}
                  <div className="col-md-6">

                    <label className="form-label">
                      Experience <span className="text-danger">*</span>
                    </label>

                    <select
                      name="experience"
                      className="form-select"
                      value={formData.experience}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select experience
                      </option>

                      <option value="Fresher">
                        Fresher
                      </option>

                      <option value="1-2 Years">
                        1-2 Years
                      </option>

                      <option value="2-3 Years">
                        2-3 Years
                      </option>

                      <option value="3-5 Years">
                        3-5 Years
                      </option>

                      <option value="5+ Years">
                        5+ Years
                      </option>
                    </select>

                  </div>

                  {/* Skills */}
                  <div className="col-12">

                    <label className="form-label">
                      Skills <span className="text-danger">*</span>
                    </label>

                    <input
                      type="text"
                      name="skills"
                      className="form-control"
                      placeholder="React, JavaScript, HTML, CSS"
                      value={formData.skills}
                      onChange={handleChange}
                    />

                    <small className="text-muted">
                      Enter skills separated by commas.
                    </small>

                  </div>

                  {/* Status */}
                  <div className="col-md-6">

                    <label className="form-label">
                      Recruitment Status
                    </label>

                    <select
                      name="status"
                      className="form-select"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Applied">
                        Applied
                      </option>

                      <option value="Screening">
                        Screening
                      </option>

                      <option value="Shortlisted">
                        Shortlisted
                      </option>

                      <option value="Interview">
                        Interview
                      </option>

                      <option value="Offer">
                        Offer
                      </option>

                      <option value="Hired">
                        Hired
                      </option>

                      <option value="Rejected">
                        Rejected
                      </option>
                    </select>

                  </div>

                  {/* Applied Date */}
                  <div className="col-md-6">

                    <label className="form-label">
                      Applied Date
                    </label>

                    <input
                      type="date"
                      name="appliedDate"
                      className="form-control"
                      value={formData.appliedDate}
                      onChange={handleChange}
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Right Side */}
          <div className="col-lg-4">

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4">

                <h5 className="fw-bold mb-3">
                  Candidate Summary
                </h5>

                <div className="candidate-summary">

                  <div className="candidate-form-avatar mx-auto mb-3">
                    {formData.name
                      ? formData.name
                          .charAt(0)
                          .toUpperCase()
                      : "?"}
                  </div>

                  <h5 className="text-center fw-bold">
                    {formData.name || "Candidate Name"}
                  </h5>

                  <p className="text-center text-muted">
                    {formData.position || "Position"}
                  </p>

                  <hr />

                  <div className="mb-3">
                    <small className="text-muted d-block">
                      Email
                    </small>

                    <span>
                      {formData.email || "Not provided"}
                    </span>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted d-block">
                      Experience
                    </small>

                    <span>
                      {formData.experience || "Not provided"}
                    </span>
                  </div>

                  <div>
                    <small className="text-muted d-block mb-2">
                      Skills
                    </small>

                    {formData.skills ? (
                      <div className="d-flex flex-wrap gap-1">
                        {formData.skills
                          .split(",")
                          .map((skill, index) => (
                            <span
                              key={index}
                              className="badge bg-light text-dark border"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                      </div>
                    ) : (
                      <span className="text-muted">
                        No skills added
                      </span>
                    )}
                  </div>

                </div>

                <hr />

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-2"
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Add Candidate
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={() => navigate("/candidates")}
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        </div>

      </form>

    </div>
  );
}

export default AddCandidate;