import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/featuredemployers.css";

const Featuredemployers = () => {
  const [featuredEmployers, setFeaturedEmployers] = useState([]);

  useEffect(() => {
    const fetchFeaturedEmployers = async () => {
      try {
        const response = await axios.get(
          "https://allinone-14n7.onrender.com/featuredemployer/"
        );
        setFeaturedEmployers(response.data);
      } catch (error) {
        console.error("Error fetching featured employers:", error);
      }
    };

    fetchFeaturedEmployers();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="featured">
      <div className="headerfeature1">
        <h2 className="featured-employers">Featured Employers</h2>
        <h2 className="viewall1">
          <a href="/category">View All</a>
        </h2>
      </div>
      <div className="big-box-22">
        {featuredEmployers.map((employer) => (
          <div key={employer._id} className="box-22">
            <img src={employer.employerImage} alt={employer.employerName} />
            <p className="box-22-p1">{employer.employerName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featuredemployers;
