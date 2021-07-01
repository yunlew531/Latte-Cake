<template>
  <div v-if="isLogIn">
    <BackendNavbar />
    <div class="d-flex">
      <Sidebar />
      <div class="dashboard-content rounded bg-white shadow w-100 p-12 me-25">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, onUnmounted } from 'vue';
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

    const setHeaders = () => {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)LatteCake\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      backReq.defaults.headers.common.Authorization = token;
    };

    setHeaders();

    onMounted(() => {
      console.log('admin父元件 Mounted');
    });

    onUnmounted(() => {
      console.log('admin父元件 Unmounted');
    });

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
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/custom/variables';

.dashboard-content {
  animation: translate 0.3s forwards;
  margin-bottom: -50px;
  transform: translateY(-100px) scale(0);
}
@keyframes translate {
  to {
    transform: translateY(-100px) scale(1);
  }
}
</style>
