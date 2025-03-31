<script lang="ts" setup>
import { repository } from '~/../package.json'
import { useRouter } from 'vue-router'
import { toggleDark } from '~/composables'
import { useUserStore } from '~/stores/userStore'

const userStore = useUserStore()
const router = useRouter()

console.log("userStore", userStore)
const logout = () => {
  userStore.logout()
  router.push('/login') // 로그아웃 후 로그인 페이지로 이동
}
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
    <el-menu-item index="/">
      <div class="flex items-center justify-center gap-2">
        <div class="text-xl" i-ep-element-plus />
        <span>용호 포트폴리오</span>
      </div>
    </el-menu-item>
    <el-menu-item>
      <div v-if="userStore.token">
        {{ userStore.nickname }}님 환영합니다!
        <ElButton @click="logout">로그아웃</ElButton>
      </div>
      <div v-else>
        <RouterLink to="/login">로그인</RouterLink>
      </div>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      Info
    </el-menu-item>
    <el-menu-item index="4">
      Orders
    </el-menu-item>

    <el-menu-item h="full" @click="toggleDark()">
      <button
        class="w-full cursor-pointer border-none bg-transparent"
        style="height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>

    <el-menu-item h="full">
      <a class="size-full flex items-center justify-center" :href="repository.url" target="_blank">
        <div i-ri-github-fill />
      </a>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss">
.el-menu-demo {
  &.ep-menu--horizontal > .ep-menu-item:nth-child(1) {
    margin-right: auto;
  }
}
</style>
