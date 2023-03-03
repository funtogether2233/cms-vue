<template>
  <div class="user">
    <UserSearch
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <UserContent
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <UserModal ref="modalRef"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserSearch from './components/UserSearch.vue';
import UserContent from './components/UserContent.vue';
import UserModal from './components/UserModal.vue';

// 对content组件操作
const contentRef = ref<InstanceType<typeof UserContent>>();
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData);
}
function handleResetClick() {
  contentRef.value?.fetchUserListData();
}

// 对modal组件的操作
const modalRef = ref<InstanceType<typeof UserModal>>();
function handleNewClick() {
  modalRef.value?.setModalVisible();
}
function handleEditClick(itemData: any) {
  console.log(itemData);
  modalRef.value?.setModalVisible(false, itemData);
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
