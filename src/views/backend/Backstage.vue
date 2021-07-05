<template>
  <div v-if="isLogIn">
    <BackendNavbar :user="user" />
    <div class="d-flex flex-wrap px-5 pb-8">
      <Sidebar :boardStatus="boardStatus" />
      <router-view
        :boardStatus="boardStatus"
        :tempProduct="tempProduct"
        @handStatus="handStatus"
        class="dashboard-content flex-grow-1"
      />
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import backReq from '@/api/backReq';
import { apiPostCheck, apiGetUser } from '@/api';
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
    const tempProduct = reactive({ tempProduct: {} });
    const handStatus = (data) => {
      boardStatus.value = data.status;
      tempProduct.tempProduct = data.product;
    };

    const setHeaders = () => {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)LatteCake\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      backReq.defaults.headers.common.Authorization = token;
    };

    setHeaders();

    const user = reactive({});
    apiPostCheck()
      .then((res) => {
        if (res.data.success) {
          isLogIn.value = true;
        } else {
          useToast('請重新登入', 'danger');
          router.push('/login');
          return false;
        }
        return apiGetUser();
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.results[0];
          user.username = `${data.name.first} ${data.name.last}`;
          user.photo = data.picture.medium;
        }
      })
      .catch((err) => {
        console.dir(err);
      });

    return {
      ...toRefs(tempProduct),
      isLogIn,
      boardStatus,
      user,
      handStatus,
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
