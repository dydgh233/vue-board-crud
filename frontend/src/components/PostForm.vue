<template>
    <div class="form-container">
      <ElInput v-model="form.title" placeholder="제목을 입력하세요" class="form-item" />
      <ElInput v-model="form.name" placeholder="작성자 이름" class="form-item" />
      <ElInput
        v-model="form.content"
        type="textarea"
        placeholder="내용을 입력하세요"
        class="form-item"
        rows="6"
      />
      <div class="button-group">
        <ElButton type="primary" @click="handleSubmit">{{ submitText }}</ElButton>
        <ElButton @click="onCancel">취소</ElButton>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  
  const props = defineProps({
    initialData: Object,
    onSubmit: Function,
    onCancel: Function,
    submitText: { type: String, default: "작성하기" }
  });
  
  const form = ref({
    title: "",
    name: "",
    content: ""
  });
  
  watch(() => props.initialData, (val) => {
    if (val) form.value = { ...val };
  }, { immediate: true });
  
  const handleSubmit = () => {
    if (!form.value.title || !form.value.name || !form.value.content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    props.onSubmit(form.value);
  };
  </script>
  
  <style scoped>
  .form-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  .form-item {
    margin-bottom: 16px;
  }
  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  </style>
  