import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import bullet1 from "../Images/bullet-1.png";
import "../Styles/loginjob.css";

const Loginjobb = () => {
  const [usernamejobseek, setUsernamejobseek] = useState("");
  const [passwordnamejobseek, setPasswordnamejobseek] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://backendjobblitz.onrender.com/jobseeker/jobseekers/login",
        {
          usernamejobseek,
          passwordnamejobseek,
        }
      );

      console.log("Login Successful:", response.data);

      // Save user role and username to sessionStorage
      sessionStorage.setItem("userRole", "jobseeker");
      sessionStorage.setItem("usernamejobseek", usernamejobseek);

      console.log("Session Storage Updated");
      await new Promise((resolve) => setTimeout(resolve, 100));
      console.log(`Navigating to /jobseekerpp/${usernamejobseek}`);

      navigate(`/jobseekerpp/${usernamejobseek}`);
      // Handle successful login, such as storing the user token in state or localStorage
    } catch (error) {
      console.error("Login Failed:", error);
      setLoginError("Invalid username or password");

      if (error.response) {
        // Handle response error
        console.error(
          "Server responded with a non-2xx status:",
          error.response.data
        );
      } else if (error.request) {
        // Handle request error
        console.error("No response received:", error.request);
      } else {
        // Handle other errors
        console.error("Error setting up the request:", error.message);
      }
    }
  };
  const handleRegisterNow1 = () => {
    navigate("/signup");
  };

  return (
    <div className="job-back">
      <div className="jobseeker">
        <div className="left1">
          <h3>Job Seeker Login</h3>
          <div className="username">
            <label className="labelf">Username:</label>
            <input
              className="inputf12"
              type="text"
              id="usernamef"
              name="usernamef"
              value={usernamejobseek}
              onChange={(e) => setUsernamejobseek(e.target.value)}
              required
            />
          </div>
          <div className="username">
            <label className="labelf">Password:</label>
            <input
              className="inputf12"
              type="password"
              id="password"
              name="password"
              value={passwordnamejobseek}
              onChange={(e) => setPasswordnamejobseek(e.target.value)}
              required
            />
          </div>
          <button onClick={handleLogin}>Login</button>
          {loginError && (
            <div style={{ color: "red", marginTop: "10px" }}>{loginError}</div>
          )}
        </div>
        <div className="right1">
          <h3>Not a Member?</h3>
          <p className="para12">
            Becoming a member at Hirelebanese.com offers you the following
            benefits:
          </p>
          <div className="parabox">
            <p className="para2">
              <img src={bullet1} alt="" />
              Applying for Jobs
            </p>
            <p className="para2">
              <img src={bullet1} alt="" />
              Posting a Resume
            </p>
            <p className="para2">
              <img src={bullet1} alt="" />
              Adding Jobs to Inbox
            </p>
            <button onClick={handleRegisterNow1}>Register Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginjobb;
