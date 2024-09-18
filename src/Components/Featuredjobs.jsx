import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../Styles/featuredjobs.css";

const Featuredjobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://allinone-14n7.onrender.com/jobdescriptions/getAll"
        );
        setJobs(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleJobClick = (jobId) => {
    navigate(`/singlejobdescription/jobdescription/${jobId}`);
  };

  return (
    <div className="featured">
      <div className="headerfeature">
        <h2 className="featured-jobs">Featured Jobs</h2>
        <h2 className="viewall">
          <a href="/category">View All</a>
        </h2>
      </div>
      <div className="big-box-1">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="box-1"
            onClick={() => handleJobClick(job._id)}
          >
            <p className="box-1-p1">
              {job.jobtitle} - {job.location}
            </p>
            <p className="box-1-p2">{job.companyname}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featuredjobs;
