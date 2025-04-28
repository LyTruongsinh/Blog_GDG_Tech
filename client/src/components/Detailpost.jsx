import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import Like from "./Like";

const DetailPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [blogs, setBlogs] = useState([]); // Dùng để lưu danh sách bài viết
  const [content, setContent] = useState("");
  const [isReplyingMap, setIsReplyingMap] = useState({});
  const { isLoggedIn, user } = useContext(AuthContext);

  // Fetch tất cả bài viết để lấy 5 bài viết sớm nhất
  const fetchPostData = useCallback(async () => {
    try {
      const postResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/detail/post/${id}`
      );
      setPost(postResponse.data);
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  }, [id]);

  const fetchBlogsData = useCallback(async () => {
    try {
      const blogsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/bloglist`
      );
      setBlogs(blogsResponse.data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  }, []);

  useEffect(() => {
    fetchPostData();
    fetchBlogsData();
  }, [fetchPostData, fetchBlogsData]);

  // Lấy 5 bài viết sớm nhất
  const getEarliestBlogs = () => {
    if (blogs.length === 0) return [];

    const sortedBlogs = [...blogs].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    return sortedBlogs.slice(0, 5);
  };

  const addComment = useCallback(
    async (postId) => {
      const newComment = {
        postId,
        content,
        author: {
          _id: user._id, // Include the author data
          username: user.username,
          image: user.image,
        },
      };

      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/${postId}/add-comment`,
          newComment
        );

        setPost((prevPost) => ({
          ...prevPost,
          comments: prevPost.comments.concat(newComment), // Sử dụng .concat thay vì spread
        }));

        setContent(""); // Reset content after posting
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    },
    [setPost, user, content] // Dependencies: setPost, user, and content
  );



  const updateNestedReplies = useCallback((comments, commentId, newReply) => {
    return comments.map((comment) => {
      if (comment._id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }
  
      if (Array.isArray(comment.replies)) {
        return {
          ...comment,
          replies: updateNestedReplies(comment.replies, commentId, newReply),
        };
      }
  
      return comment;
    });
  }, []); // Nếu nó không phụ thuộc vào bất kỳ state nào
  

  


  const addReply = useCallback(
    async (commentId, replyContent) => {
      try {
        const newReply = {
          commentId,
          content: replyContent,
          author: {
            _id: user._id,
            username: user.username,
            image: user.image,
          },
          replies: [],
        };
  
        // Gửi yêu cầu lên server
        await axios.post(
          `${process.env.REACT_APP_API_URL}/${id}/add-reply/${commentId}`,
          newReply
        );
  
        // Cập nhật cục bộ
        setPost((prevPost) => ({
          ...prevPost,
          comments: updateNestedReplies(prevPost.comments, commentId, newReply),
        }));
      } catch (error) {
        console.error(
          "Error adding reply:",
          error.response ? error.response.data : error.message
        );
      }
    },
    [setPost, user, id, updateNestedReplies] // Thêm updateNestedReplies vào đây
  );
  
  
  const toggleReplying = (commentId) => {
    setIsReplyingMap((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], // Đảo trạng thái isReplying của comment được chọn
    }));
  };

  // Component Comment với trạng thái reply riêng cho từng comment
  const Comment = React.memo(({ comment }) => {
    const [replyContent, setReplyContent] = useState("");
    const isReplying = isReplyingMap[comment._id] || false;

    return (
      <div
        style={{
          marginLeft: "20px",
          borderLeft: "1px solid #ccc",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: "15px",
            flexDirection: "row",
          }}
        >
          <div className="comment-image">
            {comment.author.image ? (
              <img src={comment.author.image} alt="" />
            ) : (
              <img
                src="/images/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"
                alt="Avatar"
              />
            )}
          </div>

          <div className="content-comment">
            <u style={{ color: "var(--primary-color)" }}>
              <strong>{comment.author.username}</strong>
            </u>
            <p style={{ textAlign: "justify" }}>{comment.content}</p>

            <button
              className="button-reply"
              onClick={() => toggleReplying(comment._id)}
            >
              <i
                className={`fas ${isReplying ? "fa-times" : "fa-reply"}`}
                style={{ marginRight: "8px" }}
              />
              {isReplying ? "Cancel" : "Reply"}
            </button>
          </div>
        </div>

        {isReplying && (
          <div className="reply-content">
            <textarea
              placeholder="Your Reply"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                addReply(comment._id, replyContent);
                setReplyContent("");
              }}
            >
              <i className="bi bi-reply" style={{ fontSize: "30px" }}></i>
            </button>
          </div>
        )}

        {isReplying && comment.replies && comment.replies.length > 0 && (
          <div style={{ marginLeft: "20px", marginTop: "10px" }}>
            {comment.replies.map((reply) => (
              <Comment key={reply._id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    );
  });

  const CommentList = ({ comments }) => (
    <div>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="post">
        <div className="post-detail">
          <div className="post-content">
            <div className="post-main">
              <div className="post-imga">
                <img src={post.image} alt="" />
              </div>
              <br />
              <h2>
                <strong>{post.title}</strong>
              </h2>
              <br />
              <div className="post-header">
                <div className="avatar-account" style={{ marginLeft: "0px" }}>
                  {post.image_author ? ( // Kiểm tra nếu có avatar
                    <img src={post.author.image} alt="" /> // Hiển thị avatar
                  ) : (
                    <img
                      src="/images/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"
                      alt="Avatar"
                    />
                  )}
                </div>
                <div className="ffff">
                  <div>
                    <strong>
                      {post.author ? post.author.username : "N/A"}
                    </strong>
                  </div>
                  <div>{new Date(post.createdAt).toLocaleString()}</div>
                </div>
                <div className="like">
                  <Like
                    postId={post._id}
                    initialLikes={post.people_likes.length}
                    isLoggedIn={isLoggedIn}
                    userId={isLoggedIn ? user._id : null}
                  />
                </div>
              </div>
              <hr />
              <div className="post-para">
                <p style={{ textAlign: "justify" }}>{post.content}</p>
              </div>
            </div>

            <div className="comment-post">
              <div>
                {post.comments && <CommentList comments={post.comments} />}
              </div>

              {isLoggedIn ? (
                <div className="comment-form">
                  <div className="comment-avatar">
                    {user && user.image ? (
                      <img src={user.image} alt="" /> // Hiển thị avatar
                    ) : (
                      <i
                        className="bi bi-person-circle"
                        style={{ fontSize: "60px" }}
                      ></i>
                    )}
                    <p>{user.username}</p>
                  </div>
                  <div className="comment-input">
                    <strong>Add Comment</strong>
                    <textarea
                      placeholder="Your Comment"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <button onClick={() => addComment(post._id)}>
                      Add Comment
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="comment-form"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p>
                    You need to log in to add a comment.{" "}
                    <Link to="/login">Log in</Link>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="post-infor">
            <Profile post={post} />

            <div
              style={{
                width: "430px",
                height: "1px",
                backgroundColor: "black",
                margin: "20px",
              }}
            ></div>
            <h1>Latest post</h1>
            <div className="early-post">
              {getEarliestBlogs().map((blog) => (
                <div
                  key={blog._id}
                  style={{ width: "100%", height: "100%", margin: "20px" }}
                >
                  <div className="early-post-detail">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <ul>
                        <li style={{ color: "white", fontSize: "30px" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              width: "100%",
                              height: "30px",
                            }}
                          >
                            <p style={{ flexGrow: 1, marginRight: "10px" }}>
                              {blog.title}
                            </p>
                            <p
                              style={{
                                fontSize: "10px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                color: "#f2726a",
                              }}
                            >
                              {new Date(blog.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <p style={{ fontSize: "12px" }}>
                            {blog.content.length > 50
                              ? `${blog.content.substring(0, 50)}...`
                              : blog.content}
                          </p>
                        </li>

                        <div
                          style={{
                            width: "350px",
                            height: "1px",
                            backgroundColor: "white",
                          }}
                        ></div>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <br></br>
            <div
              style={{
                width: "430px",
                height: "1px",
                backgroundColor: "black",
                margin: "20px",
              }}
            ></div>
            <h1>Tags</h1>
            <div className="tags">
              {post.tags &&
                post.tags.length > 0 &&
                post.tags.map((tag, index) => (
                  <div className="post-tags" key={index}>
                    {tag}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
