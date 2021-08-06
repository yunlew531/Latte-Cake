<template>
  <Loading
    v-model:active="isLoading"
    :isFullPage="true"
    :background-color="'#000'"
    :lockScroll="true"
    :opacity="0.7"
  >
    <template v-slot:default class="position-absolute">
      <div class="loading" />
      <div class="cup-hand position-relative" />
    </template>
  </Loading>
  <CartCanvas />
  <Navbar />
  <main>
    <router-view />
  </main>
  <SubFooter />
  <Footer />
</template>

<script>
import { toRefs, provide } from 'vue';
import useGetScrollY from '@/methods/useGetScrollY';
import CartCanvas from '@/components/CartCanvas.vue';
import Navbar from '@/components/Navbar.vue';
import SubFooter from '@/components/SubFooter.vue';
import Footer from '@/components/Footer.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import store from '@/composition/store';

const { state } = store;

export default {
  components: {
    Loading,
    CartCanvas,
    Navbar,
    SubFooter,
    Footer,
  },
  setup() {
    const { scrollY } = useGetScrollY();
    provide('scrollY', scrollY);

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

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
