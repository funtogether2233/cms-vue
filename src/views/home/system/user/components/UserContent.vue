<template>
  <div class="user-content">
    <div class="content-header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" size="large" @click="handleNewUserClick">
        新建用户
      </el-button>
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
          <template #default="scope">
            <div class="operate-button">
              <el-button
                text
                type="primary"
                icon="Edit"
                @click="handleEditBtnClick(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                text
                type="danger"
                icon="Delete"
                @click="handleDeleteBtnClick(scope.row.id)"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import useSystemStore from '@/store/system';
import { formatUTC } from '@/utils/format';

const emit = defineEmits(['newClick', 'editClick']);

// 请求usersList数据
const systemStore = useSystemStore();
const currentPage = ref(1);
const pageSize = ref(10);
fetchUserListData();

// 获取usersList进行展示
const { usersList } = storeToRefs(systemStore);

// 分页器
function handleSizeChange() {
  fetchUserListData();
}
function handleCurrentChange() {
  fetchUserListData();
}

// 网络请求
function fetchUserListData(formData: any = {}) {
  // 获取offset/size
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const pageInfo = { size, offset };

  // 发起请求
  const queryInfo = { ...pageInfo, ...formData };
  systemStore.postUsersListAction(queryInfo);
}

// 删除用户操作
function handleDeleteBtnClick(id: number) {
  systemStore.deleteUserByIdAction(id);
}

// 新建用户操作
function handleNewUserClick() {
  emit('newClick');
}

// 编辑用户操作
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData);
}

defineExpose({ fetchUserListData });
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
  }
  .content-table {
    margin: 20px 0;
    .operate-button {
      :deep(.el-button) {
        padding: 0;
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
