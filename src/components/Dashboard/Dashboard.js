import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import {
  FaComment,
  FaHome,
  FaList,
  FaTag,
  FaFolder,
  FaUsers,
  FaChartBar,
  FaStar,
} from "react-icons/fa";

const options = [
  { id: 1, name: "Dashboard", icons: <FaHome /> },
  { id: 2, name: "Orders", icons: <FaList /> },
  { id: 3, name: "Products", icons: <FaTag /> },
  { id: 4, name: "Categories", icons: <FaFolder /> },
  { id: 5, name: "Customers", icons: <FaUsers /> },
  { id: 6, name: "Reports", icons: <FaChartBar /> },
  { id: 7, name: "Coupons", icons: <FaStar /> },
  { id: 8, name: "Inbox", icons: <FaComment /> },
];

function Dashboard() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [tab, setTab] = useState("Dashboard");

  useEffect(() => {
    // navigating to login page based on jwt_token
    const token = localStorage.getItem("jwt_token");
    if (token === null) {
      navigate("/");
    }

    async function fetchedData() {
      const token = localStorage.getItem("jwt_token");
      const data = await fetch(
        "https://revisit-backend-hkwo.onrender.com/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await data.json();
      setCategories(response);
    }
    fetchedData();
  });

  const handleTabChange = (optionName) => {
    setTab(optionName);
  };

  const handleAddCategory = () => {
    navigate('/addCategory')
  }

  return (
    <div className="main-container">
      <Navbar />
      <div className="body-container">
        <div className="left-side">
          <ul className="list-container">
            {options.map((option) => {
              return (
                <li
                  key={option.id}
                  className={tab === option.name ? "selected" : "not-selected"}
                  onClick={() => handleTabChange(option.name)}
                >
                  {option.icons}
                  <p>{option.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right-side">
          <div className="right-side-heading-container">
            <h2>Categories</h2>
            <button onClick={handleAddCategory}>+ Add Category</button>
          </div>
          <ul className="category-list-container">
            {categories.map((category) => (
              <li key={category.id}>
                <Card category={category} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
