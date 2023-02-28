<template>
  <div class="header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="32px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="header-content">
      <HeaderBreadcrumb />
      <HeaderInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderBreadcrumb from './HeaderBreadcrumb.vue';
import HeaderInfo from './HeaderInfo.vue';

const emit = defineEmits(['foldChange']);

const isFold = ref(false);

// 点击折叠侧边菜单
function handleMenuIconClick() {
  // 内部图标状态改变
  isFold.value = !isFold.value;

  // 传递状态给父组件
  emit('foldChange', isFold.value);
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
