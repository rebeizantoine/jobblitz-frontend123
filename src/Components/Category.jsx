import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/category.css";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://allinone-14n7.onrender.com/categories/"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div>
      <div className="category-all">
        <h1 className="h1-find">Find the job you love</h1>
        <div className="categories-container">
          {categories.map((category) => (
            <div
              key={category._id}
              className="single-category"
              onClick={() => handleCategoryClick(category.categoryName)}
            >
              <div className="categories-available">
                <h2 className="category-name">{category.categoryName}</h2>
                <div className="image-box">
                  <img className="img-category" src={category.image} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
