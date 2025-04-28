// PortfolioCard.js
import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

const PortfolioCard = () => {
  const { isLoggedIn, user } = useContext(AuthContext);

  // Kiểm tra xem người dùng có đăng nhập hay không
  if (!isLoggedIn) {
    return null; // Nếu không đăng nhập, không hiển thị gì
  }

  return (
    <div className="portfolio">
      <div className="portfolio-card">
        <div className="portfolio-left">
          <div className="signature">{user.username || "Jane Doe"}</div>
        </div>
        <div className="portfolio-right">
          <h2>{user.username || "None"}</h2>
          <h4>{user.jobs || "None"}</h4> {/* Hiển thị chức danh nếu có */}
          <ul>
            <li>{user.phone}</li>
            <li>{user.email}</li>
            <li>{user.address}</li>
          </ul>
          <button className="contact-btn">Contact</button>
        </div>
        <img
          src={user.image || "https://via.placeholder.com/150"} // Hiển thị ảnh người dùng nếu có
          alt="Profile"
          className="portfolio-image"
        />
      </div>
    </div>
  );
};

export default PortfolioCard;
