import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/jobpostform.css";

const JobPostForm = () => {
  const navigate = useNavigate();
  const { usernameEmployer: urlUsernameEmployer } = useParams();

  const [wordCounts, setWordCounts] = useState({
    joboverview: 65,
    responsibilities: 15,
    qualifications: 20,
  });

  const storedUsernameEmployer = sessionStorage.getItem("usernameEmployer");
  const usernameEmployer = storedUsernameEmployer || urlUsernameEmployer;

  const [formData, setFormData] = useState({
    usernameEmployer: usernameEmployer,
    jobtitle: "",
    companyname: "",
    location: "",
    joboverview: "",
    responsibilities1: "",
    responsibilities2: "",
    responsibilities3: "",
    responsibilities4: "",
    responsibilities5: "",
    qualification1: "",
    qualification2: "",
    qualification3: "",
    qualification4: "",
    employementtype: "",
    monthlysalary1: 0,
    monthlysalary2: 0,
    numberofvacancies: 0,
    degreerequired: "",
    categoryName: "",
  });

  useEffect(() => {
    sessionStorage.setItem("usernameEmployer", usernameEmployer);
  }, [usernameEmployer]);

  const categories = [
    "IT Jobs",
    "Engineering",
    "Sales Jobs",
    "Marketing Jobs",
    "HR Jobs",
    "Finance Jobs",
    "Hotel Jobs",
    "Business Analyst",
    "Restaurant Jobs",
    "Nurse Jobs",
    "Teacher Jobs",
    "Web Dev Jobs",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const maxWords = {
      joboverview: 65,
      responsibilities: 15,
      qualifications: 20,
    };

    const truncatedValue = value.split(" ").slice(0, maxWords[name]).join(" ");

    setFormData((prevData) => ({
      ...prevData,
      [name]: truncatedValue,
    }));

    const remainingWords = maxWords[name] - truncatedValue.split(" ").length;
    setWordCounts((prevCounts) => ({ ...prevCounts, [name]: remainingWords }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://allinone-14n7.onrender.com/jobdescriptions/add",
        formData
      );
      toast.success("Job post added successfully!");
      navigate(`/employerpp/${usernameEmployer}`);
    } catch (error) {
      console.error("Error adding job post:", error);
      toast.error("Error adding job post. Please try again.");
    }
  };
  return (
    <div className="job-post-form">
      <h2>Add a Job Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label123" htmlFor="jobtitle">
            Job Title
          </label>
          <input
            className="input-post-123"
            type="text"
            id="jobtitle"
            name="jobtitle"
            value={formData.jobtitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="label123" htmlFor="companyname">
            Company Name
          </label>
          <input
            className="input-post-123"
            type="text"
            id="companyname"
            name="companyname"
            value={formData.companyname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="label123" htmlFor="location">
            Location
          </label>
          <input
            className="input-post-123"
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label123" htmlFor="joboverview">
            Job Overview ({wordCounts.joboverview} words remaining)
          </label>
          <textarea
            className="text-area-post-123"
            id="joboverview"
            name="joboverview"
            value={formData.joboverview}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label123" htmlFor="responsibilities1">
            Responsibility 1({wordCounts.responsibilities} words remaining)
          </label>
          <input
            className="input-post-123"
            type="text"
            id="responsibilities1"
            name="responsibilities1"
            value={formData.responsibilities1}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label123" htmlFor="responsibilities2">
            Responsibility 2({wordCounts.responsibilities} words remaining)
          </label>
          <input
            className="input-post-123"
            type="text"
            id="responsibilities2"
            name="responsibilities2"
            value={formData.responsibilities2}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label123" htmlFor="responsibilities3">
            Responsibility 3({wordCounts.responsibilities} words remaining)
          </label>
          <input
            className="input-post-123"
            type="text"
            id="responsibilities3"
            name="responsibilities3"
            value={formData.responsibilities3}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label123" htmlFor="responsibilities4">
            Responsibility 4({wordCounts.responsibilities} words remaining)
          </label>
          <input
            className="input-post-123"
            type="text"
            id="responsibilities4"
            name="responsibilities4"
            value={formData.responsibilities4}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label123" htmlFor="responsibilities5">
            Responsibility 5({wordCounts.responsibilities} words remaining)
          </label>
          <input
            className="input-post-123"
            type="text"
            id="responsibilities5"
            name="responsibilities5"
            value={formData.responsibilities5}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label123" htmlFor="qualification1">
            Qualification 1({wordCounts.qualifications} words remaining)
          </label>
          <input
            className="input-post-123"
            type="text"
            id="qualification1"
            name="qualification1"
            value={formData.qualification1}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label123" htmlFor="qualification2">
            Qualification 2({wordCounts.qualifications} words remaining)
          </label>
          <input
            className="input-post-123"
            type="text"
            id="qualification2"
            name="qualification2"
            value={formData.qualification2}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label123" htmlFor="qualification3">
            Qualification 3({wordCounts.qualifications} words remaining)
          </label>
          <input
            className="input-post-123"
            type="text"
            id="qualification3"
            name="qualification3"
            value={formData.qualification3}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label123" htmlFor="qualification4">
            Qualification 4({wordCounts.qualifications} words remaining)
          </label>
          <input
            className="input-post-123"
            type="text"
            id="qualification4"
            name="qualification4"
            value={formData.qualification4}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label123" htmlFor="categoryname">
            Category Name
          </label>
          <select
            className="select-edit-123"
            id="categoryName"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="label123" htmlFor="degreerequired">
            Degree Required
          </label>
          <input
            className="input-post-123"
            type="text"
            id="degreerequired"
            name="degreerequired"
            value={formData.degreerequired}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label123" htmlFor="numberofvacancies">
            Number of Vacancies
          </label>
          <input
            className="input-post-123"
            type="number"
            id="numberofvacancies"
            name="numberofvacancies"
            value={formData.numberofvacancies}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label123" htmlFor="monthlysalary1">
            Monthly Salary 1
          </label>
          <input
            className="input-post-123"
            type="number"
            id="monthlysalary1"
            name="monthlysalary1"
            value={formData.monthlysalary1}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label123" htmlFor="monthlysalary2">
            Monthly Salary 2
          </label>
          <input
            className="input-post-123"
            type="number"
            id="monthlysalary2"
            name="monthlysalary2"
            value={formData.monthlysalary2}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label123" htmlFor="employementtype">
            Employment Type
          </label>
          <input
            className="input-post-123"
            type="text"
            id="employementtype"
            name="employementtype"
            value={formData.employementtype}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default JobPostForm;
