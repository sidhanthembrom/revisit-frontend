import { FaSearch, FaComment, FaBell, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

const handleLogoutBtn = () => {
  localStorage.removeItem("jwt_token");
};

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="brand-icon-container">
        <img
          className="icons"
          src="https://i.imgur.com/DAP7bvE.png"
          alt="brand-logo"
        />
        <h2>fastcart</h2>
      </div>
      <div className="searchBox-container">
        <FaSearch />
        <input type="search" placeholder="Search..." />
      </div>
      <div className="right-container">
        <div className="navbar-text-and-bell-container">
          <FaComment />
          <FaBell />
        </div>
        <div className="name-with-logout-btn-container">
          <span className="first-letter-of-the-name">R</span>
          <div className="name-container">
            <span>Randhir Kumar</span>
            <button className="logout-btn" onClick={handleLogoutBtn}>
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
