import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/jobseekpp.css";
import topimage from "../Images/face.png";
import logoutimage from "../Images/logout.png";
import axios from "axios";

const JobseekppReadOnly = () => {
  const { usernamejobseek } = useParams();
  const [jobseekData, setJobseekData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("usernamejobseek");

    if (!storedUsername) {
      // Handle the case when usernamejobseek is not present in session storage
      console.error("Usernamejobseek not found in session storage");
      navigate("/"); // Redirect to the login or home page
      return;
    }

    const fetchJobseekData = async () => {
      try {
        const response = await axios.get(
          `https://allinone-14n7.onrender.com/jobseeker/jobseekers/username/${storedUsername}`
        );
        setJobseekData(response.data);

        // Assuming response.data contains the job seeker data
      } catch (error) {
        console.error("Error fetching job seeker data:", error);
      }
    };

    fetchJobseekData();
  }, [navigate]);

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
              <div className="answer12">{jobseekData.locationjobseek}</div>
            </div>

            <div className="info-item1">
              <div className="pergunta">
                <strong>Education:</strong>
              </div>
              <div className="answer12">{jobseekData.educationjobseek}</div>
            </div>

            <div className="info-item1">
              <div className="pergunta">
                <strong>Experience:</strong>
              </div>
              <div className="answer12">{jobseekData.experiencejobseek}</div>
            </div>
          </div>
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
            <div className="answer-1">{jobseekData.nationalityjobseek}</div>
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
          <div className="info-item1-1">
            <div className="info-box-1">
              <div className="pergunta-12345">
                <strong>Email address</strong>
              </div>
              <div className="answer-12345">{jobseekData.emailjobseek}</div>
            </div>

            <div className="info-box-1234">
              <div className="pergunta-123456">
                <strong>Mobile number:</strong>
              </div>
              <div className="answer-123456">{jobseekData.phonejobseek}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobseekppReadOnly;
