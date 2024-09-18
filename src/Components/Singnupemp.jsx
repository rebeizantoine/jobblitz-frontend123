import React, { useState } from "react";
import axios from "axios";
import "../Styles/signupemp.css";
import Dropdown1 from "./Dropdown1";
import Dropdown2 from "./Dropdown2";
import { useNavigate } from "react-router-dom";

const Singnupemp = () => {
  const [firstnameEmployer, setFirstnameEmployer] = useState("");
  const [lastnameEmployer, setLastnameEmployer] = useState("");
  const [usernameEmployer, setUsernameEmployer] = useState("");
  const [passwordnameEmployer, setPasswordEmployer] = useState("");
  const [locationEmployer, setLocationEmployer] = useState("");
  const [nationalityEmployer, setNationalityEmployer] = useState("");
  const [phoneEmployer, setPhoneEmployer] = useState(0);
  const [addressEmployer, setAddressEmployer] = useState("");
  const [genderEmployer, setGenderEmployer] = useState("");
  const [emailEmployer, setemailEmployer] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLocationChange = (selectedLocation) => {
    setLocationEmployer(selectedLocation);
  };
  const handleNationalityChange = (selectedNationality) => {
    setNationalityEmployer(selectedNationality);
  };

  const validateInput = () => {
    if (!emailEmployer || !passwordnameEmployer) {
      setConfirmPasswordError("Email and password are required");
      return false;
    }
    return true;
  };

  const handleErrorPopup = (errorMsg) => {
    // Use a modal library or custom modal implementation for a more polished popup
    // For simplicity, using window.alert
    window.alert(errorMsg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset the confirm password error before validation
    setConfirmPasswordError("");
    if (passwordnameEmployer !== e.target.elements.confirmPassword.value) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    if (!validateInput()) {
      // If input is not valid, return
      if (!e.target.elements.termsCheckbox.checked) {
        handleErrorPopup("Please accept the license agreement");
        return;
      }
    }

    axios
      .post("https://allinone-14n7.onrender.com/employer/employers", {
        firstnameEmployer,
        lastnameEmployer,
        usernameEmployer,
        passwordnameEmployer,
        nationalityEmployer,
        role: "employer",
        phoneEmployer,
        addressEmployer,
        emailEmployer,
        genderEmployer,
        locationEmployer,
      })
      .then((response) => {
        console.log("Response:", response);
        setRegistrationSuccess(true);
        window.alert("Registration successful. You can now log in!");
        // You can also navigate to another page if needed
        navigate("/loginemp");
      })
      .catch((error) => {
        console.error("Error occurred while registering:", error);
        handleErrorPopup("Error occurred while registering");
      });
  };

  return (
    <div>
      <div className="all-boxes">
        <div className="top-box">
          <h2>Employer Registration</h2>
          <p>Please, fill the form below for instant registration.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="bot-box">
            <h2>Account Info</h2>

            <div className="leftright">
              <div className="left-signup">
                <div className="username123">
                  <label className="labelf123">
                    <span className="blue-asterisk">*</span>First Name:
                  </label>
                  <input
                    className="inputf123"
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={(e) => setFirstnameEmployer(e.target.value)}
                    required
                  />
                </div>
                <div className="username123">
                  <label className="labelf123">
                    <span className="blue-asterisk">*</span>Last Name:
                  </label>
                  <input
                    className="inputf123"
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={(e) => setLastnameEmployer(e.target.value)}
                    required
                  />
                </div>
                <div className="username123">
                  <label className="labelf123">
                    <span className="blue-asterisk">*</span>Username:
                  </label>
                  <input
                    className="inputf123"
                    type="text"
                    id="username"
                    name="username"
                    onChange={(e) => setUsernameEmployer(e.target.value)}
                    required
                  />
                </div>
                <div className="username123">
                  <label className="labelf123">
                    <span className="blue-asterisk">*</span>Email:
                  </label>
                  <input
                    className="inputf123"
                    type="email"
                    id="email"
                    name="email"
                    onChange={(e) => setemailEmployer(e.target.value)}
                    required
                  />
                </div>
                <div className="username123">
                  <label className="labelf123">
                    <span className="blue-asterisk">*</span>Password:
                  </label>
                  <input
                    className="inputf123"
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => setPasswordEmployer(e.target.value)}
                    required
                  />
                </div>
                <div className="username123">
                  <label className="labelf123">
                    <span className="blue-asterisk">*</span>Confirm Password:
                  </label>
                  <input
                    className="inputf123"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                  />
                </div>
              </div>
              <div className="right-signup">
                <div>
                  <label className="labelf12345">
                    <span className="blue-asterisk">*</span>Location:
                  </label>
                  <Dropdown1 onLocationChange={handleLocationChange} />
                </div>
                <div>
                  <label className="labelf12345">
                    <span className="blue-asterisk">*</span>Nationality:
                  </label>
                  <Dropdown2 onNationalityChange={handleNationalityChange} />
                </div>

                <div className="username1234">
                  <label className="labelf123">
                    <span className="blue-asterisk">*</span>Phone:
                  </label>
                  <input
                    className="inputf123"
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={(e) => setPhoneEmployer(e.target.value)}
                    required
                  />
                </div>
                <div className="username1234">
                  <label className="labelf123">
                    <span className="blue-asterisk">*</span>Address:
                  </label>
                  <textarea
                    className="inputf123"
                    id="address"
                    name="address"
                    onChange={(e) => setAddressEmployer(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="gender123">
                  <label className="labelf1234">
                    <span className="blue-asterisk">*</span>Gender:
                  </label>
                  <div className="gender-select">
                    <input
                      id="setC_male"
                      type="checkbox"
                      onChange={(e) =>
                        setGenderEmployer(e.target.checked ? "Male" : "")
                      }
                    />
                    <label htmlFor="setC_male">Male</label>

                    <input
                      id="setC_female"
                      type="checkbox"
                      onChange={(e) =>
                        setGenderEmployer(e.target.checked ? "Female" : "")
                      }
                    />
                    <label htmlFor="setC_female">Female</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lower-box">
            <label>
              <input
                type="checkbox"
                id="termsCheckbox"
                className="agreementpara"
                name="termsCheckbox"
                required
              />
              I accept all the terms of the{" "}
              <a href="" className="blue-link">
                license agreement
              </a>
              .
            </label>
            <div className="button-reg">
              <button type="submit" className="register-signup">
                Register
              </button>
            </div>
            {confirmPasswordError && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {confirmPasswordError}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Singnupemp;
