import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/admindash.css";
import logoutimage from "../Images/logout.png";

const Admindash = () => {
  const navigate = useNavigate();
  const [employers, setEmployers] = useState([]);

  const handleEmployers = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://allinone-14n7.onrender.com/employer/getAll"
      );
      setEmployers(response.data);
    } catch (error) {
      console.error("Error fetching employers:", error.message);
    }
  };

  useEffect(() => {
    // Fetch employers when the component mounts
    handleEmployers();
  }, []); // Empty dependency array to run the effect only once

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
      </div>
      <table className="products-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employers.map((employer) => (
            <tr key={employer._id}>
              <td>{employer.usernameEmployer}</td>
              <td>{employer.firstnameEmployer}</td>
              <td>{employer.lastnameEmployer}</td>
              <td>{employer.emailEmployer}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <img
        className="logout-image-123"
        src={logoutimage}
        onClick={handleLogout}
        alt="Logout"
      />
    </div>
  );
};

export default Admindash;
