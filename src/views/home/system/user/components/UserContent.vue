<template>
  <div class="user-content">
    <div class="content-header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" size="large">新建用户</el-button>
    </div>
    <div class="content-table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column type="selection" align="center" width="40px" />
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="60px"
        />
        <el-table-column
          prop="name"
          label="用户名"
          align="center"
          width="160px"
        />
        <el-table-column
          prop="realname"
          label="真实姓名"
          align="center"
          width="160px"
        />
        <el-table-column
          prop="cellphone"
          label="手机号码"
          align="center"
          width="160px"
        />
        <el-table-column prop="enable" label="状态" align="center" width="80px">
          <template #default="scope">
            <el-button
              :type="scope.row.enable ? 'success' : 'danger'"
              plain
              size="small"
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160px">
          <div class="operate-button">
            <el-button text type="primary" icon="Edit"> 编辑 </el-button>
            <el-button text type="danger" icon="Delete"> 删除 </el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">分页</div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/system';
import { storeToRefs } from 'pinia';
import { formatUTC } from '@/utils/format';

// 请求usersList数据
const systemStore = useSystemStore();
systemStore.postUsersListAction();

// 获取usersList进行展示
const { usersList } = storeToRefs(systemStore);
</script>

<style lang="less" scoped>
.user-content {
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
  }
  .content-table {
    .operate-button {
      :deep(.el-button) {
        padding: 0;
      }
    }
  }
}
</style>
