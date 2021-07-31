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
      plugins: {
        datalabels: {
          formatter(value) {
            return `${value}`;
          },
          font: { size: 12 },
          color: 'black',
          anchor: 'end',
          align: 'end',
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
      layout: {
        padding: 0,
      },
    });

    const calcMonthSales = computed(() => {
      const monthFilter = {};
      new Array(12).fill(null).forEach((item, key) => {
        monthFilter[key + 1] = { total: 0 };
      });
      orders.value.forEach((item) => {
        const month = new Date(item.create_at * 1000).getMonth() + 1;
        monthFilter[month].total += item.total;
      });
      emit('calcMonthPriceVariance', monthFilter);
      const monthPrice = Object.values(monthFilter).map((item) => item.total);

      return {
        labels: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
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
