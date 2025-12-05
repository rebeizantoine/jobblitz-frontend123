import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/featuredjobs.css";

const Featuredjobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "https://allinone-14n7.onrender.com/jobdescriptions/getAll"
        );
        setJobs(res.data.slice(0, 6));
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="featured-section">
      <div className="header-feature">
        <h2>Featured Jobs</h2>
        <a href="/category" className="view-all">
          View All
        </a>
      </div>

      <div className="grid-jobs">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="job-card"
            onClick={() =>
              navigate(`/singlejobdescription/jobdescription/${job._id}`)
            }
          >
            <p className="job-title">
              {job.jobtitle} - {job.location}
            </p>
            <p className="job-company">{job.companyname}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featuredjobs;
