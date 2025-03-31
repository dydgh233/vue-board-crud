<template>
  <PostForm :onSubmit="submitPost" :onCancel="goBack" submitText="작성하기" />
</template>

<script setup>
import PostForm from "@/components/PostForm.vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const submitPost = async (form) => {
  console.log("폼 데이터", form);
  await axios.post("http://localhost:5000/api/posts", form);
  alert("등록되었습니다");
  router.push("/board");
};

const goBack = () => {
  router.push("/board");
};
</script>
