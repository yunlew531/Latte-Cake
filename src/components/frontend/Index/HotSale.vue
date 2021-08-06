<template>
  <section class="bg-info overflow-hidden">
    <div ref="hotSalePanelEl" class="hot-sale-panel bg-white-100" :class="{ active: isScrollTo }">
      <div class="container pt-12 pb-md-38">
        <h3
          class="
            title
            text-center
            fs-2
            fw-bold
            text-danger
            overflow-hidden
            mb-5
          "
        >
          熱銷商品
        </h3>
        <Swiper
          :space-between="50"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :speed="2000"
          :loop="true"
          :breakpoints="{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }"
          @swiper="setControlledSwiper"
        >
          <SwiperSlide
            v-for="product in allProducts"
            :key="product.id"
            class="rounded overflow-hidden bg-info"
            @transitionend="playSwiper($event)"
          >
            <router-link
              :to="`/product/${product.id}`"
              class="swiper-img d-block"
              :style="{
                'background-image': `url(${product.imageUrl || product.imagesUrl[0]})`,
              }"
            >
              <div
                class="
                  swiper-content
                  position-absolute
                  text-white
                  bottom-0
                  h-25
                  w-100
                  px-6
                "
              >
                <div class="text-reset text-decoration-none">
                  <h2>{{ product.title }}</h2>
                  <p>{{ product.description }}</p>
                </div>
              </div>
            </router-link>
          </SwiperSlide>
        </Swiper>
        <div class="text-center mt-12">
          <router-link to="/products" class="d-block">
            <Button hoverBgColor="white" class="all-products-btn px-12 py-2"
              ><span class="btn-content">全部商品</span>
            </Button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  ref, inject, watch, toRefs,
} from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import Button from '@/components/frontend/Button.vue';

SwiperCore.use(Autoplay);

export default {
  components: {
    Swiper,
    SwiperSlide,
    Button,
  },
  setup() {
    const scrollY = inject('scrollY');
    const state = inject('state');

    let swiper = null;
    const setControlledSwiper = (swiperInstance) => {
      swiper = swiperInstance;
      swiper.autoplay.stop();
    };
    const playSwiper = ($event) => {
      if ($event.pseudoElement === '::before') {
        swiper.autoplay.start();
      }
    };

    const hotSalePanelEl = ref(null);
    const isScrollTo = ref(false);
    watch(scrollY, (y) => {
      const { offsetTop, clientHeight } = hotSalePanelEl.value;
      if (y > offsetTop - window.innerHeight * 0.67 && y < offsetTop + clientHeight * 0.67) {
        isScrollTo.value = true;
      }
    });

    return {
      ...toRefs(state),
      isScrollTo,
      hotSalePanelEl,
      playSwiper,
      setControlledSwiper,
    };
  },
};
</script>

<style lang="scss">
@import '~@/assets/styleSheets/custom/variables';

.hot-sale-panel {
  transition: 1.5s cubic-bezier(0.34, 0.34, 0.32, 1);
  transform: translateY(50%);
  .title,
  .paragraph-text {
    opacity: 0;
    transition: 1s 1.5s cubic-bezier(0.34, 0.34, 0.32, 1);
    transform: translateY(100%) rotate3d(0, 1, 0, 30deg);
  }
  .swiper-content {
    h2,
    p {
      opacity: 0;
      padding-top: 100px;
      transition: 0.3s;
    }
  }
  .swiper-slide:nth-of-type(1),
  .swiper-slide:nth-of-type(2),
  .swiper-slide:nth-of-type(3) {
    .swiper-img {
      position: relative;
      &::before,
      &::after {
        content: '';
        position: absolute;
      }
      &::before {
        width: 160%;
        height: 100%;
        background: $info;
        left: -205%;
        transform: skewX(30deg);
        z-index: 10;
        transition: 0.6s 2.8s cubic-bezier(0.16, 0.51, 0.83, 0.5);
      }
      &::after {
        background: $white-100;
        width: 200%;
        height: 100%;
        left: -50%;
        transform: skewX(30deg);
        transition: 0.6s 2.8s cubic-bezier(0.16, 0.51, 0.83, 0.5);
      }
    }
  }
  .swiper-img {
    height: 400px;
    background: center no-repeat;
    background-size: cover;
    position: relative;
    cursor: pointer;
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      bottom: 0;
    }
    &:hover {
      .swiper-content {
        h2,
        p {
          opacity: 1;
          padding-top: 0;
        }
      }
      &::before {
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
      }
    }
  }
  .swiper-img-1 {
    background-image: url(~@/assets/images/swiper-1-1.jpg);
  }
  .all-products-btn {
    transition: 0.5s 3.8s;
    opacity: 0;
    transform: translateX(-100%) rotate3d(0, 1, 0, 90deg);
    .btn-content {
      color: $white;
      transition: 0.3s;
    }
    &:hover {
      .btn-content {
        color: $primary !important;
      }
    }
  }
  &.active {
    transform: translateY(0);
    .title,
    .paragraph-text {
      opacity: 1;
      transform: translateY(0);
    }
    .swiper-slide:nth-of-type(1),
    .swiper-slide:nth-of-type(2),
    .swiper-slide:nth-of-type(3) {
      .swiper-img {
        &::before {
          left: 140%;
        }
        &::after {
          left: 140%;
        }
      }
    }
    .all-products-btn {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>
