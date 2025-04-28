import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import Postcard from "./Postcard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [allblogs, setAllBlogs] = useState([]);
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/bloglist`);
      setAllBlogs(response.data);
      // Lấy 5 blog mới nhất từ dữ liệu nhận được
      const recentBlogs = response.data.slice(0, 5);
      setBlogs(recentBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Gọi API khi component được mount
  }, []);

  return (
    <div className="center">
      {/* React Bootstrap Carousel với nội dung động từ blogs */}
      <Carousel>
        {blogs.map((blog, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={blog.image}
              alt={`Slide ${index + 1}`}
            />
            <Carousel.Caption>
              <h5>
                <strong style={{ fontSize: "30px" }}>{blog.title}</strong>
              </h5>
              <p>
                {blog.content.length > 200
                  ? `${blog.content.substring(0, 200)}...`
                  : blog.content}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Hiển thị các Postcard từ blog */}
      <div
        style={{
          width: "100%",
          display: "grid",
          gridColumn: "span 3",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          padding: "16px",
          placeItems: "center",
          justifyContent: blogs.length % 3 === 1 ? "start" : "center", // Căn toàn bộ lưới
        }}
      >
        {allblogs.map((blog, index) => (
          <Postcard
            key={index}
            image={blog.image} // Truyền ảnh cho từng blog
            title={blog.title} // Truyền tiêu đề
            content={blog.content} // Truyền nội dung
            id={blog._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
