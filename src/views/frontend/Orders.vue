<template>
  <div class="nav-bg"></div>
  <section class="orders-panel bg-white rounded shadow-sm container p-10">
    <Loading v-model:active="isLoading" :is-full-page="false" />
    <div v-if="!isLoading">
      <h2>訂單</h2>
      <div class="table-panel">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">訂單編號</th>
              <th scope="col">成立時間</th>
              <th scope="col">狀態</th>
              <th scope="col">金額</th>
              <th width="80" scope="col">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, key) in orders" :key="order.id">
              <th scope="row">
                {{ (pages.current_page - 1) * 10 + key + 1 }}
              </th>
              <td>{{ order.id }}</td>
              <td>{{ useTranslateTime(order?.create_at) }}</td>
              <td>
                <p v-if="order.is_paid" class="text-success d-flex align-items-center m-0">
                  <span class="material-icons-outlined"> check </span>
                  <span>已付款</span>
                </p>
                <p v-else class="text-primary d-flex align-items-center m-0">
                  <span class="material-icons-outlined"> close </span>
                  <span>未付款</span>
                </p>
              </td>
              <td>NT$ {{ order.total?.toLocaleString() }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click="showOrderDetail(order)"
                >
                  詳細
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination v-if="pages.total_pages !== 1" :pages="pages" @handPage="handPage" class="pt-5" />
    </div>
  </section>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { apiGetCustOrders } from '@/api';
import { useToast, useTranslateTime } from '@/methods';
import Pagination from '@/components/Pagination.vue';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    Loading,
    Pagination,
  },
  setup() {
    const router = useRouter();
    const isLoading = ref(false);
    const orders = reactive({ orders: [] });
    const pages = reactive({ pages: {} });
    const getOrders = async (page) => {
      isLoading.value = true;
      const { data } = await apiGetCustOrders(page);
      if (data.success) {
        orders.orders = data.orders;
        pages.pages = data.pagination;
      } else useToast('無法取得訂單!', 'danger');
      isLoading.value = false;
    };

    const showOrderDetail = (order) => {
      router.push(`/order/${order.id}`);
    };

    const handPage = (page) => {
      getOrders(page);
    };

    const init = () => {
      getOrders();
    };
    init();

    return {
      isLoading,
      ...toRefs(orders),
      ...toRefs(pages),
      showOrderDetail,
      handPage,
      useTranslateTime,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.nav-bg {
  height: 300px;
  background: url(~@/assets/images/bg-banner.jpg) center no-repeat;
  background-size: cover;
}
.orders-panel {
  transform: translateY(-50px);
}
.table-panel {
  overflow: scroll;
  padding-bottom: 30px;
}
.table {
  min-width: 1200px;
}
tbody {
  th,
  td {
    line-height: 38px;
  }
}
tr:last-child {
  border-bottom: 1px solid $black;
}
</style>
