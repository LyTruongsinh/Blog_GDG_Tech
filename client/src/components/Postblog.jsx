// src/components/NewBlogForm.js
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
function NewBlogForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext); // Lấy thông tin người dùng từ AuthContext
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const navigate = useNavigate();


  if (!user) {
    return <p>Loading user information...</p>;
  }


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };



  const handleTagAdd = () => {
    // kiểm tra newtag đã có giá trị và newtag chưa tồn tại trong tags
    if (newTag && !tags.includes(newTag)) {
      // nếu newtag có giá trị và new tag chưa tồn tại trong tags
      // thì cú pháp ...tags để sao chép tất cả các phần tử trong mảng tags hiện tại, và sau đó thêm newTag vào cuối
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image_author", user.image)
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", user ? user._id : null);
      formData.append("image", image);
      tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag); // Định dạng key thành tags[0], tags[1] ...
      });

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/postblog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Chỉ định content-type là multipart
          },
          withCredentials: true,
        }
      );
      navigate("/blog");
      console.log("Blog created:", response.data);
      alert("Tạo bài đăng thành công");
    } catch (error) {
      alert("Tạo bài đăng thất bại");
      console.error("Error creating blog:", error);
    }
  };

  return (
    <main className="wrapper">
      <section
        className="content-box blur"
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          zIndex: 0,
        }}
      >
        <div className="tag-wrap1">
          <div className="tag1">
            <div style={{ width: "30%" }}>
              <h3>POSBLOG</h3>
            </div>
            <div style={{ width: "70%" }}>
              <br />
              <div
                style={{
                  width: "70%",
                  height: "10%",
                  marginLeft: "390px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    marginRight: "8px",
                    borderBottom: "4px solid #fff",
                    borderTop: "4px solid #fff",
                  }}
                >
                  Title
                </label>
                <div className="custom-text2">
                  <input
                    type="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "30%",
                  marginLeft: "288px",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                  marginBottom: "60px",
                }}
              >
                <label
                  style={{
                    marginRight: "8px",
                    borderBottom: "4px solid #fff",
                    borderTop: "4px solid #fff",
                  }}
                >
                  Body
                </label>
                <div className="custom-textarea2">
                  <textarea
                    type="body"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "5%",
                  marginLeft: "200px",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "30px",
                  marginBottom: "20px"
                }}
              >
                <label
                  style={{
                    marginRight: "8px",
                    borderBottom: "4px solid #fff",
                    borderTop: "4px solid #fff",
                  }}
                >
                  Tags
                </label>
                <div>
                  <div
                    className="custom-text3"
                    style={{ display: "flex", flexDirection: "row", marginBottom: "10px"}}
                  >
                    <input
                      type="title"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      style={{ width: "90%" }}
                    />
                    <button type="button" onClick={handleTagAdd}>
                      Add Tag
                    </button>
                  </div>
                  <ul className="scrollable-tags">
                    {tags.map((tag, index) => (
                      <li key={index}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <br />

              <div
                className="blur-detail custom-file-input2"
                style={{
                  height: "10%",
                  marginLeft: "190px",
                  display: "flex",
                  alignItems: "center",
                  border: "2px solid #ffffff",
                  padding: "5px",
                }}
              >
                <div>
                  <label
                    style={{
                      marginRight: "8px",
                      borderBottom: "4px solid #fff",
                      borderTop: "4px solid #fff",
                    }}
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
              </div>

              <br />
              <button
                type="button"
                onClick={handleSubmit}
                className="glowy-button blur"
                style={{ width: "100%" }}
              >
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>

        <div className="tag-wrap2">
          <div className="tag2"></div>
        </div>

        <div className="tag-wrap3">
          <div className="tag3"></div>
        </div>

        <div className="box-title">
          <h2 style={{ borderBottom: "3px solid #ccc" }}>POSTBLOG</h2>
        </div>

        <div className="diagonal-line1"></div>
        <div className="diagonal-line2"></div>
        <div className="diagonal-line3"></div>
        <div className="diagonal-line4"></div>
      </section>
    </main>
  );
}

export default NewBlogForm;
