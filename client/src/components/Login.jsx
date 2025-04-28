import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
axios.defaults.withCredentials = true;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        username,
        password,
        email,
      });
      console.log(response.data)
      if (response.data) {
        
        login(response.data);
        navigate("/home");
      } else {
        console.error("No data in response");
      }
    } catch (error) {
      // Kiểm tra lỗi
      if (error.response) {
        console.error(error.response.data);
        alert(
          "Đăng nhập không thành công: " +
            (error.response.data.message || "Vui lòng kiểm tra lại thông tin.")
        );
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center" style={{ margin: "20px" }}>
        <div className="col-lg-6 col-md-8 login-box">
          <div className="col-lg-12 login-title">Log in</div>
          <div className="col-lg-12 login-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-control-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-control-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-control-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="col-12 login-btm login-button justify-content-center d-flex">
                <button type="submit" className="btn btn-outline-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
