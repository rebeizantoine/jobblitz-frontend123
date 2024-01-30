import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/jobseekpp.css";
import deleteimage from "../Images/remove.png";
import editimage from "../Images/edit123.png";
import editimage123 from "../Images/edit123.png";
import editimage456 from "../Images/edit123.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import handsalary from "../Images/hand-salary.png";
import topimage from "../Images/face.png";
import logoutimage from "../Images/logout.png";

const Jobseekpp = () => {
  const { usernamejobseek } = useParams();
  const [jobseekData, setJobseekData] = useState(null);
  const [cvFile, setCVFile] = useState(null);
  const navigate = useNavigate();

  const [highestBoxEditMode, setHighestBoxEditMode] = useState(false);
  const [highestBoxEditedData, setHighestBoxEditedData] = useState({
    locationjobseek: "",
    educationjobseek: "",
    experiencejobseek: "",
  });
  const [contactInfoEditMode, setContactInfoEditMode] = useState(false);
  const [contactInfoEditedData, setContactInfoEditedData] = useState({
    emailjobseek: "",
    phonejobseek: "",
  });
  const handleHighestBoxEditSave = async () => {
    try {
      await axios.put(
        `https://backendjobblitz.onrender.com/jobseeker/jobseekers/${jobseekData._id}`,
        highestBoxEditedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = await axios.get(
        `https://backendjobblitz.onrender.com/jobseeker/jobseekers/username/${usernamejobseek}`
      );
      setJobseekData(response.data.data);
      setHighestBoxEditMode(false);
      toast.success("data updated successfully");
    } catch (error) {
      console.error("Error updating jobseek data:", error);
    }
  };
  const handleFileChange = (event) => {
    // Handle the file change event and set the selected file in the state
    const file = event.target.files[0];
    setCVFile(file);
  };
  const handleUploadCV = async () => {
    try {
      const formData = new FormData();
      formData.append("cvFile", cvFile);

      const response = await axios.post(
        `https://backendjobblitz.onrender.com/cv/${jobseekData._id}`, // Update the URL to match your backend route
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Assuming the backend returns the uploaded CV file path
      const uploadedCVPath = response.data.uploadedCVPath;

      // Update the jobseeker data with the uploaded CV path
      await axios.put(
        `https://backendjobblitz.onrender.com/jobseeker/jobseekers/${jobseekData._id}`,
        { cvjobseek: uploadedCVPath },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("CV file uploaded successfully");
    } catch (error) {
      console.error("Error uploading CV file:", error);
      toast.error("Error uploading CV file");
    }
  };
  const handleContactInfoEditSave = async () => {
    try {
      await axios.put(
        `https://backendjobblitz.onrender.com/jobseeker/jobseekers/${jobseekData._id}`,
        contactInfoEditedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await axios.get(
        `https://backendjobblitz.onrender.com/jobseeker/jobseekers/username/${usernamejobseek}`
      );
      setJobseekData(response.data.data);
      setContactInfoEditMode(false);
      toast.success("Contact information updated successfully");
    } catch (error) {
      console.error("Error updating contact information:", error);
    }
  };
  const handleAttachCVClick = () => {
    // Trigger the click event on the hidden file input
    document.getElementById("cvInput").click();
  };
  useEffect(() => {
    const fetchJobseekData = async () => {
      try {
        const response = await axios.get(
          `https://backendjobblitz.onrender.com/jobseeker/jobseekers/username/${usernamejobseek}`
        );
        setJobseekData(response.data);

        // Assuming response.data contains the job seeker data
      } catch (error) {
        console.error("Error fetching job seeker data:", error);
      }
    };

    fetchJobseekData();
  }, [usernamejobseek]);
  if (!jobseekData) {
    return <div>Loading...</div>;
  }
  const handleLogout = () => {
    // Clear sessionStorage and navigate to '/'
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <div className="all-boxes-jobseek">
      <div className="logout-container">
        {" "}
        <img
          onClick={handleLogout}
          className="logout-image"
          src={logoutimage}
          alt="Logout"
        />
        <h3>Logout</h3>
      </div>
      <div className="highest-box">
        <div className="image-highest">
          <div className="circular-avatar">
            <span>{jobseekData.firstnamejobseek.charAt(0)}</span>
            <span>{jobseekData.lastnamejobseek.charAt(0)}</span>
          </div>
        </div>
        <div className="profilething">
          <h2>{`${jobseekData.firstnamejobseek} ${jobseekData.lastnamejobseek}`}</h2>
          <div className="info-box">
            <div className="info-item1">
              <div className="pergunta">
                <strong>Location:</strong>
              </div>
              <div className="answer12">
                {highestBoxEditMode ? (
                  <input
                    type="text"
                    value={highestBoxEditedData.locationjobseek}
                    onChange={(e) =>
                      setHighestBoxEditedData({
                        ...highestBoxEditedData,
                        locationjobseek: e.target.value,
                      })
                    }
                  />
                ) : (
                  jobseekData.locationjobseek
                )}
              </div>
            </div>

            <div className="info-item1">
              <div className="pergunta">
                <strong>Education:</strong>
              </div>
              <div className="answer12">
                {highestBoxEditMode ? (
                  <input
                    type="text"
                    value={highestBoxEditedData.educationjobseek}
                    onChange={(e) =>
                      setHighestBoxEditedData({
                        ...highestBoxEditedData,
                        educationjobseek: e.target.value,
                      })
                    }
                  />
                ) : (
                  jobseekData.educationjobseek
                )}
              </div>
            </div>

            <div className="info-item1">
              <div className="pergunta">
                <strong>Experience:</strong>
              </div>
              <div className="answer12">
                {highestBoxEditMode ? (
                  <input
                    type="text"
                    value={highestBoxEditedData.experiencejobseek}
                    onChange={(e) =>
                      setHighestBoxEditedData({
                        ...highestBoxEditedData,
                        experiencejobseek: e.target.value,
                      })
                    }
                  />
                ) : (
                  jobseekData.experiencejobseek
                )}
              </div>
            </div>
          </div>
          {!highestBoxEditMode ? (
            <img
              className="editimage123"
              onClick={() => setHighestBoxEditMode(true)}
              src={editimage123}
              alt=""
            />
          ) : (
            <div>
              <button
                className="save-top-1"
                onClick={() => handleHighestBoxEditSave()}
              >
                Save
              </button>
              <button onClick={() => setHighestBoxEditMode(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="second-box">
        <h2>Personal Information</h2>
        <div className="info-box-1">
          <div className="info-item-1">
            <div className="pergunta-1">
              {" "}
              <strong>Name:</strong>
            </div>{" "}
            <div className="answer-1">
              {jobseekData.firstnamejobseek} {jobseekData.lastnamejobseek}
            </div>
          </div>
          <div className="info-item-1">
            <div className="pergunta-1">
              {" "}
              <strong>Gender:</strong>
            </div>{" "}
            <div className="answer-1">{jobseekData.genderjobseek}</div>
          </div>
          <div className="info-item-1">
            <div className="pergunta-1">
              {" "}
              <strong>Nationality:</strong>
            </div>{" "}
            <div className="answer-1">{jobseekData.Nationalityjobseek}</div>
          </div>
          <div className="info-item-1">
            <div className="pergunta-1">
              {" "}
              <strong>Residence Country:</strong>
            </div>{" "}
            <div className="answer-1">{jobseekData.addressjobseek}</div>{" "}
          </div>
        </div>
      </div>
      <div className="sidebyside">
        <div className="third-box1">
          <h2>Contact Information</h2>
          <p>
            This is the only way for employers to reach out to you. Make sure
            you add your contact details correctly.
          </p>
          <div className="info-item1-1">
            {contactInfoEditMode ? (
              <div className="info-box-123">
                <label>
                  Email address:
                  <input
                    type="text"
                    value={contactInfoEditedData.emailjobseek}
                    onChange={(e) =>
                      setContactInfoEditedData({
                        ...contactInfoEditedData,
                        emailjobseek: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
            ) : (
              <div className="info-box-1">
                <div className="pergunta-12345">
                  <strong>Email address</strong>
                </div>
                <div className="answer-12345">{jobseekData.emailjobseek}</div>
              </div>
            )}

            {contactInfoEditMode ? (
              <div className="info-box-12-edit">
                <label>
                  Mobile number:
                  <input
                    type="text"
                    value={contactInfoEditedData.phonejobseek}
                    onChange={(e) =>
                      setContactInfoEditedData({
                        ...contactInfoEditedData,
                        phonejobseek: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
            ) : (
              <div className="info-box-1234">
                <div className="pergunta-123456">
                  <strong>Mobile number:</strong>
                </div>
                <div className="answer-123456">{jobseekData.phonejobseek}</div>
              </div>
            )}

            {contactInfoEditMode ? (
              <div className="editing-box123">
                <button
                  className="editing12345"
                  onClick={() => handleContactInfoEditSave()}
                >
                  Save
                </button>
                <button
                  className="editing12345"
                  onClick={() => setContactInfoEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <img
                onClick={() => setContactInfoEditMode(true)}
                className="imageofedit2"
                src={editimage456}
                alt=""
              />
            )}
          </div>
        </div>
        {/* <div className="fourth-box">
          <h2>Upload CV File</h2>
          <p>
            Attaching your CV file will help jobseeks to learn further about you
          </p>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUploadCV}>Attach CV</button>
        </div> */}
      </div>
      <div className="last-box">
        <div className="inside-last-box">
          <h2>My job applications</h2>
          <h3>IT Help Desk Support</h3>
          <div className="flex-1">
            <h4>ONIX IT SOLUTIONS &nbsp;&nbsp;&nbsp;&nbsp;. </h4>
            <div className="job-location">
              <h5>Jounieh,Lebanon </h5>
            </div>
          </div>
          <p className="description-small">
            We are seeking a highly motivated and curstomer-oriented IT Help
            Desk Support Specialist to join our IT
          </p>
          <div className="flex-2">
            <img src={handsalary} alt="" />{" "}
            <p className="money">$1,000 - $1,500</p>{" "}
            <p className="datenow">6 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobseekpp;
