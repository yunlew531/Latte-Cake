<template>
  <div v-if="isLogIn">
    <BackendNavbar />
    <div class="d-flex">
      <Sidebar :boardStatus="boardStatus" />
      <router-view
        :boardStatus="boardStatus"
        @handStatus="handStatus"
        class="dashboard-content w-100 me-25"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import backReq from '@/api/backReq';
import { apiPostCheck } from '@/api';
import { useToast } from '@/methods';
import BackendNavbar from '@/components/backend/BackendNavbar.vue';
import Sidebar from '@/components/backend/Sidebar.vue';

export default {
  name: 'Backstage',
  components: {
    BackendNavbar,
    Sidebar,
  },
  setup() {
    const router = useRouter();
    const isLogIn = ref(false);
    const boardStatus = ref('新增');

    const handStatus = (status) => {
      boardStatus.value = status;
    };

    const setHeaders = () => {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)LatteCake\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      backReq.defaults.headers.common.Authorization = token;
    };

    setHeaders();

    apiPostCheck()
      .then((res) => {
        if (res.data.success) isLogIn.value = true;
        else {
          useToast('請重新登入', 'danger');
          router.push('/login');
        }
      })
      .catch((err) => {
        console.dir(err);
      });

    return {
      isLogIn,
      boardStatus,
      handStatus,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.dashboard-content {
  animation: translate 0.3s forwards;
  margin-bottom: -50px;
  transform: translateY(-100px) scale(0.99);
}
@keyframes translate {
  to {
    transform: translateY(-100px) scale(1);
  }
}
</style>
