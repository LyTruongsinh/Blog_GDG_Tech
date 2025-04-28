import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    console.log(
      "Is production environment:",
      process.env.NODE_ENV === "production"
    );
    console.log("Current NODE_ENV value:", process.env.NODE_ENV);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/bloglist`
      );
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Gọi hàm để lấy danh sách blog khi component được mount
  }, []);

  const handleDetailClick = (id) => {
    navigate(`/detailpost/${id}`);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/top-like`, {
        withCredentials: true, // Đảm bảo gửi cookie
      })
      .then((response) => {
        console.log(response.data);
        setTopPosts(response.data); // Cập nhật dữ liệu vào state
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Group blogs based on keywords like "WEB", "AI", "DEVOPS", "DATA"
  const groupKeywords = ["WEB", "AI", "DEVOPS", "DATA", "AWS"];

  const groupIcons = {
    WEB: "globe", // Group "WEB" sẽ dùng icon globe
    AI: "brain", // Group "AI" sẽ dùng icon brain
    DEVOPS: "tools", // Group "DEVOPS" sẽ dùng icon tools
    DATA: "database", // Group "DATA" sẽ dùng icon database
    AWS: "cloud",
  };

  const groupedBlogs = blogs.reduce((acc, blog) => {
    // Default group is "Others"
    let groupKey = "Others";

    // Check if the blog title contains any of the keywords
    for (let keyword of groupKeywords) {
      if (blog.title.toUpperCase().includes(keyword)) {
        groupKey = keyword;
        break; // Stop once we find a match
      }
    }

    // Add blog to the corresponding group
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(blog);

    return acc;
  }, {});

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "20px",
        }}
      >
        <h1>Top Trendding</h1>
        <div className="top-like">
          {topPosts.map((post) => {
            return (
              <div className="toppost" key={post.id}>
                <img src={post.author.image} alt="author" />
                <h4>{post.author.username}</h4>
                <h2>{post.title}</h2>
                <p>
                  {post.content.length > 300
                    ? `${post.content.substring(0, 300)}...`
                    : post.content}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDetailClick(post.id)}
                >
                  Xem chi tiết
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <hr />

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {Object.keys(groupedBlogs).map((groupKey) => (
          <div
            key={groupKey}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "100px",
            }}
          >
            {/* Group Header with Icon */}
            <div
              className="icon-group"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                justifyContent: "center",
              }}
            >
              <i
                className={`fas fa-${
                  groupIcons[groupKey] || "question-circle"
                }`}
                style={{
                  fontSize: "60px",
                  marginRight: "15px", // Khoảng cách giữa icon và tên nhóm
                }}
              ></i>
              <h2>{groupKey}</h2>
            </div>

            {groupedBlogs[groupKey].map((blog) => (
              <div key={blog._id} className="bloglist">
                <div className="bloglist-image">
                  <img src={blog.image} alt="blog" />
                </div>

                <div className="bloglist-content">
                  <h2
                    style={{
                      color: "var(--primary-color)",
                      fontFamily: "monospace",
                    }}
                  >
                    {blog.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "20px",
                      color: "black",
                      fontFamily: "monospace",
                    }}
                  >
                    {blog.content.length > 200
                      ? `${blog.content.substring(0, 200)}...`
                      : blog.content}
                  </p>
                  <p>Đăng bởi: {blog.author ? blog.author.username : "N/A"}</p>
                  <p>Ngày đăng: {new Date(blog.createdAt).toLocaleString()}</p>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => handleDetailClick(blog._id)}
                >
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
