import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BlogPosted() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/blogposted`)
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Không thể tải bài viết");
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Đang tải bài viết...</p>;
  if (error) return <p>{error}</p>;

  const handleDelete = async (id) => {
    alert(id);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/postdelete/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id)); // Cập nhật danh sách blogs sau khi xóa
      alert("Bài đăng đã được xóa thành công.");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Lỗi khi xóa bài đăng.");
    }
  };

  const handleEditClick = (id) => {
    navigate(`/updatepost/${id}`); // Điều hướng đến trang cập nhật với ID của bài viết
  };
  const handleDetailClick = (id) => {
    navigate(`/detailpost/${id}`);
  };
  return (
    <div className="container1">
      <h2>Bài viết đã đăng</h2>

      {blogs.map((blog) => (
        <div className="blog-item" key={blog._id}>
          <div className="image">
            <img src={blog.image} alt="" />
          </div>
          <div className="detail">
            <div className="show1">
              <h3>{blog.title}</h3>
              <p>Tác giả: {blog.author.username}</p>
              <p className="truncated-text">{blog.content}</p>
              <h3>...</h3>
            </div>
            <div className="button-group">
              <button className="btn btn-primary" onClick={() => handleDetailClick(blog._id)}>Xem chi tiết</button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(blog._id)}
              >
                Xóa bài đăng
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleEditClick(blog._id)}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default BlogPosted;
