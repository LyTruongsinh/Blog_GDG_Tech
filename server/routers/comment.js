// routers/comment.js
const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const BlogModel = require("../models/blog.js");
// Thêm một bình luận gốc (không có parent)
router.post("/:postId/add-comment", async (req, res) => {
  try {
    const { postId } = req.params; // Truy xuất postId trực tiếp từ req.params
    const { author, content } = req.body;
    const newComment = await Comment.create({ postId, author, content });
    // Cập nhật bài viết để thêm comment mới vào trường comments
    await BlogModel.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment._id } }, // Thêm ID của comment vào mảng comments
      { new: true } // Trả về tài liệu đã cập nhật
    );
    res.json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment" });
  }
});

// Thêm một reply vào comment bằng commentId
router.post("/:postId/add-reply/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const postId  = req.params.postId;
    const { content, author } = req.body;
    // Tìm comment cha và thêm reply vào mảng replies của nó
    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res.status(404).json({ message: "Parent comment not found" });
    }

    const newReply = await Comment.create({
      content,
      author,
      postId : postId
    });
    parentComment.replies.push(newReply._id);
    await parentComment.save();

    res.json({ message: "Reply added", comment: parentComment });
  } catch (error) {
    res.status(500).json({ message: "Error adding reply", error });
  }
});

module.exports = router;
