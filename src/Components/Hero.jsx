import React from "react";
import "../Styles/hero.css";
import imagewoman from "../Images/Component9.png";

const Hero = () => {
  return (
    <div className="hero-1">
      <div className="main">
        <div className="left">
          <h1>We're Connecting Talent with Opportunity</h1>
          <p>
            Your premier destination for finding top talent and securing your
            dream job.
          </p>
        </div>

        <div className="right">
          <img src={imagewoman} alt="Woman illustration" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
