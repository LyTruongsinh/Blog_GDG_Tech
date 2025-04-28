const express = require("express");
const BlogModel = require("../models/blog.js");
const Comment = require("../models/comment.js")
const upload = require("../config/multer.js");
const router = express.Router();
router.get("/home", (req, res, next) => {
  res.json({ message: "Welcome to the Home Page!" });
});

router.post("/postblog", upload.single("image"), async (req, res, next) => {
  const { title, content, author, tags, image_author } = req.body;
  const imagePath = req.file.path
  try {
    const blog = await BlogModel.create({
      tags,
      title,
      content,
      author,
      image_author,
      image: imagePath,
    });
    res.json(blog);
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(400).json({ message: err.message });
  }
});

router.get('/bloglist', async (req, res) => {
  
  console.log('Fetching blog list...');  // Log khi gọi API
  try {
    console.log('Attempting to fetch blogs...');
    const blogs = await BlogModel.find();
    console.log('Blogs fetched successfully:', blogs);  // Log kết quả

    if (!blogs) {
      return res.status(404).json({ message: 'No blogs found' });
    }

    res.status(200).json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err);  // Log lỗi đầy đủ
    res.status(500).json({ message: 'Lỗi server khi lấy blog', error: err.message });
  }
});


router.get("/blogposted", async (req, res, next) => {
  try {
    const blogs = await BlogModel.find({
      author: req.session.data,
    }).populate("author", "comments");
    res.json(blogs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/postdelete/:id", async (req, res, next) => {
  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(req.params.id);
    if (!deletedBlog)
      return res.status(404).json({ message: "Bài đăng không tìm thấy." });
    res.json({ message: "Bài đăng đã được xóa thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  const { newTitle, newContent } = req.body; // Lấy tiêu đề và nội dung mới từ request body
  try {
    // Cập nhật bài viết theo ID
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      {
        title: newTitle,
        content: newContent,
      },
      { new: true } // Trả về bản ghi đã được cập nhật
    );

    if (!updatedBlog) {
      return res.status(404).json("Bài viết không tồn tại"); // Kiểm tra nếu bài viết không tìm thấy
    }

    res.json("Cập nhật thành công"); // Phản hồi thành công
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Update thất bại" }); // Phản hồi lỗi
  }
});

router.get("/detail/post/:id", async (req, res) => {
  // Thêm req và res vào tham số hàm
  try {
    const blog = await BlogModel.findById(req.params.id)
      .populate("author") 
      .populate({
        path: "comments", // Populate comments cấp 1
        populate: [
          {
            path: "author", // Populate thông tin của author comment cấp 1
            select: "username image", 
          },
          {
            path: "replies", // Populate replies cấp 2
            populate: [
              {
                path: "author", // Populate author của replies cấp 2
                select: "username image",
              },
              {
                path: "replies", // Populate replies cấp 3
                populate: [
                  {
                    path: "author", // Populate author của replies cấp 3
                    select: "username image",
                  },
                  {
                    path: "replies",// Populate author của replies cấp 4
                    populate: [
                      {
                        path: "author", // Populate author của replies cấp 4
                        select: "username image",
                      },
                      {
                        path: "replies", 
                      },
                    ], 
                  },
                ],
              },
            ],
          },
        ],
      })
      
      .exec();
    if (!blog) {
      return res.status(404).json({ message: "Post not found" });
    }
    console.log(blog);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving post", error: error });
  }
});


router.get("/comments/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    // Kiểm tra xem bài viết có tồn tại không (tuỳ thuộc vào logic của bạn)
    const post = await BlogModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Lấy danh sách comments liên kết với bài viết
    const comments = await Comment.find({ postId })

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/search", async (req, res) => {
  try {
    const query = req.query.query; // Lấy từ khóa tìm kiếm từ params

    if (!query) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp từ khóa tìm kiếm" });
    }

    const posts = await BlogModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Tìm theo tiêu đề, không phân biệt chữ hoa thường
        { content: { $regex: query, $options: "i" } }, // Tìm theo nội dung, không phân biệt chữ hoa thường
      ],
    }).limit(20); // Giới hạn kết quả trả về

    res.json(posts); // Trả về danh sách bài viết phù hợp
  } catch (err) {
    console.error(err); // Log lỗi để dễ theo dõi
    res.status(500).json({ message: "Đã xảy ra lỗi khi tìm kiếm" });
  }
});

router.post("/:userid/posts/:postid/like", async (req, res) => {
  try {
    const post = await BlogModel.findById(req.params.postid);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // Kiểm tra nếu người dùng đã thích bài viết hay chưa
    if (post.people_likes.includes(req.params.userid)) {
      return res.status(400).json({ message: "You already liked this post" });
    }
    // Thêm người dùng vào danh sách like
    post.people_likes.push(req.params.userid);
    await post.save();
    res.json({ likes: post.people_likes.length }); // Trả về số lượng like
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API để giảm like
router.put("/:userid/posts/:postid/like", async (req, res) => {
  try {
    const post = await BlogModel.findById(req.params.postid); 
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.params.userid;
    post.people_likes = post.people_likes.filter(
      (id) => id.toString() !== userId
    ); 

    await post.save(); // Lưu lại bài viết sau khi sửa đổi
    res.json({ likes: post.people_likes.length }); // Trả về số lượng like còn lại
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:userid/posts/:postid/liked', async (req, res) => {
  try {
    // Tìm bài viết theo postId
    const post = await BlogModel.findById(req.params.postid);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Kiểm tra xem userId có trong people_likes của bài viết hay không
    const isLiked = post.people_likes.includes(req.params.userid);

    // Trả về trạng thái liked (true hoặc false)
    res.json({
      isLiked,
      likesCount: post.people_likes.length, // Trả về số lượng likes
    });
  } catch (error) {
    console.error("Lỗi khi kiểm tra trạng thái like:", error);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/top-like", async (req, res) => {
  try {
    const topposts = await BlogModel.find()
      .populate('author')  
      .exec();
    const result = [];
    for (let i = 0; i < topposts.length; i++) {
      result.push({
        id: topposts[i]._id,
        image: topposts[i].image,
        author: topposts[i].author,
        content: topposts[i].content,
        title: topposts[i].title,  
        likeCount: topposts[i].people_likes.length 
      });
    }
    result.sort((a, b) => b.likeCount - a.likeCount);
    const top3Posts = result.slice(0, 3);
    res.json(top3Posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
