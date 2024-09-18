import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Modal from "react-modal";
import editgreenimage from "../Images/edit-green.png";
import "../Styles/updateterms.css";
import logoutimage from "../Images/logout.png";
import "../Styles/removejob.css";

const Updateterms = () => {
  const navigate = useNavigate();
  const [terms, setTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updatedTerm, setUpdatedTerm] = useState({
    termsofuse1: "",
    termsofuse2: "",
    termsofuse3: "",
    privacypolicy: "",
    cookies: "",
    changestostatement: "",
  });

  const fetchTerms = async () => {
    try {
      const response = await axios.get(
        "https://allinone-14n7.onrender.com/terms/terms"
      );
      setTerms(response.data);
    } catch (error) {
      console.error("Error fetching Terms:", error);
    }
  };

  useEffect(() => {
    fetchTerms();
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

  const handleEditClick = (term) => {
    setSelectedTerm(term);
    setUpdatedTerm({
      termsofuse1: term.termsofuse1,
      termsofuse2: term.termsofuse2,
      termsofuse3: term.termsofuse3,
      privacypolicy: term.privacypolicy,
      cookies: term.cookies,
      changestostatement: term.changestostatement,
    });
    setModalIsOpen(true);
  };

  const handleUpdateTerm = async () => {
    try {
      const response = await axios.put(
        `https://allinone-14n7.onrender.com/terms/terms/update/${selectedTerm._id}`,
        updatedTerm
      );

      console.log("Term updated successfully:", response.data);
      fetchTerms();
      setModalIsOpen(false);
      toast.success("Term updated successfully!");
    } catch (error) {
      console.error("Error updating term:", error);
      toast.error("Error updating term");
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
        <a href="" className="sidebar-a" onClick={() => setModalIsOpen(true)}>
          Update terms
        </a>
        <img
          className="logout-dash-image"
          src={logoutimage}
          onClick={handleLogout}
          alt=""
        />
      </div>
      <h1 className="editing-page-h1">Terms and Conditions</h1>
      <div className="terms-and-privacy">
        {terms.map((term) => (
          <div key={term._id}>
            <div className="terms-of-use-title">
              <h1>Terms of Use & Privacy Policy</h1>
            </div>
            <div className="terms-of-use-second-box">
              <p>{term.termsofuse1}</p>
              <p>{term.termsofuse2}</p>
              <p>{term.termsofuse3}</p>
            </div>
            <div className="privacy-policy">
              <h1>Privacy Policy</h1>
              <p>{term.privacypolicy}</p>
            </div>
            <div className="cookies">
              <h1>Cookies</h1>
              <p>{term.cookies}</p>
            </div>
            <div className="privacy-statement">
              <h1>Changes to Privacy Statement</h1>
              <p>{term.changestostatement}</p>
            </div>
            <div className="button-edit-terms">
              <img
                src={editgreenimage}
                onClick={() => handleEditClick(term)}
                alt=""
              />
            </div>
            <ToastContainer />
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Update Term Modal"
        className="Modal123"
        ariaHideApp={false}
      >
        <h2 className="modal-title">Update Term</h2>
        <form>
          <div className="form-group">
            <label htmlFor="newtermsofuse1">New Terms of Use 1:</label>
            <textarea
              id="newtermsofuse1"
              className="newtermsofuse1"
              value={updatedTerm.termsofuse1}
              onChange={(e) =>
                setUpdatedTerm({
                  ...updatedTerm,
                  termsofuse1: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="newtermsofuse2">New Terms of Use 2:</label>
            <textarea
              id="newtermsofuse2"
              value={updatedTerm.termsofuse2}
              onChange={(e) =>
                setUpdatedTerm({
                  ...updatedTerm,
                  termsofuse2: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="newtermsofuse3">New Terms of Use 3:</label>
            <textarea
              id="newtermsofuse3"
              value={updatedTerm.termsofuse3}
              onChange={(e) =>
                setUpdatedTerm({
                  ...updatedTerm,
                  termsofuse3: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="newprivacypolicy">New Privacy Policy:</label>
            <textarea
              id="newprivacypolicy"
              value={updatedTerm.privacypolicy}
              onChange={(e) =>
                setUpdatedTerm({
                  ...updatedTerm,
                  privacypolicy: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="newcookies">New Cookies:</label>
            <textarea
              id="newcookies"
              value={updatedTerm.cookies}
              onChange={(e) =>
                setUpdatedTerm({
                  ...updatedTerm,
                  cookies: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="newchangestostatement">
              New Changes to Privacy Statement:
            </label>
            <textarea
              id="newchangestostatement"
              value={updatedTerm.changestostatement}
              onChange={(e) =>
                setUpdatedTerm({
                  ...updatedTerm,
                  changestostatement: e.target.value,
                })
              }
            />
          </div>
          <div className="button-update-terms">
            <button type="button" onClick={handleUpdateTerm}>
              Update
            </button>
            <button type="button" onClick={() => setModalIsOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Updateterms;
