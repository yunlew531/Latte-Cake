<template>
  <router-view />
</template>

<script>
import { provide } from 'vue';
import store from '@/composition/store';

const { state } = store;

export default {
  setup() {
    provide('state', state);
  },
};
</script>

<style lang="scss">
@import './assets/styleSheets';
</style>
