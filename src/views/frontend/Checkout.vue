<template>
  <Navbar class="navbar">
    <template #content>
      <div
        class="
          page-title
          position-absolute
          start-50
          bottom-25
          translate-middle-x
        "
        :class="{ active: !isLoading }"
      >
        <h3 class="text-white fs-1 fs-bold">訂單</h3>
      </div>
    </template>
  </Navbar>
  <main>
    <section class="nav-bg"></section>
    <section style="height: 500px"></section>
  </main>
  <Footer />
</template>

<script>
import { inject, toRefs } from 'vue';
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const state = inject('state');

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 500px;
}
.nav-bg {
  height: 500px;
  background: url(~@/assets/images/bg-banner.jpg) center no-repeat;
  background-size: cover;
}
.page-title {
  > h3 {
    opacity: 0;
  }
  &.active {
    > h3 {
      transform: scale(0);
      animation: scale-ani 0.5s forwards;
      opacity: 1;
    }
  }
}
@keyframes scale-ani {
  to {
    transform: scale(1);
  }
}
</style>
