<template>
  <div class="rounded bg-white shadow w-100 p-10">
    <PieChart :chartData="hotSales" :options="hotSalesOptions" />
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { Chart, registerables } from 'chart.js';
import { PieChart } from 'vue-chart-3';
import { apiGetOrders } from '@/api';

Chart.register(...registerables);

export default defineComponent({
  name: 'SalesChart',
  components: { PieChart },
  setup() {
    let orders = [];

    const hot = ref({});
    const hotSales = computed(() => hot.value);
    const hotSalesOptions = ref({
      plugins: {
        labels: {
          render: 'label',
        },
        legend: {
          position: 'left',
          labels: {
            padding: 20,
            font: {
              size: 20,
            },
            render: 'label',
          },
        },
        title: {
          display: true,
          text: '商品銷售量排名',
          font: {
            size: 32,
          },
        },
        tick: {
          display: true,
          color: 'black',
        },
      },
    });
    const calcHotSales = () => {
      let arr = [];
      orders.forEach((item) => {
        const products = Object.values(item.products);
        arr = [...arr, ...products];
      });
      const obj = {};
      arr.forEach((item) => {
        if (obj[item.product_id]) {
          obj[item.product_id].qty += item.qty;
        } else {
          obj[item.product_id] = {};
          obj[item.product_id].name = item.product.title;
          obj[item.product_id].qty = item.qty;
        }
      });
      const productsArr = Object.values(obj);
      const labels = [];
      const num = [];
      productsArr.forEach((item) => {
        labels.push(item.name);
        num.push(item.qty);
      });
      hot.value = {
        labels,
        datasets: [
          {
            data: num,
            backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
          },
        ],
      };
    };

    const getOrders = async (page) => {
      try {
        const { data } = await apiGetOrders(page);
        if (data.success) {
          orders = data.orders;
          calcHotSales();
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
      hotSales,
      hotSalesOptions,
    };
  },
});
</script>

<style lang="scss" scoped></style>
