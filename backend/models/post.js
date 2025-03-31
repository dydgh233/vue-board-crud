const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    name: String,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    name: String,
    createdAt: { type: Date, default: Date.now },
    comments: [commentSchema], // ✅ 댓글 배열
});


module.exports = mongoose.model("Post", PostSchema);
