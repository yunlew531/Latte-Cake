<template>
  <CartCanvas />
  <router-view :key="key" />
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import CartCanvas from '@/components/CartCanvas.vue';

export default {
  components: { CartCanvas },
  setup() {
    const route = useRoute();
    const key = computed(() => route.path + Math.random());
    return { key };
  },
};
</script>

<style lang="scss">
@import './assets/scss';
</style>
