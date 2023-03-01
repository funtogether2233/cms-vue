import { postUsersListData } from '@/api/system';
import { defineStore } from 'pinia';

interface ISystemState {
  usersList: any[];
  usersTotalCount: number;
}

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUsersListAction() {
      const usersListResult = await postUsersListData();
      const { totalCount, list } = usersListResult.data;
      this.usersTotalCount = totalCount;
      this.usersList = list;
    }
  }
});

export default useSystemStore;
