<template>
  <div class="post-detail">
    <!-- 제목 -->
    <h1 class="post-title">{{ post.title }}</h1>

    <!-- 작성 정보 -->
    <div class="post-meta">
      <span><strong>작성자:</strong> {{ post.name }}</span>
      <span><strong>작성일:</strong> {{ formatDate(post.createdAt) }}</span>
    </div>

    <!-- 본문 -->
    <div class="post-content">
      <p>{{ post.content }}</p>
    </div>

    <!-- 버튼 -->
    <div class="post-actions">
      <ElButton type="primary" @click="goBack">⬅ 뒤로</ElButton>
      <ElButton type="warning" @click="updatePost">✏ 수정</ElButton>
      <ElButton type="danger" @click="deletePost">🗑 삭제</ElButton>
    </div>
  </div>

  <!-- 댓글 섹션 -->
  <div class="comment-section">
    <h2>💬 댓글</h2>

    <div v-if="post.comments.length > 0" class="comment-list">
      <div v-for="(comment, index) in post.comments" :key="index" class="comment-item">
        <p class="comment-meta"><strong>{{ comment.name }}</strong> · {{ formatDate(comment.createdAt) }}</p>
        <p class="comment-content">{{ comment.content }}</p>
      </div>
    </div>
    <div v-else class="comment-empty">댓글이 없습니다.</div>

    <!-- 댓글 작성 -->
    <div class="comment-form">
      <ElInput v-model="commentForm.name" placeholder="닉네임" class="comment-name" size="small" />
      <ElInput
        v-model="commentForm.content"
        placeholder="댓글을 입력하세요"
        type="textarea"
        rows="3"
        class="comment-input"
      />
      <ElButton type="primary" size="small" @click="submitComment">등록</ElButton>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import axios from "axios";
  import dayjs from "dayjs";
  
  const route = useRoute();
  const router = useRouter();
  const post = ref({ title: "", name: "", createdAt: "", content: "", comments: [] });
  const commentForm = ref({
    name: "",
    content: "",
  });
  const formatDate = (date) => dayjs(date).format("YYYY-MM-DD HH:mm");
  
  const detailPost = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${route.params.id}`);
      post.value = response.data;
    } catch (error) {
      console.error("게시글을 불러오는 중 오류 발생", error);
    }
  };

  const updatePost = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/${route.params.id}`);
      post.value = response.data;
      goUpdate()
    } catch (error) {
      console.error("게시글을 불러오는 중 오류 발생", error);
    }
  };

  const deletePost = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${route.params.id}`);
      goBack()
    } catch (error) {
      console.error("게시글을 불러오는 중 오류 발생", error);
    }
  };

  const submitComment = async () => {
    if (!commentForm.value.name || !commentForm.value.content) {
      alert("작성자와 댓글 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts/${route.params.id}/comments`,
        commentForm.value
      );
      post.value.comments = response.data.comments; // 최신 댓글 목록 반영
      commentForm.value.name = "";
      commentForm.value.content = "";
    } catch (error) {
      console.error("댓글 등록 중 오류 발생", error);
    }
  };
  
  const goBack = () => {
    router.push("/board");
  };

  const goUpdate = () => {
    router.push(`/board/edit/${route.params.id}`);
  };
  
  onMounted(() => detailPost());
  </script>
  
  <style scoped>
    /* 게시글 상세 */
    .post-detail {
      max-width: 700px;
      margin: auto;
      padding: 24px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #fff;
      color: #222;
    }

    .dark .post-detail {
      background-color: #1e1e1e;
      border-color: #444;
      color: #ddd;
    }

    .post-title {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 12px;
    }

    .post-meta {
      display: flex;
      justify-content: space-between;
      color: #666;
      font-size: 14px;
      margin-bottom: 16px;
    }

    .dark .post-meta {
      color: #aaa;
    }

    .post-content {
      white-space: pre-wrap;
      border-top: 1px solid #eee;
      padding-top: 16px;
      margin-bottom: 24px;
      font-size: 15px;
      line-height: 1.6;
    }

    .dark .post-content {
      border-color: #333;
    }

    /* 버튼 영역 */
    .post-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-bottom: 40px;
    }

    /* 댓글 */
    .comment-section {
      max-width: 700px;
      margin: auto;
      padding: 24px;
      border-top: 2px solid #ccc;
    }

    .dark .comment-section {
      border-color: #444;
    }

    .comment-section h2 {
      font-size: 18px;
      margin-bottom: 16px;
    }

    .comment-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .comment-item {
      background-color: #f7f7f7;
      padding: 12px;
      border-radius: 6px;
      color: #222;
    }

    .dark .comment-item {
      background-color: #2c2c2c;
      color: #ccc;
    }

    .comment-meta {
      font-size: 13px;
      color: #555;
      margin-bottom: 6px;
    }

    .dark .comment-meta {
      color: #aaa;
    }

    .comment-form {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .comment-name {
      width: 150px;
    }

    .comment-input {
      width: 100%;
    }

    .comment-form .el-button {
      align-self: flex-end;
      width: 80px;
    }
</style>
