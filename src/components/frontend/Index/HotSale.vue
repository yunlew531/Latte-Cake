<template>
  <section class="hot-sale-section container py-25">
    <h3 class="text-center fs-2 fw-bold text-primary mb-5">熱銷商品</h3>
    <h4 class="text-center fs-5 mb-12">值得您嘗鮮的選擇</h4>
    <swiper
      :slides-per-view="3"
      :space-between="50"
      :autoplay="{
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }"
      :loop="true"
    >
      <swiper-slide
        v-for="(product, key) in 9"
        :key="key"
        class="swiper-img swiper-img-1 rounded overflow-hidden"
      >
        <div
          class="
            swiper-content
            position-absolute
            text-white
            bottom-0
            h-25
            w-100
            px-12
          "
        >
          <router-link to="/" class="text-reset text-decoration-none">
            {{ key }}
            <h2>蘋果蛋餅</h2>
            <p>鮮嫩多汁，現採現萃</p>
          </router-link>
        </div>
      </swiper-slide>
    </swiper>
    <div class="text-center mt-12">
      <router-link
        to="/products"
        class="
          all-product-btn
          position-relative
          rounded
          btn btn-primary
          px-12
          py-2
          overflow-hidden
        "
      >
        <span class="opacity-0">所有產品</span>
        <span
          class="btn-content position-absolute top-50 start-50 translate-middle"
          >所有產品</span
        >
      </router-link>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.scss';

SwiperCore.use(Autoplay);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style lang="scss">
@import '~@/assets/styleSheets/custom/variables';

.hot-sale-section {
  .swiper-content {
    h2,
    p {
      opacity: 0;
      padding-top: 100px;
      transition: 0.3s;
    }
    p {
      transition-delay: 0.2s;
    }
  }
  .swiper-img {
    height: 500px;
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
        background-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.8)
        );
      }
    }
  }
  .swiper-img-1 {
    background-image: url(~@/assets/images/swiper-1-1.jpg);
  }
  .all-product-btn {
    display: inline-block;
    .btn-content {
      transition: 0.2s;
      color: $white;
    }
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background: $white;
      top: -150%;
      left: 0;
      border-radius: $border-radius;
      transition: 0.2s ease-in-out;
    }
    &:hover {
      &::before {
        top: 0;
      }
      .btn-content {
        color: $danger;
      }
    }
  }
}
</style>
