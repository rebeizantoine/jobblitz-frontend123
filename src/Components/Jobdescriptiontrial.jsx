import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/jobdescriptiontrial.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import editgreen from "../Images/edit-green.png";

const JobDescriptionBox = (props) => {
  const {
    job,
    isEditing,
    editedJob,
    onEditClick,
    onCancelEdit,
    onSaveEdit,
    onInputChange,
  } = props;

  return (
    <div className="job-description-box">
      <h1 className="title-position">
        {isEditing ? (
          <label>
            Job Title:
            <input
              type="text"
              name="jobtitle"
              className="job-title-edit"
              value={editedJob.jobtitle}
              onChange={onInputChange}
            />
          </label>
        ) : (
          job.jobtitle
        )}
      </h1>
      <h2 className="company-position">
        {isEditing ? (
          <label>
            Company Name:
            <input
              type="text"
              name="companyname"
              className="job-title-edit-1"
              value={editedJob.companyname}
              onChange={onInputChange}
            />
          </label>
        ) : (
          job.companyname
        )}
      </h2>
      <div className="first-flex1">
        <div className="location-position">
          {isEditing ? (
            <label>
              Location:
              <input
                type="text"
                name="location"
                className="job-title-edit-2"
                value={editedJob.location}
                onChange={onInputChange}
              />
            </label>
          ) : (
            job.location
          )}
        </div>
        <div className="date-position">7 days ago</div>
      </div>

      {isEditing ? (
        <div>
          <label>
            Job Overview:
            <textarea
              name="joboverview"
              value={editedJob.joboverview}
              onChange={onInputChange}
            />
          </label>

          <label>
            Responsibilities 1:
            <input
              type="text"
              name="responsibilities1"
              value={editedJob.responsibilities1}
              onChange={onInputChange}
            />
          </label>

          <label>
            Responsibilities 2:
            <input
              type="text"
              name="responsibilities2"
              value={editedJob.responsibilities2}
              onChange={onInputChange}
            />
          </label>

          <label>
            Responsibilities 3:
            <input
              type="text"
              name="responsibilities3"
              value={editedJob.responsibilities3}
              onChange={onInputChange}
            />
          </label>

          <label>
            Responsibilities 4:
            <input
              type="text"
              name="responsibilities4"
              value={editedJob.responsibilities4}
              onChange={onInputChange}
            />
          </label>

          <label>
            Responsibilities 5:
            <input
              type="text"
              name="responsibilities5"
              value={editedJob.responsibilities5}
              onChange={onInputChange}
            />
          </label>

          <label>
            Qualification 1:
            <input
              type="text"
              name="qualification1"
              value={editedJob.qualification1}
              onChange={onInputChange}
            />
          </label>

          <label>
            Qualification 2:
            <input
              type="text"
              name="qualification2"
              value={editedJob.qualification2}
              onChange={onInputChange}
            />
          </label>

          <label>
            Qualification 3:
            <input
              type="text"
              name="qualification3"
              value={editedJob.qualification3}
              onChange={onInputChange}
            />
          </label>

          <label>
            Qualification 4:
            <input
              type="text"
              name="qualification4"
              value={editedJob.qualification4}
              onChange={onInputChange}
            />
          </label>

          <label>
            Employment Type:
            <input
              type="text"
              name="employementtype"
              value={editedJob.employementtype}
              onChange={onInputChange}
            />
          </label>

          <label>
            Monthly Salary Range:
            <input
              type="text"
              name="monthlysalary1"
              value={editedJob.monthlysalary1}
              onChange={onInputChange}
            />
            -
            <input
              type="text"
              name="monthlysalary2"
              value={editedJob.monthlysalary2}
              onChange={onInputChange}
            />
          </label>

          <label>
            Number of Vacancies:
            <input
              type="text"
              name="numberofvacancies"
              value={editedJob.numberofvacancies}
              onChange={onInputChange}
            />
          </label>

          <label>
            Degree:
            <input
              type="text"
              name="degreerequired"
              value={editedJob.degreerequired}
              onChange={onInputChange}
            />
          </label>

          <button className="savejobdesc" onClick={onSaveEdit}>
            Save
          </button>
          <button className="canceljobdesc" onClick={onCancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h3 className="reach-out">Reach out to the employer</h3>
          <div className="go-next">
            <h4 className="job-description">Job Description</h4>
            <h5 className="job-overview">Job Overview:</h5>
            <p className="job-text">{job.joboverview}</p>
            <h4 className="skills">Skills:</h4>
            <h5 className="responsibilities">Responsibilities:</h5>
            <h4 className="responsibility-1"> -{job.responsibilities1}</h4>
            <h4 className="responsibility-2">-{job.responsibilities2} </h4>
            <h4 className="responsibility-3">-{job.responsibilities3}</h4>
            <h4 className="responsibility-4">-{job.responsibilities4}</h4>
            <h4 className="responsibility-5">-{job.responsibilities5}</h4>

            <h5 className="qualifications">Qualifications:</h5>
            <p className="qualification-1">1-{job.qualification1}</p>
            <p className="qualification-2">2-{job.qualification2}</p>
            <p className="qualification-3">3-{job.qualification3}.</p>
            <p className="qualification-4">4-{job.qualification4}</p>

            <div className="info-item1-12">
              <div className="pergunta-123">
                <strong>Employment Type:</strong>
              </div>
              <div className="answer-1">{job.employementtype}</div>
            </div>

            <div className="info-item1-12">
              <div className="pergunta-123">
                <strong>Monthly Salary Range:</strong>
              </div>
              <div className="answer-1">
                ${job.monthlysalary1}-${job.monthlysalary2}
              </div>
            </div>

            <div className="info-item1-12">
              <div className="pergunta-123">
                <strong>Number of Vacancies:</strong>
              </div>
              <div className="answer-1">{job.numberofvacancies}</div>
            </div>

            <div className="info-item1-12">
              <div className="pergunta-123">
                <strong>Degree:</strong>
              </div>
              <div className="answer-1">{job.degreerequired}</div>
            </div>

            <button className="save-edit-button" onClick={onEditClick}>
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Jobdescriptiontrial = () => {
  const { usernameEmployer } = useParams();
  const [jobDescription, setJobDescription] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://allinone-14n7.onrender.com/jobdescriptions/employer/${usernameEmployer}`
      );
      setJobDescription(response.data);

      if (response.data.length > 0) {
        setJobId(response.data[0]._id);
      }
    } catch (error) {
      console.error("Error fetching job description:", error);
      setError("Error fetching job description");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [usernameEmployer]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedJob({
      jobtitle: jobDescription[0].jobtitle,
      companyname: jobDescription[0].companyname,
      location: jobDescription[0].location,
      joboverview: jobDescription[0].joboverview,
      responsibilities1: jobDescription[0].responsibilities1,
      responsibilities2: jobDescription[0].responsibilities2,
      responsibilities3: jobDescription[0].responsibilities3,
      responsibilities4: jobDescription[0].responsibilities4,
      responsibilities5: jobDescription[0].responsibilities5,
      qualification1: jobDescription[0].qualification1,
      qualification2: jobDescription[0].qualification2,
      qualification3: jobDescription[0].qualification3,
      qualification4: jobDescription[0].qualification4,
      employementtype: jobDescription[0].employementtype,
      monthlysalary1: jobDescription[0].monthlysalary1,
      monthlysalary2: jobDescription[0].monthlysalary2,
      numberofvacancies: jobDescription[0].numberofvacancies,
      degreerequired: jobDescription[0].degreerequired,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedJob({
      jobtitle: "",
      companyname: "",
      location: "",
      joboverview: "",
      responsibilities1: "",
      responsibilities2: "",
      responsibilities3: "",
      responsibilities4: "",
      responsibilities5: "",
      qualification1: "",
      qualification2: "",
      qualification3: "",
      qualification4: "",
      employementtype: "",
      monthlysalary1: "",
      monthlysalary2: "",
      numberofvacancies: "",
      degreerequired: "",
    });
  };

  const handleSaveEdit = () => {
    axios
      .put(
        `https://allinone-14n7.onrender.com/jobdescriptions/${jobId}`,
        editedJob
      )
      .then((response) => {
        console.log("Job details updated successfully:", response);
        setIsEditing(false);
        fetchData();
        toast.success("Job details updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating job details:", error);
      });
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEditedJob((prevEditedJob) => ({
      ...prevEditedJob,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="job-description-big">
      {jobDescription.length === 0 ? (
        <div>No job descriptions found</div>
      ) : (
        jobDescription.map((job) => (
          <JobDescriptionBox
            key={job._id}
            job={job}
            isEditing={isEditing}
            editedJob={editedJob}
            onEditClick={handleEditClick}
            onCancelEdit={handleCancelEdit}
            onSaveEdit={handleSaveEdit}
            onInputChange={handleInputChange}
          />
        ))
      )}
      <ToastContainer />
    </div>
  );
};

export default Jobdescriptiontrial;
