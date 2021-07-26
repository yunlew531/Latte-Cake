<template>
  <div class="rounded bg-white shadow w-100 p-10">
    <Loading v-model:active="isLoading" :is-full-page="false" />
    <h2>訂單</h2>
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
          <th scope="row">{{ key + 1 }}</th>
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
            <button type="button" class="btn btn-outline-primary" @click="showOrderDetail(order)">
              詳細
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, inject, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/composition/store';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { useTranslateTime } from '@/methods';

export default {
  name: 'BackendOrders',
  components: {
    Loading,
  },
  setup(props, { emit }) {
    const state = inject('state');
    const router = useRouter();
    const { getOrders } = store;

    const isLoading = ref(true);
    getOrders().then((res) => {
      if (res) isLoading.value = false;
    });

    const showOrderDetail = (order) => {
      emit('setOrderDetail', order);
      router.push(`/admin/order/${order.id}`);
    };

    return {
      ...toRefs(state),
      useTranslateTime,
      isLoading,
      showOrderDetail,
    };
  },
};
</script>

<style lang="scss" scoped>
tbody {
  th,
  td {
    line-height: 38px;
  }
}
</style>
