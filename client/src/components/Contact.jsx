import React from "react";
import { useLocation } from "react-router-dom";
const Contact = () => {
    const location = useLocation()
    const { user , jobs , phone , email, address, image } = location.state
    return (
        <div className="portfolio">
      <div className="portfolio-card">
        <div className="portfolio-left">
          <div className="signature">{user || "Jane Doe"}</div>
        </div>
        <div className="portfolio-right">
          <h2>{user || "None"}</h2>
          <h4>{jobs || "None"}</h4> {/* Hiển thị chức danh nếu có */}
          <ul>
            <li>{phone}</li>
            <li>{email}</li>
            <li>{address}</li>
          </ul>
          <button className="contact-btn">Contact</button>
        </div>
        <img
          src={image} // Hiển thị ảnh người dùng nếu có
          alt="Profile"
          className="portfolio-image"
        />
      </div>
    </div>
    )
}

export default Contact;