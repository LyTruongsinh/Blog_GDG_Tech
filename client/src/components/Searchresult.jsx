import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SearchResult() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  // Tách query từ URL
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/search?query=${query}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      }
    };

    if (query) fetchResults();
  }, [query]);
  const handleDetailClick = (id) => {
    navigate(`/detailpost/${id}`);
  };
  return (
    <div>
      <h2>Kết quả tìm kiếm cho: "{query}"</h2>
      {results.length > 0 ? (
        results.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>
              {post.content.length > 300
                ? `${post.content.substring(0, 300)}...`
                : post.content}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => handleDetailClick(post._id)}
            >
              Xem chi tiết
            </button>
            <hr></hr>
          </div>
        ))
      ) : (
        <p>Không có kết quả phù hợp.</p>
      )}
    </div>
  );
}

export default SearchResult;
