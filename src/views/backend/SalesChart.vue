<template>
  <div class="row g-8">
    <div class="col-9">
      <MonthSales :orders="orders" @calcMonthPriceVariance="calcMonthVariance" />
    </div>
    <div class="col-3">
      <div class="d-flex flex-column h-100 rounded bg-white shadow w-100 p-10">
        <h3 class="fs-2 text-black-200 text-center">與上月相比</h3>
        <div v-if="monthPriceVariance >= 0" class="text-success d-flex align-items-center h-100">
          <span class="material-icons-outlined fs-1 me-auto">trending_up</span>
          <span class="display-4 lh-1">{{ monthPriceVariance }} %</span>
        </div>
        <div v-else class="text-danger d-flex align-items-center h-100">
          <span class="material-icons-outlined fs-1 me-auto">trending_down</span>
          <span class="display-4 lh-1">{{ monthPriceVariance }} %</span>
        </div>
      </div>
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
import { ref, reactive, toRefs } from 'vue';
import { apiGetOrders } from '@/api';
import MonthSales from '@/components/backend/SalesChart/MonthSales.vue';
import HotSalesNum from '@/components/backend/SalesChart/HotSalesNum.vue';
import HotSalesPrice from '@/components/backend/SalesChart/HotSalesPrice.vue';

export default {
  name: 'SalesChart',
  components: {
    MonthSales,
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

    const monthPriceVariance = ref(0);
    const calcMonthVariance = (val) => {
      const month = new Date().getMonth() + 1;
      const lastMonthPrice = val[month - 1].total || 1;
      monthPriceVariance.value = (val[month].total - val[month - 1].total) / lastMonthPrice;
    };

    const init = () => {
      getOrders();
    };
    init();

    return {
      ...toRefs(orders),
      monthPriceVariance,
      calcMonthVariance,
    };
  },
};
</script>
