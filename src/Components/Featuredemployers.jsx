import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/featuredemployers.css";

const Featuredemployers = () => {
  const [featuredEmployers, setFeaturedEmployers] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(
          "https://allinone-14n7.onrender.com/featuredemployer/"
        );
        setFeaturedEmployers(res.data);
      } catch (err) {
        console.error("Error fetching featured employers:", err);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="featured-section">
      <div className="header-feature">
        <h2>Featured Employers</h2>
        <a href="/category" className="view-all">
          View All
        </a>
      </div>

      <div className="grid-employers">
        {featuredEmployers.map((emp) => (
          <div key={emp._id} className="emp-card">
            <img src={emp.employerImage} alt={emp.employerName} />
            <p className="emp-name">{emp.employerName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featuredemployers;
