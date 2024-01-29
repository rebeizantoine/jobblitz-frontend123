  import React from "react";
import aboutimage from "../Images/aboutus.png";
import "../Styles/about.css";

const About = () => {
  return (
    <div className="about-us" id="about-us">
      <div className="headerfeature2">
        <h2 className="about-us-title">About Us</h2>
      </div>
      <div className="about-us-main">
        <img className="about-us-image" src={aboutimage} alt="" />
        <div className="about-us-speach">
          <h3 className="about-us-h3">
            CertifyRecruit - Elevating Recruitment Proficiency
          </h3>
          <p className="about-us-p">
            The premier online platform is designed to revolutionize the way
            individuals and organizations approach the art and science of
            recruitment. Our mission is to empower individuals seeking to
            enhance their recruitment skills and enable employers to identify
            top-tier talent. At CertifyRecruit, we believe that recruitment
            excellence is not just a goal; it's a journey that we are committed
            to guiding you through <br />
            CertifyRecruit is an online platform designed to assess and evaluate
            individuals' capabilities, knowledge, and understanding of the
            recruitment process. It’s offers various tools and assessments to
            help gauge a person's proficiency in different aspects of
            recruiting, such as sourcing candidates, conducting interviews,
            evaluating resumes, and making hiring decisions. <br /> This
            platform may employ different types of assessments, such as
            multiple-choice tests, scenario-based simulations, or even
            interactive exercises to mimic real-world recruitment scenarios. By
            using CertifyRecruit, individuals seeking to improve their
            recruitment skills can gain valuable insights into their strengths
            and areas for improvement. <br />
            likewise, employers and hiring managers can use the platform to
            assess and certify the{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
