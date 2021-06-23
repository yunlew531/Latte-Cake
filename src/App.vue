<template>
  <CartCanvas />
  <router-view :key="key" />
</template>

<script>
import { computed, provide } from 'vue';
import { useRoute } from 'vue-router';
import CartCanvas from '@/components/CartCanvas.vue';
import store from '@/composition/store';

const { state } = store;

export default {
  components: { CartCanvas },
  setup() {
    provide('state', state);
    const route = useRoute();
    const key = computed(() => route.path + Math.random());
    return { key };
  },
};
</script>

<style lang="scss">
@import './assets/scss';
</style>
