import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../Styles/header.css";
import "../Styles/headerlogedin.css";
import threedots from "../Images/icons8-menu-vertical-50.png";

const Headerloggedin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMainMenu = location.pathname === "/";
  const { usernamejobseek } = useParams();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const goToProfile = () => {
    const usernamejobseek = sessionStorage.getItem("usernamejobseek");
    if (usernamejobseek) {
      navigate(`/jobseekerpp/${usernamejobseek}`);
    } else {
      console.error("Username not found in sessionStorage");
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
            <li>
              {sessionStorage.getItem("usernamejobseek") && (
                <div className="dropdown-container">
                  <img
                    src={threedots}
                    alt="Three Dots"
                    className="threedots-image"
                    onClick={toggleDropdown}
                  />
                  {dropdownVisible && (
                    <div className="dropdown-content">
                      <a href="#" onClick={goToProfile}>
                        My Profile
                      </a>
                      <a href="#" onClick={logout}>
                        Logout
                      </a>
                    </div>
                  )}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Headerloggedin;
