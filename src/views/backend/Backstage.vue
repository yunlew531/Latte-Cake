<template>
  <div v-if="isLogIn" id="backstage">
    <BackendNavbar />
    <div class="d-flex flex-wrap px-5 pb-8">
      <Sidebar :boardStatus="boardStatus" />
      <div class="dashboard-content flex-grow-1">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref, inject, onUnmounted,
} from 'vue';
import { useRouter } from 'vue-router';
import { apiPostCheck } from '@/api';
import BackendNavbar from '@/components/backend/BackendNavbar.vue';
import Sidebar from '@/components/backend/Sidebar.vue';
import backReq from '@/api/backReq';

export default {
  name: 'Backstage',
  components: {
    BackendNavbar,
    Sidebar,
  },
  setup() {
    const $emitter = inject('$emitter');
    const router = useRouter();
    const boardStatus = ref('新增');

    const isLogIn = ref(false);

    const setHeaders = () => {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)PASTAHOUSE\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      backReq.defaults.headers.common.Authorization = token;
    };

    const checkLoginStatus = async () => {
      setHeaders();
      let resData = null;
      try {
        const { data } = await apiPostCheck();
        if (data.success) isLogIn.value = true;
        else {
          isLogIn.value = false;
          router.push('/login');
        }
        resData = data;
      } catch (err) {
        console.dir(err);
        resData = err;
      }
      return resData;
    };

    const handStatus = (status) => {
      boardStatus.value = status;
    };

    const init = () => {
      $emitter.on('handStatus', handStatus);
      checkLoginStatus();
    };
    init();

    onUnmounted(() => {
      $emitter.off('handStatus', handStatus);
    });

    return {
      boardStatus,
      isLogIn,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';
@import '~bootstrap/scss/mixins';

.dashboard-content {
  max-width: calc(100% - 390px);
  animation: translate 0.3s forwards;
  margin-bottom: -100px;
  transform: translateY(-100px) scale(0.99);
}
@keyframes translate {
  to {
    transform: translateY(-100px) scale(1);
  }
}
@include media-breakpoint-down(xxl) {
  .dashboard-content {
    max-width: calc(100% - 300px);
  }
}
@include media-breakpoint-down(lg) {
  .dashboard-content {
    max-width: 100%;
    margin-bottom: 0;
    animation: none;
    transform: translateY(0) scale(1);
  }
}
</style>
