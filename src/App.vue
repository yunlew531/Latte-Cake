<template>
  <Loading
    v-model:active="isLoading"
    :isFullPage="true"
    :background-color="'#000'"
    :lockScroll="true"
    :opacity="0.7"
  >
    <template v-slot:default class="position-absolute">
      <div class="loading"></div>
      <div class="cup-hand position-relative"></div> </template
  ></Loading>
  <CartCanvas />
  <router-view />
</template>

<script>
import { provide, toRefs } from 'vue';
import CartCanvas from '@/components/CartCanvas.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import store from '@/composition/store';

const { state } = store;

export default {
  components: {
    CartCanvas,
    Loading,
  },
  setup() {
    provide('state', state);

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss">
@import './assets/styleSheets';

.cup-hand {
  width: 35px;
  height: 35px;
  position: absolute;
  border: 7px solid $white;
  border-radius: 0 0 40% 40%;
  left: 83px;
  bottom: 65px;
  transform: rotate(-90deg);
}
.loading {
  width: 90px;
  height: 80px;
  border: 7px solid $white;
  border-radius: 0 0 35% 35%;
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    width: 150%;
    height: 100%;
    position: absolute;
    left: -25%;
    bottom: -80%;
    background: $primary;
    animation: coffee-wave 2s infinite;
  }
  @keyframes coffee-wave {
    25% {
      transform: rotate(-5deg);
    }
    50% {
      transform: rotate(5deg);
    }
    75% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(5deg);
      bottom: -20%;
    }
  }
}
</style>
