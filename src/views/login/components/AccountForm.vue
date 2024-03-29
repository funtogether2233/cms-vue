<template>
  <div class="account-form">
    <el-form
      :model="accountForm"
      :rules="accountFormRules"
      ref="accountFormRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="accountForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="accountForm.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import type { ElForm, FormRules } from 'element-plus';
import useLoginStore from '@/store/login';
import type { IAccount } from '@/types/index';
import { localCache } from '@/utils/cache';

// account缓存常量
const ACCOUNT_CACHE = {
  name: 'name',
  password: 'password'
};

const loginStore = useLoginStore();
// account数据
const accountForm = reactive<IAccount>({
  name: localCache.getCache(ACCOUNT_CACHE.name) ?? '',
  password: localCache.getCache(ACCOUNT_CACHE.password) ?? ''
});
const accountFormRef = ref<InstanceType<typeof ElForm>>();

// 校验规则
const accountFormRules: FormRules = {
  name: [
    { required: true, message: '请输入帐号！', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,18}$/,
      message: '必须为6-18位数字或字母！',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码！', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,18}$/,
      message: '必须为6-18位数字或字母！',
      trigger: 'blur'
    }
  ]
};

// 账号登陆
function accountLogin(isRemPwd: boolean) {
  accountFormRef.value?.validate((valid) => {
    if (valid) {
      // 获取帐号和密码
      const name = accountForm.name;
      const password = accountForm.password;

      // 发送登录请求
      loginStore
        .accountLoginAction({ name, password })
        .then(() => {
          // 记住密码
          if (isRemPwd) {
            localCache.setCache(ACCOUNT_CACHE.name, name);
            localCache.setCache(ACCOUNT_CACHE.password, password);
          } else {
            localCache.removeCache(ACCOUNT_CACHE.name);
            localCache.removeCache(ACCOUNT_CACHE.password);
          }
        })
        .catch(() => {
          ElMessage.error('帐号或密码不正确');
        });
    } else {
      ElMessage.error('登录失败');
    }
  });
}

defineExpose({
  accountLogin
});
</script>

<style lang="less" scoped></style>
