<template>
  <div class="home">home</div>
  <button @click="logout">退出登录</button>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants';
import router from '@/router';
import { localCache } from '@/utils/cache';

// 退出登录
function logout() {
  // 删除token
  localCache.removeCache(LOGIN_TOKEN);

  // 跳回login界面
  router.push('/login');
}
</script>

<style lang="less" scoped></style>
