import React, { useEffect, useState } from "react";
import axios from "axios";

const LikeButton = ({ userId, postId, initialLikes, isLoggedIn }) => {
  const [isLiked, setIsLiked] = useState(false); // Trạng thái like của người dùng
  const [likeCounts, setLikesCount] = useState(initialLikes); // Số lượt like ban đầu

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!isLoggedIn) return;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/${userId}/posts/${postId}/liked`
        );
        setIsLiked(response.data.isLiked); // Cập nhật trạng thái liked
        setLikesCount(response.data.likesCount); // Cập nhật số lượt likes
      } catch (error) {
        console.error("Lỗi khi lấy trạng thái like:", error);
      }
    };

    checkLikeStatus();
  }, [userId, postId, isLoggedIn]); // Giám sát userId, postId, và trạng thái đăng nhập

  // Hàm xử lý khi người dùng nhấn vào nút Like
  const handleClick = async () => {
    if (!isLoggedIn) {
      alert("Bạn chưa đăng nhập");
      return;
    }

    if (!isLiked) {
      await handleLike(); // Gọi hàm handleLike khi người dùng thích
    } else {
      await handleDislike(); // Gọi hàm handleDislike khi người dùng bỏ thích
    }
  };

  // Hàm xử lý khi người dùng thích bài viết
  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/${userId}/posts/${postId}/like`
      );

      if (response.status === 200) {
        console.log("Like action success:", response.data);
        setIsLiked(true); // Cập nhật trạng thái liked
        setLikesCount(response.data.likes); // Cập nhật số lượt likes từ server
      }
    } catch (error) {
      handleError(error, "like");
    }
  };

  // Hàm xử lý khi người dùng bỏ thích bài viết
  const handleDislike = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/${userId}/posts/${postId}/like`
      );

      if (response.status === 200) {
        console.log("Dislike action success:", response.data);
        setIsLiked(false); // Cập nhật trạng thái liked
        setLikesCount(response.data.likes); // Cập nhật số lượt likes từ server
      }
    } catch (error) {
      handleError(error, "dislike");
    }
  };

  // Hàm xử lý lỗi từ API
  const handleError = (error, actionType) => {
    if (error.response) {
      console.error(`Lỗi khi ${actionType} bài viết:`, error.response.data);
      console.error("Mã lỗi HTTP:", error.response.status);
    } else if (error.request) {
      console.error(`Không nhận được phản hồi từ server khi ${actionType}:`, error.request);
    } else {
      console.error(`Lỗi khi gửi yêu cầu ${actionType}:`, error.message);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexDirection: "column" }}>
      <button
        className={`button button-like ${isLiked ? "liked" : ""}`}
        onClick={handleClick}
      >
         <i className="fa fa-heart"></i>
         <span>Like</span>
      </button>
      <span>{likeCounts} Likes</span>
    </div>
  );
};

export default LikeButton;
