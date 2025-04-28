const express = require("express");
const AccountModel = require("../models/account.js");
const upload = require("../config/multer");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await AccountModel.findOne({ username });
    if (existingUser) {
      return res.json("Tạo khoản đã tồn tại");
    }
    (await AccountModel.create({ username, password, email })).save();
    res.json("Tạo tài khoản thành công");
  } catch (err) {
    res.status(500).json("Tạo tài khoản thất bại");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await AccountModel.findOne({ username, password });
    if (user) {
      req.session.data = user;

      res.json(req.session.data);
    } else {
      console.log("Đăng nhập không thành công");
    }
  } catch (err) {
    res.status(500).json("Lỗi Server");
  }
});

router.post(
  "/update-image/:userId",
  upload.single("image"),
  async (req, res) => {
    const { address, phone, jobs } = req.body;

    // Kiểm tra xem file có được tải lên không
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Kiểm tra các trường nhập vào (optional)
    if (!address || !phone || !jobs) {
      return res.status(400).json({ error: "Address, phone, and jobs are required" });
    }

    try {
      const userId = req.params.userId;
      const imagePath = req.file.path;

      // Cập nhật thông tin người dùng
      const updatedAccount = await AccountModel.findByIdAndUpdate(
        userId,
        { address, phone, jobs, image: imagePath },
        { new: true } // Đảm bảo trả về tài liệu đã được cập nhật
      );

      // Kiểm tra xem người dùng có tồn tại không
      if (!updatedAccount) {
        return res.status(404).json({ error: "User not found" });
      }

      // Trả về dữ liệu người dùng đã được cập nhật
      res.json(updatedAccount);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);


router.get("/check-session", (req, res) => {
  if (req.session.data) {
    res.json({ user: req.session.data });
  } else {
    res.status(401).json({ message: "No session" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout error" });
    }
    res.json({ message: "Logout successful" }); // Trả về thông báo thay vì redirect
  });
});

module.exports = router;
