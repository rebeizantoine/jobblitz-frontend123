import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import bullet1 from "../Images/bullet-1.png";
import "../Styles/loginjob.css";

const Loginjobb = () => {
  const [adminname, setAdminname] = useState("");
  const [adminpassword, setAdminpassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Logging in...");
      const response = await axios.post(
        "https://allinone-14n7.onrender.com/admin/admins/login",
        {
          adminname,
          adminpassword,
        }
      );

      console.log("Login Successful:", response.data);

      const authToken = response.data.data;

      // Save the authentication token and user role to sessionStorage
      sessionStorage.setItem("authToken", authToken);
      sessionStorage.setItem("userRole", "admin");

      console.log("Session Storage Updated");

      // Wait for sessionStorage to be updated before navigating
      await new Promise((resolve) => setTimeout(resolve, 0));

      console.log("Navigating to /jobseekdash");
      navigate(`/jobseekdash`);
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
  return (
    <div className="job-back">
      <div className="jobseeker">
        <div className="left1">
          <h3>Admin Login</h3>
          <div className="username">
            <label className="labelf">Username:</label>
            <input
              className="inputf12"
              type="text"
              id="usernamef"
              name="usernamef"
              value={adminname}
              onChange={(e) => setAdminname(e.target.value)}
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
              value={adminpassword}
              onChange={(e) => setAdminpassword(e.target.value)}
              required
            />
          </div>
          <button onClick={handleLogin}>Login</button>
          {loginError && (
            <div style={{ color: "red", marginTop: "10px" }}>{loginError}</div>
          )}
        </div>
        <div className="right1">
          <h3>Welcome Back, Admin!</h3>
          <p className="para12">
            Logging in as an admin provides you with the following privileges:
          </p>
          <div className="parabox">
            <p className="para2">
              <img src={bullet1} alt="" />
              Managing Job Applications
            </p>
            <p className="para2">
              <img src={bullet1} alt="" />
              Accessing Admin Dashboard
            </p>
            <p className="para2">
              <img src={bullet1} alt="" />
              Reviewing and Updating Job Listings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginjobb;
