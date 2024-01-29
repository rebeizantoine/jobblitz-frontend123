import React from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/header.css";
import threedots from "../Images/icons8-menu-vertical-50.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isMainMenu = location.pathname === "/"; // Check if on the main menu page
  const userRole = sessionStorage.getItem("userRole");

  const goToProfile = () => {
    const usernameEmployer = sessionStorage.getItem("usernameEmployer");
    const usernamejobseek = sessionStorage.getItem("usernamejobseek");

    if (userRole === "employer" && usernameEmployer) {
      navigate(`/employerpp/${usernameEmployer}`);
    } else if (userRole === "jobseeker" && usernamejobseek) {
      navigate(`/jobseekerpp/${usernamejobseek}`);
    } else {
      console.error("Invalid user role or username in sessionStorage");
    }
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <div className="header1">
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <nav>
          <ul className="header-ul">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/category">Find Jobs</a>
            </li>
            <li>
              <a href="/login">Job Seekers</a>
            </li>
            <li>
              <a href="/loginemp">Employers</a>
            </li>
            {userRole && (
              <li>
                <div className="dropdown-container">
                  <img
                    src={threedots}
                    alt="Three Dots"
                    className="threedots-image"
                    onClick={() => goToProfile()}
                  />
                  <div className="dropdown-content">
                    <a href="#" onClick={() => goToProfile()}>
                      My Profile
                    </a>
                    <a href="#" onClick={() => logout()}>
                      Logout
                    </a>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
