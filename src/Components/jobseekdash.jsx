import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logoutimage from "../Images/logout.png";
import "../Styles/removejob.css";

const Jobseekdash = () => {
  const navigate = useNavigate();
  const [jobseekers, setJobseekers] = useState([]);

  useEffect(() => {
    const fetchJobseekers = async () => {
      try {
        const response = await axios.get(
          "https://allinone-14n7.onrender.com/jobseeker/jobseekers"
        );
        setJobseekers(response.data);
      } catch (error) {
        console.error("Error fetching employers:", error);
      }
    };

    fetchJobseekers();
  }, []);

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
  const handleDelete = async (jobseekerId) => {
    try {
      // Send a DELETE request to your backend to delete the jobseeker
      if (!jobseekerId) {
        // If jobseekerId is not available, show an error message
        throw new Error("Invalid jobseekerId");
      }
      await axios.delete(
        `https://allinone-14n7.onrender.com/jobseeker/jobseekers/${jobseekerId}`
      );
      // Update the state to reflect the changes
      setJobseekers((prevJobseekers) =>
        prevJobseekers.filter((jobseeker) => jobseeker._id !== jobseekerId)
      );

      // Show a success message using toast or any other notification library
      toast.success("jobseeker deleted successfully");
    } catch (error) {
      console.error("Error deleting jobseeker:", error);
      // Show an error message using toast or any other notification library
      toast.error("Error deleting jobseeker");
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
      import
      <h1>Jobseekers Details</h1>
      <table className="products-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobseekers.map((jobseeker) => (
            <tr key={jobseeker.id}>
              <td>{jobseeker.usernamejobseek}</td>
              <td>{jobseeker.firstnamejobseek}</td>
              <td>{jobseeker.lastnamejobseek}</td>
              <td>{jobseeker.emailjobseek}</td>
              <td>
                <button onClick={() => handleDelete(jobseeker._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Jobseekdash;
