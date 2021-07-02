<template>
  <section class="carousel-panel position-relative">
    <h3 class="fs-1 text-white position-absolute start-25 top-50 z-10">
      歡迎光臨 <span class="text-danger">Latte & Cake</span>
    </h3>
    <div ref="carouselDom" class="carousel slide carousel-fade">
      <ul class="carousel-inner m-0 p-0">
        <li class="carousel-item bg-carousel-1 active"></li>
        <li class="carousel-item bg-carousel-2"></li>
        <li class="carousel-item bg-carousel-3"></li>
        <li class="carousel-item bg-carousel-4"></li>
        <li class="carousel-item bg-carousel-5"></li>
        <li class="carousel-item bg-carousel-6"></li>
      </ul>
    </div>
    <div class="scroll-btn position-absolute bottom-0 start-50 z-10">
      <span class="fs-1 text-white material-icons"> expand_more </span>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import Carousel from 'bootstrap/js/dist/carousel';

export default {
  name: 'Carousel',
  setup() {
    const carouselDom = ref(null);
    let carousel = null;

    const handCarousel = () => {
      carousel = new Carousel(carouselDom.value, {
        interval: 10000,
        pause: false,
        ride: 'carousel',
      });
      carousel.cycle();
    };

    onMounted(() => {
      handCarousel();
    });

    return {
      carouselDom,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';
.carousel-panel {
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background: rgba($black, 0.15);
    position: absolute;
    z-index: 2;
  }
}
.carousel-item {
  height: 100vh;
  background: no-repeat center;
  background-size: cover;
  animation: scaleBackground 8s 1s ease-out backwards;
}
@keyframes scaleBackground {
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(1);
  }
}
.scroll-btn {
  cursor: pointer;
  margin-bottom: 10px;
  opacity: 1;
  animation: scroll-btn-ani 5s infinite;
}
@keyframes scroll-btn-ani {
  100% {
    opacity: 0;
    margin-bottom: -50px;
  }
}
.bg-carousel-1 {
  background-image: url(~@/assets/images/carousel-1.jpg);
}
.bg-carousel-2 {
  background-image: url(~@/assets/images/carousel-2.jpg);
}
.bg-carousel-3 {
  background-image: url(~@/assets/images/carousel-3.jpg);
}
.bg-carousel-4 {
  background-image: url(~@/assets/images/carousel-4.jpg);
}
.bg-carousel-5 {
  background-image: url(~@/assets/images/carousel-5.jpg);
}
.bg-carousel-6 {
  background-image: url(~@/assets/images/carousel-6.jpg);
}
</style>
