import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Styles/applyjob.css";

const ApplyJob = () => {
  const { jobId } = useParams();
  const [jobseekData, setJobseekData] = useState(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("usernamejobseek");

    if (!storedUsername) {
      console.error("Usernamejobseek not found in session storage");
      // You can handle this case, e.g., redirect to login page
      return;
    }

    const fetchJobseekData = async () => {
      try {
        const response = await axios.get(
          `https://backendjobblitz.onrender.com/jobseeker/jobseekers/username/${storedUsername}`
        );
        setJobseekData(response.data);
      } catch (error) {
        console.error("Error fetching job seeker data:", error);
      }
    };

    fetchJobseekData();
  }, []);

  const sendEmail = async () => {
    try {
      const templateParams = {
        to_email: jobseekData.emailjobseek,
        subject: "Job Application",
        message: `Hello, I am ${jobseekData.firstnamejobseek} ${jobseekData.lastnamejobseek}, a jobblitz jobseeker with the following profile: http://localhost:3000/jobseekerreadonly/${jobseekData.usernamejobseek}\n\nI would like to apply to the following job: http://localhost:3000/singlejobdescription/jobdescription/${jobId}, my contact informations are Email:${jobseekData.emailjobseek} and Phone number:${jobseekData.phonejobseek}`,
      };

      // await emailjs.send(
      //   "service_6xtx3zu",
      //   "template_zgskpsb",
      //   templateParams,
      //   "YOUR_USER_ID"
      // );

      // Handle success, e.g., show a success message
      console.log("Email sent successfully");
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error sending email:", error);
    }
  };

  if (!jobseekData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="apply-job-container">
      <h2 className="apply-job-title">Apply for a Job</h2>
      <form className="apply-job-form" onSubmit={sendEmail}>
        <div>
          <label className="apply-job-label">
            Subject:
            <input
              type="text"
              name="subject"
              value="Job Application"
              readOnly
              className="apply-job-input"
            />
          </label>
        </div>
        <div>
          <label className="apply-job-label">
            Message:
            <textarea
              name="message"
              value={`Hello, I am ${jobseekData.firstnamejobseek} ${jobseekData.lastnamejobseek}, a jobblitz jobseeker with the following profile: http://localhost:3000/jobseekerreadonly/${jobseekData.usernamejobseek}\n\nI would like to apply to the following job: http://localhost:3000/singlejobdescription/jobdescription/${jobId}, my contact informations are Email:${jobseekData.emailjobseek} and Phone number:${jobseekData.phonejobseek}`}
              readOnly
              className="apply-job-textarea"
            />
          </label>
        </div>
        <div>
          <button type="submit" className="apply-job-button">
            Send Email
          </button>
        </div>
      </form>
      <p className="apply-job-info">
        Job Profile:{" "}
        <a
          href={`http://localhost:3000/jobseekerreadonly/${jobseekData.usernamejobseek}`}
          target="_blank"
          rel="noopener noreferrer"
          className="apply-job-link"
        >
          {jobseekData.firstnamejobseek} {jobseekData.lastnamejobseek}'s Profile
        </a>
      </p>
    </div>
  );
};

export default ApplyJob;
