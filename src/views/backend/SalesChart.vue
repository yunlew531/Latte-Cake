<template>
  <div class="row g-8">
    <div class="col-8">
      <div class="rounded bg-white shadow w-100 p-10">月銷售額</div>
    </div>
    <div class="col-4">
      <div class="rounded bg-white shadow w-100 p-10">較上月相比</div>
    </div>
    <div class="col-6">
      <HotSalesNum :orders="orders" />
    </div>
    <div class="col-6">
      <HotSalesPrice :orders="orders" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { apiGetOrders } from '@/api';
import HotSalesNum from '@/components/backend/SalesChart/HotSalesNum.vue';
import HotSalesPrice from '@/components/backend/SalesChart/HotSalesPrice.vue';

export default {
  name: 'SalesChart',
  components: {
    HotSalesNum,
    HotSalesPrice,
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
