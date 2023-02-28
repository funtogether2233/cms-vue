<template>
  <div class="header-breadcrumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import useLoginStore from '@/store/login';
import { mapPathToBreadcrumb } from '@/utils/mapMenus';


const route = useRoute();
const loginStore = useLoginStore();
const userMenus = loginStore.userMenus;
const breadcrumbs = computed(() => mapPathToBreadcrumb(route.path, userMenus));
</script>

<style lang="less" scoped></style>
