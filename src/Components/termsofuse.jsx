import React, { useState, useEffect } from "react";
import "../Styles/termsofuse.css";
import axios from "axios";

const Termsofuse = () => {
  const [termsData, setTermsData] = useState([]);

  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        const response = await axios.get(
          "https://allinone-14n7.onrender.com/terms/terms"
        );
        setTermsData(response.data);
      } catch (error) {
        console.error("Error fetching terms data:", error);
        // Handle error, e.g., display an error message to the user
      }
    };

    fetchTermsData();
  }, []);
  return (
    <div className="terms-and-privacy">
      {termsData.map((term) => (
        <div key={term._id}>
          <div className="terms-of-use-title">
            <h1>Terms of Use & Privacy Policy</h1>
          </div>
          <div className="terms-of-use-second-box">
            <p>{term.termsofuse1}</p>
            <p>{term.termsofuse2}</p>
            <p>{term.termsofuse3}</p>
          </div>
          <div className="privacy-policy">
            <h1>Privacy Policy</h1>
            <p>{term.privacypolicy}</p>
          </div>
          <div className="cookies">
            <h1>Cookies</h1>
            <p>{term.cookies}</p>
          </div>
          <div className="privacy-statement">
            <h1>Changes to Privacy Statement</h1>
            <p>{term.changestostatement}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Termsofuse;
