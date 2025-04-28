import React from "react";
import { useNavigate } from "react-router-dom";
const Postcard = ({ image, title, content, id }) => {
  const navigate = useNavigate();
  const handleReadmore = (id) => {
    navigate(`/detailpost/${id}`);
  };
  return (
    <div className="postcard">
      <div className="post-image-container">
        <img src={image} alt={title} />
      </div>

      <div className="post-card-content">
        <h3>{title}</h3>
        <p className="clamp-text">{content}</p>
        <button className="btn btn-primary" onClick={() => handleReadmore(id)}>
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default Postcard;
