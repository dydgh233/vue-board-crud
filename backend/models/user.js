const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String }, // ← required 제거
  password: { type: String }, // ← required 제거
  nickname: { type: String, required: true },
  provider: { type: String, default: "local" }, // 구글/로컬 구분
  googleId: { type: String }, // 구글 로그인 ID 저장
});

module.exports = mongoose.model("User", userSchema);
