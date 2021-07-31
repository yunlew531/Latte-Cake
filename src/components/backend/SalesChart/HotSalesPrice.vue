<template>
  <div class="rounded bg-white shadow w-100 p-10">
    <PieChart :chartData="calcSalesPrice" :options="options" />
  </div>
</template>

<script>
import {
  computed, defineComponent, reactive, toRefs,
} from 'vue';
import { Chart, registerables } from 'chart.js';
import { PieChart } from 'vue-chart-3';

Chart.register(...registerables);

export default defineComponent({
  name: 'HotSalesPrice',
  components: { PieChart },
  props: {
    orders: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { orders } = toRefs(props);

    const options = reactive({
      options: {
        plugins: {
          datalabels: {
            formatter(value, context) {
              return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
            },
            font: { size: 12 },
            align: 'center',
            color: 'white',
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
            text: '銷售額占比',
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
            text: '單位: 新台幣',
            font: {
              size: 16,
            },
          },
        },
      },
    });

    const calcSalesPrice = computed(() => {
      let arr = [];
      orders.value.forEach((item) => {
        arr = [...arr, ...Object.values(item.products)];
      });
      const obj = {};
      arr.forEach((item) => {
        if (obj[item.product_id]) {
          obj[item.product_id].total += item.total;
        } else {
          obj[item.product_id] = {};
          obj[item.product_id].name = item.product.title;
          obj[item.product_id].total = item.total;
        }
      });
      const newArr = Object.values(obj);
      const labels = [];
      const price = [];
      newArr.forEach((item) => {
        labels.push(item.name);
        price.push(item.total);
      });

      return {
        labels,
        datasets: [
          {
            data: price,
            backgroundColor: ['#A93226', '#CB4335', '#E74C3C', '#EC7063', '#F1948A', '#F5B7B1'],
          },
        ],
      };
    });

    return {
      ...toRefs(options),
      calcSalesPrice,
    };
  },
});
</script>
