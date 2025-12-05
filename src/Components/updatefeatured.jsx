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
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);

  // ---------------------------------------------------------
  // Load all featured employers
  // ---------------------------------------------------------
  useEffect(() => {
    fetchFeaturedEmployers();
  }, []);

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

  // ---------------------------------------------------------
  // Navigation (sidebar)
  // ---------------------------------------------------------
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  const goEmployers = () => navigate("/employerdash");
  const goSeekers = () => navigate("/jobseekdash");
  const goRemoveJob = () => navigate("/removejob");
  const goUpdateTerms = () => navigate("/updateterms");

  // ---------------------------------------------------------
  // Open Update Modal
  // ---------------------------------------------------------
  const openUpdateModal = (employer) => {
    setSelectedEmployer(employer);
    setNewEmployerName(employer.employerName);
    setModalIsOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedEmployer(null);
    setModalIsOpen(false);
    setNewEmployerName("");
    setNewEmployerImage(null);
    setSelectedImagePreview(null);
  };

  // ---------------------------------------------------------
  // Update Employer
  // ---------------------------------------------------------
  const updateFeatured = async () => {
    try {
      const formData = new FormData();
      formData.append("employerName", newEmployerName);

      if (newEmployerImage) {
        formData.append("employerImage", newEmployerImage);
      }

      await axios.put(
        `https://allinone-14n7.onrender.com/featuredemployer/updateFeaturedEmployer/${selectedEmployer._id}`,
        formData
      );

      toast.success(`${newEmployerName} updated successfully`);
      closeUpdateModal();
      fetchFeaturedEmployers();
    } catch (error) {
      console.error("Error updating employer", error);
      toast.error("Failed to update employer.");
    }
  };

  // Handle choosing image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setNewEmployerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ---------------------------------------------------------
  // Delete Employer
  // ---------------------------------------------------------
  const deleteFeaturedEmployer = async (id) => {
    if (!window.confirm("Are you sure you want to remove this employer?"))
      return;

    try {
      await axios.delete(
        `https://allinone-14n7.onrender.com/featuredemployer/deleteFeaturedEmployer/${id}`
      );

      toast.success("Employer removed successfully!");
      fetchFeaturedEmployers();
    } catch (error) {
      console.error("Error deleting employer:", error);
      toast.error("Failed to delete employer.");
    }
  };

  return (
    <div>
      <ToastContainer />

      {/* ---------------------------------------------------------
         Sidebar
      --------------------------------------------------------- */}
      <div className="sidebar">
        <a className="sidebar-a" onClick={goEmployers}>
          View Employers
        </a>

        <a className="sidebar-a" onClick={goRemoveJob}>
          Remove Job
        </a>

        <a className="sidebar-a" onClick={goSeekers}>
          View Seekers
        </a>

        <a className="sidebar-a">Update Featured</a>

        <a className="sidebar-a" onClick={goUpdateTerms}>
          Update Terms
        </a>

        <img
          className="logout-dash-image"
          src={logoutimage}
          onClick={handleLogout}
          alt="logout"
        />
      </div>

      {/* ---------------------------------------------------------
         Featured Employers List
      --------------------------------------------------------- */}
      <div className="featured-container">
        <h2>Featured Employers</h2>

        {featuredEmployers.map((employer) => (
          <div key={employer._id} className="featured-employer">
            <img src={employer.employerImage} alt={employer.employerName} />

            <p>{employer.employerName}</p>

            <button onClick={() => openUpdateModal(employer)}>Update</button>

            <button onClick={() => deleteFeaturedEmployer(employer._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------
         UPDATE MODAL
      --------------------------------------------------------- */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeUpdateModal}
        contentLabel="Update Employer Modal"
        className="Modal"
        ariaHideApp={false}
      >
        <h2>Update Employer</h2>

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

        {selectedImagePreview && (
          <img
            src={selectedImagePreview}
            alt="Preview"
            className="selected-image"
          />
        )}

        <div className="modal-buttons">
          <button onClick={updateFeatured}>Update</button>
          <button onClick={closeUpdateModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateFeatured;
