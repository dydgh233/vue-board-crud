const express = require("express");
const router = express.Router();
const Post = require("../models/post");

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: 게시글 전체 조회
 *     responses:
 *       200:
 *         description: 게시글 목록
 */
router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 10, title = "", name = "" } = req.query;
      const query = {
        title: { $regex: title, $options: "i" }, // 대소문자 구분 없이 부분 검색
        name: { $regex: name, $options: "i" },
      };
  
      const skip = (page - 1) * limit;
  
      const posts = await Post.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 });
      const total = await Post.countDocuments(query);
  
      res.json({ posts, total });
    } catch (err) {
      console.error("게시글 검색 오류:", err);
      res.status(500).json({ error: "검색 실패" });
    }
  });
  

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: 게시글 작성
 *     responses:
 *       200:
 *         description: 작성 하면 파라미터가 뭐가나오는지 확인할려고 스웨거 써봄봄
 */
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json({ message: "게시글이 등록되었습니다!", post: newPost });
});

// 📌 게시글 상세 조회
router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: "게시글을 찾을 수 없습니다" });
      res.json(post);
    } catch (err) {
      console.error("게시글 조회 오류", err);
      res.status(500).json({ message: "서버 오류" });
    }
  });

// 📌 게시글 수정
router.put("/:id", async (req, res) => {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("updatedPost", updatedPost)
    res.json({ message: "게시글이 수정되었습니다!", post: updatedPost });
});

// 📌 게시글 삭제
router.delete("/:id", async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "게시글이 삭제되었습니다!" });
});

// 📌 댓글 등록
router.post("/:id/comments", async (req, res) => {
    const { name, content } = req.body;
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ error: "게시글 없음" });
  
      post.comments.push({ name, content });
      await post.save();
  
      res.json({ message: "댓글 등록 완료", comments: post.comments });
    } catch (error) {
      console.error("댓글 등록 오류:", error);
      res.status(500).json({ error: "댓글 등록 실패" });
    }
  });

module.exports = router;
