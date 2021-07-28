<template>
  <Modal ref="msgModal" @onDelete="deleteAllOrders"> </Modal>
  <div class="rounded bg-white shadow w-100 p-10 position-relative">
    <Loading v-model:active="isLoading" :is-full-page="false" />
    <div class="d-flex justify-content-center">
      <h2 class="me-auto">訂單</h2>
      <button class="btn btn-primary align-self-center" @click="showModal">
        刪除全部訂單
      </button>
    </div>
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
          <tr v-for="(order, key) in orders" :key="order.id + key">
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
              <router-link
                :to="`/admin/order/${order.id}`"
                type="button"
                class="btn btn-outline-primary"
              >
                詳細
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pages="pages" @handPage="getOrders" class="pt-5" />
  </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useToast, useTranslateTime } from '@/methods';
import { apiDeleteAllOrders, apiGetOrders } from '@/api';
import Modal from '@/components/Modal.vue';
import Pagination from '@/components/Pagination.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    Loading,
    Modal,
    Pagination,
  },
  setup() {
    const isLoading = ref(false);

    const orders = reactive({ orders: [] });
    const pages = reactive({ pages: {} });
    const getOrders = async (page) => {
      isLoading.value = true;
      try {
        const { data } = await apiGetOrders(page);
        if (data.success) {
          orders.orders = data.orders;
          pages.pages = data.pagination;
        } else useToast('取得訂單失敗!', 'danger');
      } catch (err) {
        console.dir(err);
      }
      isLoading.value = false;
    };

    const msgModal = ref(null);
    const deleteAllOrders = async () => {
      try {
        const { data } = await apiDeleteAllOrders();
        if (data.success) {
          useToast('已刪除全部訂單!');
          getOrders();
        } else useToast(data.message, 'danger');
      } catch (err) {
        console.dir(err);
      }
      msgModal.value.hideModal();
    };

    const showModal = () => {
      const content = {
        title: '刪除所有訂單',
        content: '是否刪除所有訂單? 刪除後無法重新取得。',
      };
      msgModal.value.showModal(content);
    };

    const init = () => {
      getOrders();
    };
    init();

    onBeforeRouteLeave((to, from, next) => {
      isLoading.value = false;
      next();
    });

    return {
      ...toRefs(orders),
      ...toRefs(pages),
      getOrders,
      msgModal,
      isLoading,
      useTranslateTime,
      deleteAllOrders,
      showModal,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';
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
