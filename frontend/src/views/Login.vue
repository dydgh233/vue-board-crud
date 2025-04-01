<template>
    <div class="login-container">
      <h2>로그인</h2>
      <ElForm @submit.prevent="login">
        <ElFormItem label="아이디">
          <ElInput v-model="username" placeholder="아이디를 입력하세요" />
        </ElFormItem>
        <ElFormItem label="비밀번호">
          <ElInput
            v-model="password"
            placeholder="비밀번호를 입력하세요"
            show-password
            type="password"
            @keyup.enter="login"
          />
        </ElFormItem>
        <div class="login-buttons">
        <ElButton type="primary" class="full-width-btn" @click="login">로그인</ElButton>
        <RouterLink to="/register">
          <ElButton type="success" plain class="full-width-btn">회원가입</ElButton>
        </RouterLink>
        <ElButton class="full-width-btn" @click="googleLogin">
          <img src="/google-icon.png" style="width: 20px; height: 20px; margin-right: 8px;" alt="Google-icon" class="google logo" />
          <span>구글 로그인</span>
        </ElButton>
      </div>
      </ElForm>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  import { useUserStore } from '@/stores/userStore'
  
  const router = useRouter();
  const username = ref("");
  const password = ref("");
  const userStore = useUserStore()

  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  const login = async () => {
    if (!username.value || !password.value) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        username: username.value,
        password: password.value,
      });

      const token = response.data.token;
      const nickname = response.data.nickname;

      userStore.login({
        nickname: nickname,
        token: token,
      });

      // ✅ 로컬스토리지에도 저장
      localStorage.setItem("token", token);

      alert("로그인 성공!");
      router.push("/board");
    } catch (error) {
      console.error("로그인 실패", error);
      alert("로그인 실패. 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 80px auto;
    padding: 24px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
  .register-link {
    margin-left: 12px;
    color: #409eff;
    text-decoration: none;
    line-height: 32px;
  }
  .register-link:hover {
    text-decoration: underline;
  }
  .login-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px; /* 버튼 사이 간격 */
    margin-top: 20px;
  }
  .full-width-btn {
    width: 100%;
  }
  
  </style>
  