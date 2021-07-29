<template>
  <div class="rounded bg-white shadow w-100 p-10">
    <PieChart :chartData="hotSales" :options="hotSalesOptions" />
  </div>
</template>

<script>
import {
  defineComponent, watch, toRefs, reactive,
} from 'vue';
import { Chart, registerables } from 'chart.js';
import { PieChart } from 'vue-chart-3';

Chart.register(...registerables);

export default defineComponent({
  name: 'SalesChart',
  components: { PieChart },
  props: {
    orders: {
      type: Object,
    },
  },
  setup(props) {
    const { orders } = toRefs(props);

    const hotSales = reactive({ hotSales: {} });
    const hotSalesOptions = reactive({
      hotSalesOptions: {
        plugins: {
          datalabels: {
            formatter(value, context) {
              return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
            },
            font: { size: 12 },
            align: 'left',
          },
          legend: {
            position: 'left',
            labels: {
              padding: 10,
              font: {
                size: 16,
              },
            },
          },
          title: {
            display: true,
            text: '銷售量排名',
            font: {
              size: 32,
            },
          },
          subtitle: {
            display: true,
            text: '單位: 個',
            font: {
              size: 16,
            },
          },
          tick: {
            display: true,
            color: 'black',
          },
        },
      },
    });

    const calcHotSales = (ordersData) => {
      let productsArr = [];
      ordersData.forEach((item) => {
        const products = Object.values(item.products);
        productsArr = [...productsArr, ...products];
      });
      const obj = {};
      productsArr.forEach((item) => {
        if (obj[item.product_id]) {
          obj[item.product_id].qty += item.qty;
        } else {
          obj[item.product_id] = {};
          obj[item.product_id].name = item.product.title;
          obj[item.product_id].qty = item.qty;
        }
      });
      const newProductsArr = Object.values(obj);
      const labels = [];
      const num = [];
      newProductsArr.forEach((item) => {
        labels.push(item.name);
        num.push(item.qty);
      });
      hotSales.hotSales = {
        labels,
        datasets: [
          {
            data: num,
            backgroundColor: ['#A93226', '#CB4335', '#E74C3C', '#EC7063', '#F1948A', '#F5B7B1'],
            datalabels: {
              labels: {
                value: {
                  color: 'white',
                },
              },
            },
          },
        ],
      };
    };

    watch(orders, (value) => {
      calcHotSales(value);
    });

    return {
      ...toRefs(hotSales),
      ...toRefs(hotSalesOptions),
    };
  },
});
</script>
