# 📝 Vue3 + Node.js(MongoDB) 게시판 CRUD 프로젝트

> 로그인 / 게시판 / 댓글 / 검색 / JWT / 구글 소셜 로그인까지!  
> 개인 포트폴리오용으로 만든 풀스택 프로젝트입니다.

---

## 📌 주요 기능

### 📋 게시판 기능 (CRUD)
- 게시글 목록 조회
- 페이지네이션 (10개씩 분할)
- 제목/작성자 필터 검색
- 게시글 작성 / 상세 조회 / 수정 / 삭제

### 💬 댓글 기능
- 게시글 하단에 댓글 목록 출력
- 댓글 작성 가능 (로그인 시만 가능)

### 👤 사용자 인증
- 회원가입 (닉네임, 아이디, 비밀번호)
- 비밀번호 암호화 (`bcrypt`)
- 로그인 → JWT 발급 → 프론트 저장 (Pinia + localStorage)
- 로그아웃 기능
- 로그인 상태 유지 (`pinia-plugin-persist`)

### 🔐 소셜 로그인
- ✅ 구글 로그인 연동 (OAuth2, Passport.js 사용)

---

## 🛠️ 사용 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | Vue 3, Vite, Pinia, Vue Router, Axios, Element Plus, Dayjs |
| Backend | Node.js, Express.js, Mongoose, MongoDB, JWT, bcrypt |
| Auth | JWT (토큰 기반 인증), Passport.js (Google OAuth2) |
| 기타 | GitHub, REST API, MongoDB Compass, dotenv |


