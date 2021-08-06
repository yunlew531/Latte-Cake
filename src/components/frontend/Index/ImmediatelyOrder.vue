<template>
  <section
    ref="immediateOrderPanelEl"
    class="immediate-order-panel bg-info"
    :class="{ active: isScrollTo }"
  >
    <div class="container position-relative py-8 py-md-16 mt-50">
      <img
        class="
          spaggetti-img
          img-fluid
          position-absolute
          ms-xl-50
          start-0
          bottom-0
        "
        src="@/assets/images/photo-spaggetti.png"
        alt="pasta-spaghetti"
      />
      <div class="overflow-hidden text-end px-xl-50 ps-50">
        <router-link to="/products">
          <Button class="products-page-link px-6 px-sm-12">立即點餐</Button>
        </router-link>
        <p
          class="
            paragraph
            d-flex
            flex-wrap
            align-items-center
            justify-content-end
            text-white
            fs-2
            tracking-3
            mt-5
            mb-0
          "
        >
          <span class="text-danger fs-5">餓了嗎?</span>
          <span class="ms-5">立即享用餐點</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import Button from '@/components/frontend/Button.vue';
import { ref, inject, watch } from 'vue';

export default {
  components: {
    Button,
  },
  setup() {
    const scrollY = inject('scrollY');
    const immediateOrderPanelEl = ref(null);
    const isScrollTo = ref(false);
    watch(scrollY, (y) => {
      const { offsetTop, clientHeight } = immediateOrderPanelEl.value;
      if (y > offsetTop - window.innerHeight * 0.8 && y < offsetTop + clientHeight * 0.67) {
        isScrollTo.value = true;
      }
    });

    return {
      immediateOrderPanelEl,
      isScrollTo,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/mixins';
@import '~@/assets/styleSheets/custom/variables';

.immediate-order-panel {
  &.active {
    .spaggetti-img {
      animation: rotate 3s forwards;
    }
    .products-page-link,
    .paragraph {
      transform: translateY(0);
    }
  }
}

.spaggetti-img {
  transform: translateX(-200%) rotate(-180deg);
  width: 400px;
}
@keyframes rotate {
  to {
    transform: translateX(0) rotate(0);
  }
}
@include media-breakpoint-down(md) {
  .spaggetti-img {
    width: 200px;
  }
}

.products-page-link {
  font-size: $h3-font-size;
  color: $white;
  transition: 0.7s 3s;
  transform: translateY(230%) rotate3d(0, 1, 0, 90deg);
  &:hover {
    color: shade-color($white, 10%);
  }
}
@include media-breakpoint-down(sm) {
  .products-page-link {
    font-size: $h5-font-size;
  }
}
.paragraph {
  transform: translateY(100%) rotate3d(0, 1, 0, 90deg);
  transition: 0.5s 3.5s;
}
</style>
