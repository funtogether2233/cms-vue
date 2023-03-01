<template>
  <div class="user">
    <UserSearch />
    <UserContent />
  </div>
</template>

<script setup lang="ts">
import UserSearch from './components/UserSearch.vue';
import UserContent from './components/UserContent.vue';
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
