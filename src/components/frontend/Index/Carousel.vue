<template>
  <section
    ref="carouselPanelEl"
    class="carousel-panel position-relative"
    :class="{ active: playProgressAnime }"
    @mousemove="handTextShadow($event)"
    @mouseenter="isMouseInCarousel = true"
    @mouseleave="(isMouseInCarousel = false), handTextShadow($event)"
  >
    <!-- 進度條 start -->
    <div class="progress carousel-progress position-absolute">
      <div
        class="progress-bar"
        role="progressbar"
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <!-- 進度條 end -->

    <!-- title 最初 teleport 位置 start -->
    <div
      id="titleTeleportMiddle"
      class="
        carousel-content
        position-absolute
        start-50
        translate-middle
        top-50
        px-5 px-xxl-10
        z-10
      "
    >
      <CarouselTitle v-model:isReadyTextShadow="isReadyTextShadow" :styleSheets="styleSheets" />
    </div>
    <!-- title 最初 teleport 位置 end -->

    <!-- title 動畫結束後 teleport 位置 start -->
    <div
      id="titleTeleportAside"
      class="
        position-absolute
        start-0
        bottom-25 bottom-sm-auto
        top-sm-50
        z-10
        overflow-hidden
        px-5 px-xxl-12
      "
    ></div>
    <!-- title 動畫結束後 teleport 位置 end -->

    <div ref="carouselEl" class="carousel slide carousel-fade">
      <ul class="carousel-inner m-0 p-0">
        <li
          v-for="(image, key) in images"
          :key="image in images"
          class="carousel-item"
          :class="{ active: key === 0 }"
          :style="{ 'background-image': `url(${image})` }"
          @animationend="playProgressAnime = false"
        ></li>
      </ul>
    </div>
    <div class="scroll-btn position-absolute bottom-0 start-50 z-10">
      <span class="fs-1 text-white material-icons"> expand_more </span>
    </div>
  </section>
</template>

<script>
import Carousel from 'bootstrap/js/dist/carousel';
import CarouselTitle from '@/components/frontend/Index/CarouselTitle.vue';
import {
  ref, reactive, onBeforeUnmount, onMounted,
} from 'vue';

export default {
  name: 'Carousel',
  components: {
    CarouselTitle,
  },
  setup() {
    const images = reactive([
      'https://images.unsplash.com/photo-1608649226842-f39257c9085f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      'https://images.unsplash.com/photo-1571805553621-ca9924532ad3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1598504775929-a46f801ac47f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      'https://images.unsplash.com/photo-1591798454113-023d7379221f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1580307493015-fdf18832fdd1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    ]);

    const carouselEl = ref(null);
    const handCarousel = () => {
      const carousel = new Carousel(carouselEl.value, {
        interval: 10000,
        pause: false,
        ride: 'carousel',
      });
      carousel.cycle();
    };
    onMounted(handCarousel);

    const playProgressAnime = ref(true);
    const handProgressBar = () => {
      playProgressAnime.value = true;
    };
    onMounted(() => {
      carouselEl.value.addEventListener('slide.bs.carousel', handProgressBar);
    });
    onBeforeUnmount(() => {
      carouselEl.value.removeEventListener('slide.bs.carousel', handProgressBar);
    });

    const carouselPanelEl = ref(null);
    const isReadyTextShadow = ref(false);
    const isMouseInCarousel = ref(false);
    const styleSheets = reactive({ title: '' });
    const handTextShadow = ($event) => {
      if (!isReadyTextShadow.value || document.body.offsetWidth < 1366) return;
      const { offsetX, offsetY } = $event;

      if ($event.target !== carouselPanelEl.value || !isMouseInCarousel.value) {
        styleSheets.title = {
          transition: '1s',
          textShadow: '-0.1rem 0.1rem 0.5rem white',
        };
        return;
      }

      const lengthX = ((offsetX / carouselPanelEl.value.offsetWidth).toFixed(2) * 2 - 1) * -1;
      const lengthY = ((offsetY / carouselPanelEl.value.offsetHeight).toFixed(2) * 2 - 1) * -1;

      styleSheets.title = {
        textShadow: `
            ${lengthX * 1.5}rem ${lengthY * 1.5}rem 0.3rem rgba(255,255,255, 0.8),
            ${lengthX * 3}rem ${lengthY * 3}rem 0.6rem rgba(255,255,255, 0.8)`,
      };
    };

    return {
      styleSheets,
      isReadyTextShadow,
      isMouseInCarousel,
      playProgressAnime,
      images,
      carouselEl,
      carouselPanelEl,
      handCarousel,
      handProgressBar,
      handTextShadow,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';
@import '~bootstrap/scss/mixins';

.carousel-panel {
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background: rgba($black, 0.15);
    position: absolute;
    z-index: 2;
  }
  &.active {
    .progress-bar {
      animation: progress-bar 8s forwards linear;
    }
  }
}
.carousel-progress {
  opacity: 0.8;
  width: 200px;
  height: 3px;
  transform: rotate(90deg) translateY(-50%);
  right: 0px;
  top: 50%;
  z-index: 50;
  .progress-bar {
    background-color: $danger;
  }
  @include media-breakpoint-down(md) {
    right: -50px;
  }
  @include media-breakpoint-down(sm) {
    right: -80px;
  }
}
@keyframes progress-bar {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
.carousel-content {
  overflow: hidden;
}
.carousel-item {
  height: 100vh;
  background: no-repeat center;
  background-size: cover;
  filter: brightness(0);
  animation: scale-background 9s ease-out backwards;
}
@keyframes scale-background {
  0% {
    filter: brightness(1);
    transform: scale(1.1);
  }
  85% {
    filter: brightness(1);
  }
  100% {
    filter: brightness(0);
    transform: scale(1);
  }
}
.scroll-btn {
  cursor: pointer;
  margin-bottom: 10px;
  opacity: 1;
  animation: scroll-btn-anime 5s infinite;
}
@keyframes scroll-btn-anime {
  100% {
    opacity: 0;
    margin-bottom: -50px;
  }
}
.carousel-item {
  &:nth-of-type(1) {
    background-image: url(~@/assets/images/carousel-1.jpg);
  }
}
</style>
