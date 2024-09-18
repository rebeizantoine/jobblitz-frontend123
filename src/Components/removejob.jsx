import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import handsalary from "../Images/hand-salary.png";
import deleteimage from "../Images/remove.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/removejob.css";
import logoutimage from "../Images/logout.png";
import "../Styles/removejob.css";
import axios from "axios";

const Removejob = () => {
  const navigate = useNavigate();
  const [jobApplications, setJobApplications] = useState([]);
  useEffect(() => {
    // Fetch job applications when the component mounts
    fetchJobApplications();
  }, []); // Empty dependency array to run the effect only once

  const fetchJobApplications = async () => {
    try {
      const response = await axios.get(
        "https://allinone-14n7.onrender.com/jobdescriptions/getAll"
      );
      setJobApplications(response.data);
    } catch (error) {
      console.error("Error fetching job applications:", error.message);
    }
  };
  const handleJobApplicationClick = (jobId) => {
    // Navigate to the specified route when a job application is clicked
    navigate(`/singlejobdescription/jobdescription/${jobId}`);
  };

  const handleEmployers = (e) => {
    e.preventDefault();
    navigate("/employerdash");
  };

  const handleJobSeek = (e) => {
    e.preventDefault();
    navigate("/jobseekdash");
  };

  const removeJob = (e) => {
    e.preventDefault();
    navigate("/removejob");
  };

  const updatefeatured = (e) => {
    e.preventDefault();
    navigate("/updatefeatured");
  };
  const updateterms = (e) => {
    e.preventDefault();
    navigate("/updateterms");
  };
  const handleDeleteJobDescription = async (jobId) => {
    try {
      // Send a DELETE request to delete the job description
      await axios.delete(
        `https://allinone-14n7.onrender.com/jobdescriptions/delete/${jobId}`
      );

      // After successful deletion, you can update the state or fetch the updated job applications
      fetchJobApplications();
      toast.success("Job application deleted successfully");
    } catch (error) {
      console.error("Error deleting job description:", error.message);
    }
  };
  const handleLogout = () => {
    // Clear local storage and navigate to the home route
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <div className="sidebar">
        <a href="" className="sidebar-a" onClick={handleEmployers}>
          View Employers
        </a>
        <a href="" className="sidebar-a" onClick={removeJob}>
          Remove Job
        </a>
        <a href="" className="sidebar-a" onClick={handleJobSeek}>
          View Seekers
        </a>
        <a href="" className="sidebar-a" onClick={updatefeatured}>
          Update Featured
        </a>
        <a href="" className="sidebar-a" onClick={updateterms}>
          Update terms
        </a>
        <img
          className="logout-dash-image"
          src={logoutimage}
          onClick={handleLogout}
          alt=""
        />
      </div>
      <div className="last-box123">
        {jobApplications.length === 0 ? (
          <div>No job applications found</div>
        ) : (
          jobApplications.map((job) => (
            <div
              onClick={() => handleJobApplicationClick(job._id)}
              key={job._id}
              className="job-application-container"
            >
              <h3>{job.jobtitle}</h3>
              <div className="flex-1">
                <h4>{job.companyname} &nbsp;&nbsp;&nbsp;&nbsp;. </h4>
                <div className="job-location">
                  <h5>{job.location}</h5>
                </div>
              </div>
              <p className="description-small">
                {" "}
                {`${job.joboverview.split(" ").slice(0, 30).join(" ")}${
                  job.joboverview.split(" ").length > 30 ? "..." : ""
                }`}
              </p>
              <div className="flex-2">
                <img src={handsalary} alt="" />
                <p className="money">{`$${job.monthlysalary1} - $${job.monthlysalary2}`}</p>
                <p className="datenow">7 days ago</p>
              </div>
              <div className="handledelete-img">
                <img
                  src={deleteimage}
                  onClick={() => handleDeleteJobDescription(job._id)}
                  alt=""
                  className=""
                />
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Removejob;
