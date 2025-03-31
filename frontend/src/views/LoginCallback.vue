<!-- src/views/OauthCallback.vue -->
<template>
    <div class="oauth-callback">
      <p>🔐 로그인 처리 중입니다...</p>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/userStore'
  
  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()
  
  onMounted(() => {
    const token = route.query.token
    const nickname = route.query.nickname
  
    if (token && nickname) {
      userStore.login({ token, nickname }) // ✅ 로그인 처리
      router.push('/board') // ✅ 게시판 페이지로 이동
    } else {
      alert("로그인 실패: 유효하지 않은 토큰입니다.")
      router.push('/login')
    }
  })
  </script>
  
  <style scoped>
  .oauth-callback {
    text-align: center;
    margin-top: 80px;
    font-size: 18px;
  }
  </style>
  