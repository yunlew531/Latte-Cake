<template>
  <div class="row g-8">
    <div class="col-8">
      <div class="rounded bg-white shadow w-100 p-10">月銷售額</div>
    </div>
    <div class="col-4">
      <div class="rounded bg-white shadow w-100 p-10">較上月相比</div>
    </div>
    <div class="col-6">
      <HotSales :orders="orders" />
    </div>
    <div class="col-6">
      <div class="rounded bg-white shadow w-100 p-10"></div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { apiGetOrders } from '@/api';
import HotSales from '@/components/backend/SalesChart/HotSales.vue';

export default {
  name: 'SalesChart',
  components: {
    HotSales,
  },
  setup() {
    const orders = reactive({ orders: [] });

    const getOrders = async (page) => {
      try {
        const { data } = await apiGetOrders(page);
        if (data.success) {
          orders.orders = data.orders;
        }
      } catch (err) {
        console.dir(err);
      }
    };

    const init = () => {
      getOrders();
    };
    init();

    return {
      ...toRefs(orders),
    };
  },
};
</script>
