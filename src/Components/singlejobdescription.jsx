import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/singlejobdescription.css";

const Singlejobdescription = () => {
  const { jobId } = useParams();
  const [jobDescription, setJobDescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://backendjobblitz.onrender.com/jobdescriptions/jobdescriptions/${jobId}`
      );
      setJobDescription(response.data);
    } catch (error) {
      console.error("Error fetching job description:", error);
      setError("Error fetching job description");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [jobId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleViewContactInformation = () => {
    const usernameEmployer = jobDescription?.usernameEmployer;

    if (usernameEmployer) {
      navigate(`/employerppreadonly/${usernameEmployer}`);
    }
  };
  const handleApplyJob = () => {
    navigate(`/applyjob/${jobId}`);
  };

  return (
    <div className="job-description-big">
      {jobDescription ? (
        <>
          <h1 className="title-position">{jobDescription.jobtitle}</h1>
          <div className="view-contact-button">
            <button onClick={handleViewContactInformation}>
              View Contact Information
            </button>
          </div>
          <div className="apply-job-button1">
            <button onClick={handleApplyJob}>Apply to Job</button>
          </div>
          <h2 className="company-position">{jobDescription.companyname}</h2>
          <div className="first-flex1">
            <div className="location-position">{jobDescription.location}</div>
            <div className="date-position">7 days ago</div>
          </div>
          <div>
            <h3 className="reach-out">Reach out to the employer</h3>
            <div className="go-next">
              <h4 className="job-description">Job Description</h4>
              <h5 className="job-overview">Job Overview:</h5>
              <p className="job-text">{jobDescription.joboverview}</p>
              <h4 className="skills">Skills:</h4>
              <h5 className="responsibilities">Responsibilities:</h5>
              <h4 className="responsibility-1">
                -{jobDescription.responsibilities1}
              </h4>
              <h4 className="responsibility-2">
                -{jobDescription.responsibilities2}{" "}
              </h4>
              <h4 className="responsibility-3">
                -{jobDescription.responsibilities3}
              </h4>
              <h4 className="responsibility-4">
                -{jobDescription.responsibilities4}
              </h4>
              <h4 className="responsibility-5">
                -{jobDescription.responsibilities5}
              </h4>

              <h5 className="qualifications">Qualifications:</h5>
              <p className="qualification-1">
                1-{jobDescription.qualification1}
              </p>
              <p className="qualification-2">
                2-{jobDescription.qualification2}
              </p>
              <p className="qualification-3">
                3-{jobDescription.qualification3}.
              </p>
              <p className="qualification-4">
                4-{jobDescription.qualification4}
              </p>

              <div className="info-item1-12">
                <div className="pergunta-123">
                  <strong>Employment Type:</strong>
                </div>
                <div className="answer-1">{jobDescription.employementtype}</div>
              </div>

              <div className="info-item1-12">
                <div className="pergunta-123">
                  <strong>Monthly Salary Range:</strong>
                </div>
                <div className="answer-1">
                  ${jobDescription.monthlysalary1}-$
                  {jobDescription.monthlysalary2}
                </div>
              </div>

              <div className="info-item1-12">
                <div className="pergunta-123">
                  <strong>Number of Vacancies:</strong>
                </div>
                <div className="answer-1">
                  {jobDescription.numberofvacancies}
                </div>
              </div>

              <div className="info-item1-12">
                <div className="pergunta-123">
                  <strong>Degree:</strong>
                </div>
                <div className="answer-1">{jobDescription.degreerequired}</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>No job description found</div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Singlejobdescription;
