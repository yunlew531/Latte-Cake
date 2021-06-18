<template>
  <section class="overflow-hidden">
    <div ref="carouselDom" class="carousel slide carousel-fade">
      <div class="carousel-inner">
        <div
          class="carousel-item"
          :class="{ active: key === 0 }"
          v-for="(img, key) in photoData?.images"
          :key="img.url"
          :style="{ 'background-image': `url(${img.url})` }"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
import { apiGetCarouselImgs } from '@/api';
import { ref, onMounted } from 'vue';
import Carousel from 'bootstrap/js/dist/carousel';

export default {
  name: 'Carousel',
  setup() {
    const { photoData } = apiGetCarouselImgs();
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

    onMounted(async () => {
      handCarousel();
    });

    return {
      carouselDom,
      photoData,
    };
  },
};
</script>

<style lang="scss" socped>
.carousel-item {
  height: 100vh;
  background: no-repeat center;
  background-size: cover;
  animation-name: scaleBackground;
  animation-duration: 8s;
  animation-delay: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: backwards;
}
@keyframes scaleBackground {
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(1);
  }
}
</style>
