import React, { useState, useEffect } from "react";
import axios from "axios";
import handsalary from "../Images/hand-salary.png"; // replace with the actual path
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/categorysingle.css";

const CategorySingle = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(
          `https://allinone-14n7.onrender.com/jobdescriptions/getByCategory/${categoryName}`
        );
        setJobData(response.data[0]); // Assuming you want the first job in the category
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJobData();
  }, [categoryName]);

  const handleBoxClick = () => {
    if (jobData) {
      navigate(`/singlejobdescription/jobdescription/${jobData._id}`);
    }
  };

  return (
    <div className="all-category" onClick={handleBoxClick}>
      {jobData ? (
        <>
          <h1>{jobData.categoryName}</h1>
          <div className="last-box-123">
            <div className="inside-last-box-123">
              <h3>{jobData.jobtitle}</h3>
              <div className="flex-1-123">
                <h4>{jobData.companyname}</h4>
                <div className="job-location-123">
                  <h5>{jobData.location}</h5>
                </div>
              </div>
              <p className="description-small-123">{jobData.joboverview}</p>
              <div className="flex-2-123">
                <img src={handsalary} alt="" />
                <p className="money-123">{`$${jobData.monthlysalary1} - $${jobData.monthlysalary2}`}</p>
                <p className="datenow-123">6 days ago</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CategorySingle;
