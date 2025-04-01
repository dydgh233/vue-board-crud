<template>
    <div class="post-detail">
      <h1>{{ post.title }}</h1>
      <p><strong>작성자:</strong> {{ post.name }}</p>
      <p><strong>작성일:</strong> {{ post.createdAt }}</p>
      <p class="content"><strong>내용:</strong>{{ post.content }}</p>
      
      <ElButton type="primary" @click="goBack">뒤로 가기</ElButton>
      <ElButton type="primary" @click="updatePost">수정</ElButton>
      <ElButton type="primary" @click="deletePost">삭제</ElButton>
    </div>
    <!-- 기존 게시글 상세 내용 아래에 추가 -->
  <div class="comment-section">
    <h2>💬 댓글</h2>
    <!-- 댓글 목록 -->
    <div v-if="post.comments.length > 0" class="comment-list">
      <div v-for="(comment, index) in post.comments" :key="index" class="comment-item">
        <p><strong>{{ comment.name }}</strong> · {{ formatDate(comment.createdAt) }}</p>
        <p>{{ comment.content }}</p>
      </div>
    </div>
    <div v-else>댓글이 없습니다.</div>

    <!-- 댓글 작성 -->
    <div class="comment-form">
      <ElInput v-model="commentForm.name" placeholder="작성자" class="comment-input" />
      <ElInput
        v-model="commentForm.content"
        placeholder="댓글을 입력하세요"
        type="textarea"
        rows="3"
        class="comment-input"
      />
      <ElButton type="primary" @click="submitComment">댓글 등록</ElButton>
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
  .post-detail {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  .content {
    white-space: pre-wrap;
  }
  .comment-section {
  margin-top: 40px;
  padding: 20px;
  border-top: 2px solid #e0e0e0;
}

.comment-section h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment-item {
  background-color: #f4f6f8;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  color: #222;
}

.comment-item p {
  margin: 4px 0;
  line-height: 1.5;
}

.comment-item strong {
  color: #1e88e5;
  font-weight: 600;
}
.comment-form {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comment-input {
  width: 100%;
}

.comment-form .el-button {
  align-self: flex-end;
}
  </style>
  