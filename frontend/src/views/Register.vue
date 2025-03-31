<template>
    <div class="register-container">
      <h2>📝 회원가입</h2>
  
      <ElForm @submit.prevent="register">
        <ElFormItem label="아이디">
          <ElInput v-model="username" placeholder="아이디 입력" />
        </ElFormItem>
  
        <ElFormItem label="비밀번호">
          <ElInput
            v-model="password"
            type="password"
            show-password
            placeholder="비밀번호 입력"
          />
        </ElFormItem>
  
        <ElFormItem label="닉네임">
          <ElInput v-model="nickname" placeholder="닉네임 입력" />
        </ElFormItem>
  
        <ElButton type="primary" @click="register">가입하기</ElButton>
        <ElButton @click="goLogin" style="margin-left: 10px">로그인하기</ElButton>
      </ElForm>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  
  const router = useRouter();
  const username = ref("");
  const password = ref("");
  const nickname = ref("");
  
  const register = async () => {
    if (!username.value || !password.value || !nickname.value) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
  
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username: username.value,
        password: password.value,
        nickname: nickname.value,
      });
  
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      router.push("/login");
    } catch (error) {
      console.error("회원가입 오류", error);
      alert("회원가입 실패. 아이디가 중복되었을 수 있습니다.");
    }
  };
  
  const goLogin = () => {
    router.push("/login");
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 80px auto;
    padding: 24px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
  </style>
  