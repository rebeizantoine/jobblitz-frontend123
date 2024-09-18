import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logoutimage from "../Images/logout.png";
import "../Styles/employerdash.css";

const Employerdash = () => {
  const navigate = useNavigate();
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await axios.get(
          "https://allinone-14n7.onrender.com/employer/getAll"
        );
        setEmployers(response.data);
      } catch (error) {
        console.error("Error fetching employers:", error);
      }
    };

    fetchEmployers();
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
  const handleDelete = async (employerId) => {
    try {
      // Send a DELETE request to your backend to delete the employer
      if (!employerId) {
        // If employerId is not available, show an error message
        throw new Error("Invalid employerId");
      }
      await axios.delete(
        `https://allinone-14n7.onrender.com/employer/employers/delete/${employerId}`
      );
      // Update the state to reflect the changes
      setEmployers((prevEmployers) =>
        prevEmployers.filter((employer) => employer._id !== employerId)
      );

      // Show a success message using toast or any other notification library
      toast.success("Employer deleted successfully");
    } catch (error) {
      console.error("Error deleting employer:", error);
      // Show an error message using toast or any other notification library
      toast.error("Error deleting employer");
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
      <h1>Employers Details</h1>
      <table className="products-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employers.map((employer) => (
            <tr key={employer.id}>
              <td>{employer.usernameEmployer}</td>
              <td>{employer.firstnameEmployer}</td>
              <td>{employer.lastnameEmployer}</td>
              <td>{employer.emailEmployer}</td>
              <td>{employer.companyName}</td>
              <td>
                <button onClick={() => handleDelete(employer._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Employerdash;
