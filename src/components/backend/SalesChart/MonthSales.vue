<template>
  <div class="rounded bg-white shadow w-100 p-10">
    <BarChart :chartData="calcMonthSales" :options="options" :height="100" />
  </div>
</template>

<script>
import {
  defineComponent, computed, ref, toRefs,
} from 'vue';
import { BarChart } from 'vue-chart-3';

export default defineComponent({
  components: {
    BarChart,
  },
  props: {
    orders: {
      type: Object,
      required: true,
    },
  },
  emits: {
    calcMonthPriceVariance: (val) => typeof val === 'object',
  },
  setup(props, { emit }) {
    const { orders } = toRefs(props);

    const options = ref({
      responsive: true,
      layout: {
        padding: 0,
      },
      plugins: {
        datalabels: {
          formatter(value) {
            return `${value}`;
          },
          font: { size: 12 },
          color: 'black',
          anchor: 'end',
          align: 'end',
          offset: 0,
        },
        legend: {
          display: false,
          labels: {
            padding: 10,
            font: {
              size: 16,
            },
          },
        },
        title: {
          display: true,
          text: '月份銷售額',
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
          padding: {
            top: 10,
          },
          position: 'bottom',
        },
      },
    });

    const calcMonthSales = computed(() => {
      const monthFilter = {};
      new Array(12).fill().forEach((item, key) => {
        monthFilter[key + 1] = { total: 0 };
      });
      orders.value.forEach((item) => {
        const month = new Date(item.create_at * 1000).getMonth() + 1;
        monthFilter[month].total += item.total;
      });
      emit('calcMonthPriceVariance', monthFilter);
      const monthPrice = Object.values(monthFilter).map((item) => item.total);

      return {
        labels: new Array(12).fill().map((month, key) => `${key + 1}月`),
        datasets: [
          {
            barThickness: 25,
            data: monthPrice,
            backgroundColor: ['#A93226', '#CB4335', '#E74C3C', '#EC7063', '#F1948A', '#F5B7B1'],
          },
        ],
      };
    });

    return {
      calcMonthSales,
      options,
    };
  },
});
</script>
