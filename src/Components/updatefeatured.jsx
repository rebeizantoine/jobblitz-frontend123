import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "../Styles/updatefeatured.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logoutimage from "../Images/logout.png";
import "../Styles/removejob.css";

const UpdateFeatured = () => {
  const navigate = useNavigate();
  const [featuredEmployers, setFeaturedEmployers] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newEmployerName, setNewEmployerName] = useState("");
  const [newEmployerImage, setNewEmployerImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchFeaturedEmployers = async () => {
      try {
        const response = await axios.get(
          "https://allinone-14n7.onrender.com/featuredemployer"
        );
        setFeaturedEmployers(response.data);
      } catch (error) {
        console.error("Error fetching featured employers:", error);
      }
    };

    fetchFeaturedEmployers();
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
  const openUpdateModal = (employer) => {
    setSelectedEmployer(employer);
    setModalIsOpen(true);
    setNewEmployerName(employer.employerName);
    // You can also set the current employerImage if you want to show it in the modal
  };

  const closeUpdateModal = () => {
    setModalIsOpen(false);
    setSelectedEmployer(null);
    setNewEmployerName("");
    setNewEmployerImage(null);
  };

  const updateFeatured = async () => {
    try {
      // You can implement the logic to update the featured employer
      // Send a request to your server to update the employerName and employerImage
      // with the values in newEmployerName and newEmployerImage
      // You may use formData to handle file uploads
      const formData = new FormData();
      formData.append("employerName", newEmployerName);
      formData.append("employerImage", newEmployerImage);

      await axios.put(
        `https://allinone-14n7.onrender.com/featuredemployer/updateFeaturedEmployer/${selectedEmployer._id}`,
        formData
      );

      // Close the modal and fetch updated data
      closeUpdateModal();
      const updatedResponse = await axios.get(
        "https://allinone-14n7.onrender.com/featuredemployer"
      );
      setFeaturedEmployers(updatedResponse.data);
      toast(`${newEmployerName} was updated successfully`);
    } catch (error) {
      console.error("Error updating featured employer:", error);
      toast.error("Error updating featured employer");
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }

    setNewEmployerImage(file);
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

      <div>
        <h2>Featured Employers</h2>
        <ToastContainer />
        {featuredEmployers.map((employer) => (
          <div key={employer._id} className="featured-employer">
            <img src={employer.employerImage} alt={employer.employerName} />
            <p>{employer.employerName}</p>
            <button onClick={() => openUpdateModal(employer)}>Update</button>
            <button onClick={(e) => removeJob(e, employer._id)}>Remove</button>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeUpdateModal}
        contentLabel="Update Employer Modal"
        className="Modal"
        ariaHideApp={false}
      >
        <h2>Update Employer</h2>
        <form>
          <label className="label-to-fix">
            Employer Name:
            <input
              type="text"
              value={newEmployerName}
              onChange={(e) => setNewEmployerName(e.target.value)}
            />
          </label>
          <label>
            Employer Image:
            <input type="file" onChange={handleImageChange} />
          </label>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              className="selected-image"
            />
          )}
          <button type="button" onClick={updateFeatured}>
            Update
          </button>
          <button type="button" onClick={closeUpdateModal}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateFeatured;
