import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/employerpp.css";
import editimage from "../Images/edit123.png";
import editimage123 from "../Images/edit123.png";
import editimage456 from "../Images/edit123.png";
import handsalary from "../Images/hand-salary.png";
import topimage from "../Images/face.png";
import deleteimage from "../Images/remove.png";
import logoutimage from "../Images/logout.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Employerpp = () => {
  const { usernameEmployer } = useParams();
  const [employerData, setEmployerData] = useState(null);
  const [jobApplications, setJobApplications] = useState([]);
  const navigate = useNavigate();

  const [highestBoxEditMode, setHighestBoxEditMode] = useState(false);
  const [highestBoxEditedData, setHighestBoxEditedData] = useState({
    locationEmployer: "",
    educationEmployer: "",
    experienceEmployer: "",
    companyrecruitingfor: "",
  });

  const [otherBoxesEditMode, setOtherBoxesEditMode] = useState(false);
  const [otherBoxesEditedData, setOtherBoxesEditedData] = useState({
    companyName: "",
    companyType: "",
    companyCountry: "",
    companyPhone: "",
    companyProfile: "",
    companyNumberofemployees: "",
    companyWebsite: "",
  });
  const [contactInfoEditMode, setContactInfoEditMode] = useState(false);
  const [contactInfoEditedData, setContactInfoEditedData] = useState({
    emailEmployer: "",
    phoneEmployer: "",
  });

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await axios.get(
          `https://allinone-14n7.onrender.com/jobdescriptions/employer/${usernameEmployer}`
        );
        setJobApplications(response.data);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };
    fetchJobApplications();
  }, [usernameEmployer]);

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        const response = await axios.get(
          `https://allinone-14n7.onrender.com/employer/employers/username/${usernameEmployer}`
        );
        setEmployerData(response.data.data);
      } catch (error) {
        console.error("Error fetching employer data:", error);
      }
    };
    fetchEmployerData();
  }, [usernameEmployer]);

  const handleHighestBoxEditSave = async () => {
    try {
      await axios.put(
        `https://allinone-14n7.onrender.com/employer/employers/update/${employerData._id}`,
        highestBoxEditedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = await axios.get(
        `https://allinone-14n7.onrender.com/employer/employers/username/${usernameEmployer}`
      );
      setEmployerData(response.data.data);
      setHighestBoxEditMode(false);
      toast.success("data updated successfully");
    } catch (error) {
      console.error("Error updating employer data:", error);
    }
  };

  const handleOtherBoxesEditSave = async () => {
    try {
      await axios.put(
        `https://allinone-14n7.onrender.com/employer/employers/update/${employerData._id}`,
        otherBoxesEditedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = await axios.get(
        `https://allinone-14n7.onrender.com/employer/employers/username/${usernameEmployer}`
      );
      setEmployerData(response.data.data);
      setOtherBoxesEditMode(false);
      toast.success("data updated successfully");
    } catch (error) {
      console.error("Error updating employer data:", error);
    }
  };

  const handleContactInfoEditSave = async () => {
    try {
      await axios.put(
        `https://allinone-14n7.onrender.com/employer/employers/update/${employerData._id}`,
        contactInfoEditedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await axios.get(
        `https://allinone-14n7.onrender.com/employer/employers/username/${usernameEmployer}`
      );
      setEmployerData(response.data.data);
      setContactInfoEditMode(false);
      toast.success("Contact information updated successfully");
    } catch (error) {
      console.error("Error updating contact information:", error);
    }
  };

  const handleDeleteJobDescription = async (id) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this job listing?"
      );
      if (!isConfirmed) {
        return; // Do nothing if not confirmed
      }

      await axios.delete(
        `https://allinone-14n7.onrender.com/jobdescriptions/delete/${id}`
      );
      // Fetch job applications again after deletion
      const response = await axios.get(
        `https://allinone-14n7.onrender.com/jobdescriptions/employer/${usernameEmployer}`
      );
      setJobApplications(response.data);
      toast.success("Job application deleted successfully");
    } catch (error) {
      console.error("Error deleting job application:", error);
    }
  };
  const handleJobApplicationClick = (id) => {
    // Navigate to the job description page
    navigate(`/jobdescriptions/jobdescriptions/${id}`);
  };
  const handlePostJobClick = () => {
    // Navigate to the job post page for the specific employer
    navigate(`/jobpost/${usernameEmployer}`);
  };

  if (!employerData) {
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

      <div className="highest-box-1">
        <div className="image-highest">
          <div className="circular-avatar">
            <span>{employerData.firstnameEmployer.charAt(0)}</span>
            <span>{employerData.lastnameEmployer.charAt(0)}</span>
          </div>
        </div>
        <div className="profilething">
          <h2 className="profilethingh2">{`${employerData.firstnameEmployer} ${employerData.lastnameEmployer}`}</h2>
          <div className="info-box">
            <div className="info-item1">
              <div className="pergunta">
                <strong>Location:</strong>
              </div>
              <div className="answer12">
                {highestBoxEditMode ? (
                  <input
                    type="text"
                    value={highestBoxEditedData.locationEmployer}
                    onChange={(e) =>
                      setHighestBoxEditedData({
                        ...highestBoxEditedData,
                        locationEmployer: e.target.value,
                      })
                    }
                  />
                ) : (
                  employerData.locationEmployer
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
                    value={highestBoxEditedData.educationEmployer}
                    onChange={(e) =>
                      setHighestBoxEditedData({
                        ...highestBoxEditedData,
                        educationEmployer: e.target.value,
                      })
                    }
                  />
                ) : (
                  employerData.educationEmployer
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
                    value={highestBoxEditedData.experienceEmployer}
                    onChange={(e) =>
                      setHighestBoxEditedData({
                        ...highestBoxEditedData,
                        experienceEmployer: e.target.value,
                      })
                    }
                  />
                ) : (
                  employerData.experienceEmployer
                )}
              </div>
            </div>

            <div className="info-item1">
              <div className="pergunta-special">
                <strong>Company recruiting for:</strong>
              </div>
              <div className="answer12">
                {highestBoxEditMode ? (
                  <input
                    type="text"
                    value={highestBoxEditedData.companyrecruitingfor}
                    onChange={(e) =>
                      setHighestBoxEditedData({
                        ...highestBoxEditedData,
                        companyrecruitingfor: e.target.value,
                      })
                    }
                  />
                ) : (
                  employerData.companyrecruitingfor
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
              <button onClick={() => handleHighestBoxEditSave()}>Save</button>
              <button onClick={() => setHighestBoxEditMode(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="second-box">
        <h2>Employer Information</h2>
        <div className="info-box-1">
          <div className="info-item1-1">
            <div className="pergunta-1">
              <strong>Name:</strong>
            </div>
            <div className="answer-1">{`${employerData.firstnameEmployer} ${employerData.lastnameEmployer}`}</div>
          </div>

          <div className="info-item1-1">
            <div className="pergunta-1">
              <strong>Birth Date:</strong>
            </div>
            <div className="answer-1">22-03-2000</div>
          </div>

          <div className="info-item1-1">
            <div className="pergunta-1">
              <strong>Gender:</strong>
            </div>
            <div className="answer-1">{employerData.genderEmployer}</div>
          </div>

          <div className="info-item1-1">
            <div className="pergunta-1">
              <strong>Nationality:</strong>
            </div>
            <div className="answer-1">{employerData.nationalityEmployer}</div>
          </div>

          <div className="info-item1-1">
            <div className="pergunta-1">
              <strong>Residence Country:</strong>
            </div>
            <div className="answer-1">Lebanon</div>
          </div>

          <div className="info-item1-1">
            <div className="pergunta-1">
              <strong>Email:</strong>
            </div>
            <div className="answer-1">{employerData.emailEmployer}</div>
          </div>
        </div>
      </div>

      <div className="beforeside">
        <h2>Company Information</h2>
        <div className="info-item1-1">
          <div className="pergunta-1">
            <strong>Company Name:</strong>
          </div>
          <div className="answer-1">{employerData.companyName}</div>
        </div>
        <div className="info-item1-1">
          <div className="pergunta-1">
            <strong>Company Type:</strong>
          </div>
          <div className="answer-1">{employerData.companyType}</div>
        </div>
        <div className="info-item1-1">
          <div className="pergunta-1">
            <strong>Country:</strong>
          </div>
          <div className="answer-1">{employerData.companyCountry}</div>
        </div>
        <div className="info-item1-1">
          <div className="pergunta-1">
            <strong>Address:</strong>
          </div>
          <div className="answer-1">{employerData.nationalityEmployer}</div>
        </div>
        <div className="info-item1-1">
          <div className="pergunta-1">
            <strong>Phone:</strong>
          </div>
          <div className="answer-1">{employerData.companyPhone}</div>
        </div>
        <div className="info-item1-1">
          <div className="pergunta-1">
            <strong>Company Profile:</strong>
          </div>
          <div className="answer-1">{employerData.companyProfile}</div>
        </div>
        <div className="info-item1-1">
          <div className="pergunta-1">
            <strong>Number of employees:</strong>
          </div>
          <div className="answer-1">
            {employerData.companyNumberofemployees}
          </div>
        </div>
        <div className="info-item1-1">
          <div className="pergunta-1">
            <strong>Website:</strong>
          </div>
          <div className="answer-1">{employerData.companyWebsite}</div>
        </div>

        {otherBoxesEditMode ? (
          <div className="editing-box">
            <div className="info-box-1">
              <label>
                Company Name:
                <input
                  type="text"
                  value={otherBoxesEditedData.companyName}
                  onChange={(e) =>
                    setOtherBoxesEditedData({
                      ...otherBoxesEditedData,
                      companyName: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="info-box-1">
              <label>
                Company Type:
                <input
                  type="text"
                  value={otherBoxesEditedData.companyType}
                  onChange={(e) =>
                    setOtherBoxesEditedData({
                      ...otherBoxesEditedData,
                      companyType: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="info-box-1">
              <label>
                Company Country:
                <input
                  type="text"
                  value={otherBoxesEditedData.companyCountry}
                  onChange={(e) =>
                    setOtherBoxesEditedData({
                      ...otherBoxesEditedData,
                      companyCountry: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="info-box-1">
              <label>
                Company Phone:
                <input
                  type="text"
                  value={otherBoxesEditedData.companyPhone}
                  onChange={(e) =>
                    setOtherBoxesEditedData({
                      ...otherBoxesEditedData,
                      companyPhone: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="info-box-1">
              <label>
                Company Profile:
                <textarea
                  value={otherBoxesEditedData.companyProfile}
                  onChange={(e) =>
                    setOtherBoxesEditedData({
                      ...otherBoxesEditedData,
                      companyProfile: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="info-box-1">
              <label>
                Number of Employees:
                <input
                  type="text"
                  value={otherBoxesEditedData.companyNumberofemployees}
                  onChange={(e) =>
                    setOtherBoxesEditedData({
                      ...otherBoxesEditedData,
                      companyNumberofemployees: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="info-box-1">
              <label>
                Company Website:
                <input
                  type="text"
                  value={otherBoxesEditedData.companyWebsite}
                  onChange={(e) =>
                    setOtherBoxesEditedData({
                      ...otherBoxesEditedData,
                      companyWebsite: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <button onClick={() => handleOtherBoxesEditSave()}>Save</button>
            <button onClick={() => setOtherBoxesEditMode(false)}>Cancel</button>
          </div>
        ) : (
          <div className="info-box-12">
            <img
              onClick={() => setOtherBoxesEditMode(true)}
              className="imageofedit"
              src={editimage}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="sidebyside">
        <div className="third-box1">
          <h2>Contact Information</h2>
          <p>
            This is the only way for job seekers to reach out to you. Make sure
            you add your contact details correctly.
          </p>
          <div className="info-item1-1">
            {contactInfoEditMode ? (
              <div className="info-box-123">
                <label>
                  Email address:
                  <input
                    type="text"
                    value={contactInfoEditedData.emailEmployer}
                    onChange={(e) =>
                      setContactInfoEditedData({
                        ...contactInfoEditedData,
                        emailEmployer: e.target.value,
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
                <div className="answer-12345">{employerData.emailEmployer}</div>
              </div>
            )}

            {contactInfoEditMode ? (
              <div className="info-box-12-edit">
                <label>
                  Mobile number:
                  <input
                    type="text"
                    value={contactInfoEditedData.phoneEmployer}
                    onChange={(e) =>
                      setContactInfoEditedData({
                        ...contactInfoEditedData,
                        phoneEmployer: e.target.value,
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
                <div className="answer-123456">
                  {employerData.phoneEmployer}
                </div>
              </div>
            )}

            {contactInfoEditMode ? (
              <div className="editing-box123">
                <button onClick={() => handleContactInfoEditSave()}>
                  Save
                </button>
                <button onClick={() => setContactInfoEditMode(false)}>
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
        <div className="fourth-box1">
          <h2>Upload Company Logo</h2>
          <div className="flex-logo">
            <div>
              <p>Attach Your Company Logo here</p>
              <button>Attach Logo</button>
            </div>
            <img src={topimage} alt="" />
          </div>
        </div>
      </div>

      <div className="before-last-box">
        <h2>Company job applications</h2>
        <div className="post-job-button1">
          <button onClick={handlePostJobClick}>Post a Job</button>
        </div>
      </div>

      <div
        className="last-box"
        onClick={() => navigate(`/jobdescriptiontrial/${usernameEmployer}`)}
      >
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

export default Employerpp;
