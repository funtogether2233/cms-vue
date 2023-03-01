<template>
  <div class="user">
    <UserSearch />
    <div class="content">
      <div class="content-haeder">头部</div>
      <div class="content-table">表格</div>
      <div class="pagination">分页</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './components/UserSearch.vue';
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
