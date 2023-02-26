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

const accountForm = reactive<IAccount>({
  name: '',
  password: ''
});

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

const accountFormRef = ref<InstanceType<typeof ElForm>>();
const loginStore = useLoginStore();

function accountLogin() {
  console.log('loginAccount');
  accountFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('登录成功！');
      const name = accountForm.name;
      const password = accountForm.password;
      loginStore.accountLoginAction({ name, password });
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
