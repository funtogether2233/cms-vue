<template>
  <div class="sidebar-menu">
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!isFold">后台管理系统</h2>
    </div>
    <el-menu
      class="menu"
      default-active="39"
      :collapse="isFold"
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#001529"
    >
      <!-- el-sub-menu -->
      <template v-for="item in userMenus" :key="item.id">
        <el-sub-menu :index="item.id">
          <template #title>
            <!-- 动态组件展示图标 -->
            <el-icon>
              <component :is="item.icon.split('el-icon')[1]" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>

          <!-- el-menu-item -->
          <template v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item :index="subitem.id">{{ subitem.name }}</el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login';

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
});

const loginStore = useLoginStore();
const userMenus = loginStore.userMenus;
</script>

<style lang="less" scoped>
.sidebar-menu {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 5px;
    height: 50px;
    overflow: hidden;
    img {
      margin-right: 10px;
      margin: 0 15px;
      height: 25px;
    }
    .title {
      color: white;
      font-size: 16px;
      font-weight: bolder;
      white-space: nowrap;
    }
  }
  .menu {
    flex: 1;
    border-right: none;
    overflow: auto;

    // 消除滚动条
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }
  .el-menu {
    border-right: none;
    user-select: none;
    .el-sub-menu {
      .el-menu-item {
        // padding-left: 50px !important;
        background-color: #0c2135;
      }
      .el-menu-item:hover {
        color: #fff;
      }
      .el-menu-item.is-active {
        background-color: #0a60bd;
      }
    }
  }
}
</style>
