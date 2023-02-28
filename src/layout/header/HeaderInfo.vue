<template>
  <div class="header-info">
    <!-- 操作部件 -->
    <div class="operation">
      <span>
        <el-icon><Search /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Message /></el-icon>
      </span>
    </div>

    <!-- 个人信息 -->
    <div class="info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <div class="user-info">
            <el-avatar :size="30" src="src/assets/img/default-avatar.jpg" />
            <span class="name">funtogether2233</span>
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Lock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN, LOGIN_STATE } from '@/global/constants';
import router from '@/router';
import useLoginStore from '@/store/login';
import { localCache } from '@/utils/cache';
import { mapMenusToRoutes } from '@/utils/mapMenus';
import type { RouteRecordName } from 'vue-router';

const useLogin = useLoginStore();

// 退出登录
function logout() {
  // 删除token
  localCache.removeCache(LOGIN_TOKEN);
  localCache.removeCache(LOGIN_STATE.userInfo);
  localCache.removeCache(LOGIN_STATE.userMenus);

  // 移除动态路由
  const routes = mapMenusToRoutes(useLogin.userMenus);
  for (const route of routes) {
    router.removeRoute(route?.name as RouteRecordName);
  }

  // 跳回login界面
  router.push('/login');
}
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
  .operation {
    display: flex;
    margin-right: 20px;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      height: 40px;
      width: 40px;
      cursor: pointer;
      &:hover {
        background: #f2f2f2;
      }
      i {
        font-size: 20px;
      }
      .dot {
        position: absolute;
        top: 8px;
        right: 8px;
        border-radius: 50%;
        height: 6px;
        width: 6px;
        background: red;
        z-index: 10;
      }
    }
  }
  .info {
    :global(.el-dropdown-menu__item) {
      line-height: 32px !important;
    }
    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;
      .name {
        margin-left: 5px;
      }
    }
  }
}
</style>
