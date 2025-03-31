import { createRouter, createWebHistory } from "vue-router";
import BoardList from "@/views/Board.vue";
import BoardInsert from "@/views/BoardInsert.vue";
import PostDetail from "@/views/PostDetail.vue";
import BoardEdit from "@/views/BoardEdit.vue";
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import LoginCallback from "@/views/LoginCallback.vue"

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/board", component: BoardList },
  { path: "/board/insert", component: BoardInsert },
  { path: "/post/:id", component: PostDetail },
  { path: "/board/edit/:id", component: BoardEdit },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: "/oauth-callback", component: LoginCallback },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
