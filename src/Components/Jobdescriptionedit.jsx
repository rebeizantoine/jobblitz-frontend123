import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Styles/jobdescription.css";

const Jobdecriptionedit = () => {
  const { id } = useParams();
  const [jobDescription, setJobDescription] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState({}); // Define the state for the edited job

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://allinone-14n7.onrender.com/jobdescriptions/jobdescriptions/${id}`
      );
      setJobDescription(response.data);
    } catch (error) {
      console.error("Error fetching job description:", error);
      setError("Error fetching job description");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  const handleEditClick = () => {
    setIsEditing(true);
    // Initialize the editedJob state with the current job details
    setEditedJob({ ...jobDescription[0] });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Clear the editedJob state
    setEditedJob({});
  };

  const handleSaveEdit = () => {
    // Implement the logic to save the edited job details
    // For simplicity, you can send a PUT request to update the job on the server
    axios
      .put(
        `https://allinone-14n7.onrender.com/jobdescriptions/${id}`,
        editedJob
      )
      .then((response) => {
        console.log("Job details updated successfully:", response);
        setIsEditing(false);
        // Refetch the job details to display the updated information
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating job details:", error);
      });
  };

  const handleInputChange = (e) => {
    // Update the editedJob state when input fields change
    setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
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
        <React.Fragment>
          <h1 className="title-position">{jobDescription[0].jobtitle}</h1>
          <h2 className="company-position">{jobDescription[0].companyname}</h2>
          <div className="first-flex1">
            <div className="location-position">
              {jobDescription[0].location}
            </div>
            <div className="date-position">7 days ago</div>
          </div>

          {isEditing ? (
            <React.Fragment>
              <h3>Edit Job Description</h3>
              <form>
                <label>
                  Job Title:
                  <input
                    type="text"
                    name="jobtitle"
                    value={editedJob.jobtitle || ""}
                    onChange={handleInputChange}
                  />
                </label>
                {/* Add similar input fields for other properties */}
                <button type="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <button type="button" onClick={handleSaveEdit}>
                  Save
                </button>
              </form>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h3 className="reach-out">Reach out to the employer</h3>
              <div className="go-next">
                <h4 className="job-description">Job Description</h4>
                {/* Add the rest of your JSX code here */}
              </div>
              <button onClick={handleEditClick}>Edit</button>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Jobdecriptionedit;
