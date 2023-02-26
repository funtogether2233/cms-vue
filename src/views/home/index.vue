<template>
  <el-container class="home">
    <el-aside :width="isFold ? '60px' : '200px'">
      <SidebarMenu :is-fold="isFold" />
    </el-aside>
    <el-container>
      <el-header height="50px">
        <Header @fold-change="handleFoldChange" />
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
  <!-- <button @click="logout">退出登录</button> -->
</template>

<script setup lang="ts">
// import { LOGIN_TOKEN } from '@/global/constants';
// import router from '@/router';
// import { localCache } from '@/utils/cache';

import { ref } from 'vue';
import SidebarMenu from '@/layout/SidebarMenu.vue';
import Header from '@/layout/header/index.vue';

const isFold = ref(false);

// 处理header中的折叠变化
function handleFoldChange(flag: boolean) {
  isFold.value = flag;
}

// 退出登录
// function logout() {
//   // 删除token
//   localCache.removeCache(LOGIN_TOKEN);

//   // 跳回login界面
//   router.push('/login');
// }
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-aside {
    transition: width 0.3s ease;
  }
  .el-main {
    background: #f0f2f5;
  }
}
</style>
