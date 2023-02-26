<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h1 class="title">后台管理系统</h1>

    <!-- 中间tabs切换 -->
    <div class="tabs">
      <el-tabs type="border-card" v-model="activeName" stretch>
        <!-- 帐号登录 -->
        <el-tab-pane label="账号登陆" name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <AccountForm ref="accountFormRef" />
        </el-tab-pane>

        <!-- 手机登陆 -->
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登陆</span>
            </div>
          </template>
          <PhoneForm ref="phoneFormRef" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部 -->
    <div class="account-control">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" @click="login" type="primary" size="large">
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AccountForm from './AccountForm.vue';
import PhoneForm from './PhoneForm.vue';

const activeName = ref('account');
const accountFormRef = ref<InstanceType<typeof AccountForm>>();
const phoneFormRef = ref<InstanceType<typeof PhoneForm>>();
const isRemPwd = ref(false);

function login() {
  if (activeName.value === 'account') {
    console.log('账号登陆');
    accountFormRef.value?.accountLogin();
  } else {
    console.log('手机登陆');
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 300px;
  .title {
    text-align: center;
  }
  .tabs {
    .label {
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        margin-left: 5px;
      }
    }
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
