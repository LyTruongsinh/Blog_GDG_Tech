const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://23021410:Sl2jCrBm63EqopFA@cluster0.gq1kc.mongodb.net/Nodejs?retryWrites=true&w=majority&appName=Cluster0");
const Schema = mongoose.Schema;
const BlogSchema = new Schema(
  {
    title: String,
    content: String,
    image_author: {
      type: String,
      require: false,
    },
    tags: {
      type: [String], // Đây là mảng chứa các tag dưới dạng chuỗi
      default: [],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "account",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Thiết lập mặc định là thời gian hiện tại
    },
    image: {
      type: String,
      require: false,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    people_likes: [{ type: Schema.Types.ObjectId, ref: "account" }],
  },
  {
    collection: "Blogs",
  }
);
const BlogModel = mongoose.model("blog", BlogSchema);
module.exports = BlogModel;
