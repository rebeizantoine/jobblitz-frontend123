import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bullet1 from "../Images/bullet-1.png";
import axios from "axios";
import "../Styles/loginemp.css";

const Loginemp = () => {
  const [usernameEmployer, setUsernameEmployer] = useState("");
  const [passwordnameEmployer, setPasswordnameEmployer] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Logging in...");
      // Simulate a login request using Axios
      const response = await axios.post(
        "https://backendjobblitz.onrender.com/employer/login",
        {
          usernameEmployer,
          passwordnameEmployer,
        }
      );

      console.log("Login Successful:", response.data);

      // Save user role to sessionStorage
      sessionStorage.setItem("userRole", "employer");
      sessionStorage.setItem("usernameEmployer", usernameEmployer);

      console.log("Session Storage Updated");
      await new Promise((resolve) => setTimeout(resolve, 100));
      console.log("Navigating to /employerpp/${usernameEmployer}");

      navigate(`/employerpp/${usernameEmployer}`);
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

      setLoginError("Invalid username or password");
    }
  };
  const handleRegisterNow1 = () => {
    navigate("/signup");
  };

  return (
    <div className="job-back">
      <div className="jobseeker">
        <div className="left1">
          <h3>Employer Login</h3>
          <div className="username">
            <label className="labelf">Username:</label>
            <input
              className="inputf12"
              type="text"
              id="usernamef"
              name="usernamef"
              value={usernameEmployer}
              onChange={(e) => setUsernameEmployer(e.target.value)}
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
              value={passwordnameEmployer}
              onChange={(e) => setPasswordnameEmployer(e.target.value)}
              required
            />
          </div>
          <button onClick={handleLogin}>Login</button>
          {loginError && (
            <div style={{ color: "red", marginTop: "10px" }}>{loginError}</div>
          )}
        </div>
        <div className="right1">
          <h3 className="right-1h3">Not an Employer?</h3>
          <p className="para12">
            Becoming a member at Hirelebanese.com offers you the following
            benefits:
          </p>
          <div className="parabox-1">
            <p className="para2-1">
              <img src={bullet1} alt="" />
              Posting Job Openings
            </p>
            <p className="para2-1">
              {" "}
              <img src={bullet1} alt="" />
              Managing Job Applications
            </p>
            <p className="para2-1">
              <img src={bullet1} alt="" />
              Finding the Right Candidates
            </p>
            <button onClick={handleRegisterNow1}>Register Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginemp;
