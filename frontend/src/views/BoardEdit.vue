<template>
    <PostForm
      :initialData="post"
      :onSubmit="updatePost"
      :onCancel="goBack"
      submitText="수정하기"
    />
  </template>
  
  <script setup>
  import PostForm from "@/components/PostForm.vue";
  import { ref, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import axios from "axios";
  
  const router = useRouter();
  const route = useRoute();
  const post = ref({});
  
  onMounted(async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${route.params.id}`);
    post.value = res.data;
  });
  
  const updatePost = async (form) => {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/${route.params.id}`, form);
    alert("수정 완료!");
    router.push("/board");
  };
  
  const goBack = () => {
    router.push("/board");
  };
  </script>
  