<template>
  <div class="rounded bg-white shadow w-100 p-10">
    <PieChart :chartData="calcHotSales" :options="hotSalesOptions" />
  </div>
</template>

<script>
import {
  defineComponent, toRefs, reactive, computed,
} from 'vue';
import { Chart, registerables } from 'chart.js';
import { PieChart } from 'vue-chart-3';

Chart.register(...registerables);

export default defineComponent({
  name: 'HotSalesNum',
  components: { PieChart },
  props: {
    orders: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { orders } = toRefs(props);

    const hotSalesOptions = reactive({
      hotSalesOptions: {
        plugins: {
          datalabels: {
            formatter(value, context) {
              return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
            },
            font: { size: 12 },
            align: 'center',
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
            text: '銷售量占比',
            font: {
              size: 32,
            },
            padding: {
              bottom: 15,
            },
            color: '#333',
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

    const calcHotSales = computed(() => {
      let productsArr = [];
      orders.value.forEach((item) => {
        const products = Object.values(item.products);
        productsArr = [...productsArr, ...products];
      });
      const filterObj = {};
      productsArr.forEach((item) => {
        if (filterObj[item.product_id]) {
          filterObj[item.product_id].qty += item.qty;
        } else {
          filterObj[item.product_id] = {};
          filterObj[item.product_id].name = item.product.title;
          filterObj[item.product_id].qty = item.qty;
        }
      });
      const newProductsArr = Object.values(filterObj);
      const labels = [];
      const num = [];
      newProductsArr.forEach((item) => {
        labels.push(item.name);
        num.push(item.qty);
      });
      return {
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
    });

    return {
      ...toRefs(hotSalesOptions),
      calcHotSales,
    };
  },
});
</script>
