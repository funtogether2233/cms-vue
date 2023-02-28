<template>
  <el-container class="home">
    <el-aside :width="isFold ? '60px' : '200px'">
      <SidebarMenu :is-fold="isFold" />
    </el-aside>
    <el-container>
      <el-header height="50px">
        <Header @fold-change="handleFoldChange" />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SidebarMenu from '@/layout/SidebarMenu.vue';
import Header from '@/layout/header/index.vue';

const isFold = ref(false);

// 处理header中的折叠变化
function handleFoldChange(flag: boolean) {
  isFold.value = flag;
}
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
