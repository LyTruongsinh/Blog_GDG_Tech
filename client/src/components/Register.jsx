import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending data:", { username, password, email });

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
        username,
        password,
        email,
      });
      alert(response.data.message || "Đăng ký thành công");

      // Gọi hàm register để cập nhật trạng thái đăng nhập
      register(username, password, email); // Thêm nếu cần thiết

      // Điều hướng đến trang đăng nhập hoặc trang chủ
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Đăng ký không thành công: " +
          (error.response?.data?.message || "Vui lòng kiểm tra lại thông tin.")
      );
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center" style={{ margin: "20px" }}>
        <div className="col-lg-6 col-md-8 login-box">
          <div className="col-lg-12 login-title">Sign Up</div>
          <div className="col-lg-12 login-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-control-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-control-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-control-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 login-btm login-button justify-content-center d-flex">
                <button type="submit" className="btn btn-outline-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
