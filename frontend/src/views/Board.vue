<template>
    <div class="board-container">
      <h1 class="board-title">게시판 목록</h1>
      <div class="board-search">
        <ElInput v-model="searchTitle" placeholder="제목 검색" class="search-input" @keyup.enter="selectList"/>
        <ElInput v-model="searchName" placeholder="작성자 검색" class="search-input" @keyup.enter="selectList"/>
        <ElButton type="primary" @click="selectList">검색</ElButton>
        <ElButton type="primary" @click="insertRow">새 글 작성</ElButton>
      </div>
      <ElTable :data="posts" style="width: 100%">
          <ElTableColumn label="순번" width="70">
            <template #default="{ $index }">
              {{ (currentPage - 1) * pageSize + $index + 1 }}
            </template>
          </ElTableColumn>
        <ElTableColumn prop="title" label="제목">
          <template #default="{ row }">
            <RouterLink :to="`/post/${row._id}`" class="post-link">{{ row.title }}</RouterLink>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" label="작성자" width="100" />
        <ElTableColumn label="작성일" width="160">
          <template #default="{ row }">
            {{ dayjs(row.createdAt).format("YYYY-MM-DD HH:mm") }}
          </template>
        </ElTableColumn>
      </ElTable>
  
      <ElPagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalPosts"
        @current-change="selectList"
      />
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from "vue";
    import { useRouter } from "vue-router";
    import axios from "axios";
    import dayjs from "dayjs";
    
    const router = useRouter();
    const posts = ref([]);
    const currentPage = ref(1);
    const pageSize = 10;
    const totalPosts = ref(0);
    const searchTitle = ref("");
    const searchName = ref("");

    
    // 조회 API
    const selectList = async (page = 1) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts` ,{
              params:{
                page,
                limit: pageSize,
                title: searchTitle.value,
                name: searchName.value,
              }
            });
            posts.value = response.data.posts;
            totalPosts.value = response.data.total;
        } catch (error) {
            console.error("게시글을 불러오는 중 오류 발생", error);
        }
    };
    
    // 새글 작성
    const insertRow = () => {
        router.push("/board/insert");
    };
    
    onMounted(() => selectList(currentPage.value));

  </script>
  
  <style scoped>
  .board-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  .board-title {
    text-align: center;
    margin-bottom: 20px;
  }
  .post-link {
    text-decoration: none;
    color: #007bff;
  }
  .post-link:hover {
    text-decoration: underline;
  }
  .board-search {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  .search-input {
    width: 200px;
  }
  </style>
  