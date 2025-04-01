const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

// 앱 초기화
const app = express();
const PORT = process.env.PORT || 5000;

// 🔧 미들웨어 설정
// 👉 수정된 코드 (프론트 도메인을 명시적으로 허용)
app.use(cors({
  origin: [
    "http://localhost:5173", // 로컬 개발용 (Vite 기본 포트)
    "https://vue-board-crud.vercel.app", // 배포된 프론트 주소
  ],
  credentials: true, // 필요시 쿠키 등 인증정보 포함
}));
app.use(express.json());

// 🔐 세션 설정 (Passport 전에 등록 필수)
app.use(session({
  secret: process.env.JWT_SECRET || "your_jwt_secret",
  resave: false,
  saveUninitialized: false,
}));

// 🔑 Passport 초기화
app.use(passport.initialize());
// 세션 기반 Passport 사용 시 아래도 추가 가능
// app.use(passport.session());

// 🌐 MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB 연결 완료"))
.catch((err) => console.error("❌ MongoDB 연결 실패:", err));

// 📦 라우터 연결
app.use("/api/posts", require("./routes/posts"));   // 게시판 라우터
app.use("/api/auth", require("./routes/auth"));     // 인증 라우터 (로그인/회원가입 등)

// 🚀 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
