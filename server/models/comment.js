// models/Comment.js
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://23021410:Sl2jCrBm63EqopFA@cluster0.gq1kc.mongodb.net/Nodejs?retryWrites=true&w=majority&appName=Cluster0");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
      required: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "account"
    },
    content: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ], // Mảng chứa các comment con
  },
  {
    collection: "Comments",
  }
);

const CommentModel = mongoose.model("comment", CommentSchema);
module.exports = CommentModel;
