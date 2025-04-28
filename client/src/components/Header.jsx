
import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    // Xử lý logic tìm kiếm, có thể điều hướng đến trang kết quả tìm kiếm hoặc cập nhật state
    console.log("Search query:", query);
    navigate(`/search?q=${query}`); // Ví dụ: điều hướng đến trang kết quả tìm kiếm
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="navbar">
        <div className="label">
          <div className="name">
            Google Developer
          </div>
          <div className="branch">
            <h1><i className="fa-solid fa-code" style={{fontSize: "50px", color: "var(--primary-color)"}}></i></h1>
          </div>
          <div className="search1">
            <SearchBar onSearch={handleSearch} /> {/* Thêm SearchBar ở đây */}
          </div>
        </div>

        <div className="navbar-detail">
          <div className="menu">


            <div className="blog" onClick={() => navigate("/blog")}>
              Bài viết
            </div>

            
            <div className="postblog" onClick={() => navigate("/postblog")}>
              Đăng bài
            </div>

            <div
              className="dropdown"
              onBlur={toggleDropdown} // Khi dropdown mất focus, đóng lại
              tabIndex={0} // Đảm bảo dropdown có thể nhận focus
            >
              <div className="dropdown-trigger" onClick={toggleDropdown}>
                Chủ đề
              </div>
              <div
                className="dropdown-content"
                style={{
                  maxHeight: isOpen ? "500px" : "0",
                  opacity: isOpen ? "1" : "0",
                }}
              >
                <Link to="/search?q=AI" onClick={toggleDropdown}>
                  AI
                </Link>
                <Link to="/search?q=WEB" onClick={toggleDropdown}>
                  WEB
                </Link>
                <Link to="/search?q=DEVOPS" onClick={toggleDropdown}>
                  DEVOPS
                </Link>
              </div>
            </div>

            <div className="home" onClick={() => navigate("/home")}>
              Trang chủ
            </div>
          </div>

          <div className="account">
            {!isLoggedIn ? (
              <div className="login-buttons">
                <button className="button-62" onClick={() => navigate("/login")}>Đăng nhập</button>
                <button className="button-62" onClick={() => navigate("/register")}>Đăng ký</button>
              </div>
            ) : (
              <div className="auth">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Tài Khoản
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link className="dropdown-item" to="/portfolio">
                        Thông tin cá nhân
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/blogposted">
                        Bài viết đã đăng
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/updateinfor">
                        Cập nhật thông tin
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="name-account">
                  {user ? user.username : "User"}
                </div>
                <div className="avatar-account">
                  {user && user.image ? (
                    <img src={user.image} alt="" /> // Hiển thị avatar
                  ) : (
                    <i
                      className="bi bi-person-circle"
                      style={{ fontSize: "60px" }}
                    ></i>
                  )}
                </div>
                <button className="button-62" onClick={logout}>Đăng xuất</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
