const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Passport 구글 전략 설정
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,       // .env에 설정한 Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // .env에 설정한 Client Secret
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // profile에서 필요한 정보를 추출 (예: 이메일, 이름 등)
        const { id, displayName, emails } = profile;

        // 사용자 조회 또는 생성 로직
        let user = await User.findOne({ googleId: id });
        if (!user) {

          // 새로운 사용자 생성 (필요한 필드에 맞게 수정)
          user = new User({
            googleId: id,
            nickname: displayName,
            email: emails && emails[0] ? emails[0].value : "",
          });
          await user.save();
        }
        // 사용자 정보를 done()에 전달 (에러, user)
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// 직렬화와 역직렬화 (간단한 예시)
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// 구글 로그인 요청 라우트
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 구글 로그인 콜백 라우트
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // 로그인 성공 후, JWT 토큰 생성
    const token = jwt.sign(
      { id: req.user._id, nickname: req.user.nickname },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    // 여기서 토큰을 클라이언트로 전달하거나, 프론트엔드 URL로 리다이렉트하면서 전달할 수 있음.
    // 예를 들어, 프론트엔드 URL로 리다이렉트하면서 쿼리 파라미터로 토큰 전달:
    res.redirect(`http://vue-board-crud.vercel.app/oauth-callback?token=${token}&nickname=${encodeURIComponent(req.user.nickname)}`);

  }
);


// 회원가입
router.post("/register", async (req, res) => {
  const { username, password, nickname } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed, nickname });
  await user.save();
  res.json({ message: "회원가입 완료" });
});

// 로그인
router.post("/login", async (req, res) => {
  console.log("req.body", req.body)
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "로그인 실패" });

  const token = jwt.sign({ id: user._id, nickname: user.nickname }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token, nickname : user.nickname});
});

module.exports = router;

  
