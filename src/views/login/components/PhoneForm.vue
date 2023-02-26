<template>
  <div class="phone-form">
    <el-form ref="accountFormRef">
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="captcha">
          <el-input />
          <el-button class="get-captcha-btn" type="primary">
            获取验证码
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.captcha {
  display: flex;
  .get-captcha-btn {
    margin-left: 8px;
  }
}
</style>
