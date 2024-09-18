import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/employerpp.css";
import topimage from "../Images/face.png";
import logoutimage from "../Images/logout.png";
import axios from "axios";

const EmployerppReadOnly = () => {
  const { usernameEmployer } = useParams();
  const [employerData, setEmployerData] = useState(null);
  const navigate = useNavigate();

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
      <div className="logout-container"></div>

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
        <h2 className="company-info-info">Company Information</h2>
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
      </div>

      <div className="sidebyside">
        <div className="third-box1">
          <h2>Contact Information</h2>
          <div className="info-box-1">
            <div className="info-item1-1">
              <div className="pergunta-12345">
                <strong>Email address</strong>
              </div>
              <div className="answer-12345">{employerData.emailEmployer}</div>
            </div>

            <div className="info-item1-1">
              <div className="pergunta-123456">
                <strong>Mobile number:</strong>
              </div>
              <div className="answer-123456">{employerData.phoneEmployer}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerppReadOnly;
