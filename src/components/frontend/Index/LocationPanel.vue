<template>
  <div ref="carouselDom" id="carouselLocation" class="carousel slide">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselLocation"
        data-bs-slide-to="0"
        class="active"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselLocation"
        data-bs-slide-to="1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselLocation"
        data-bs-slide-to="2"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="shop-taipei"></div>
        <div
          class="
            carousel-caption
            d-none d-md-flex
            flex-column
            align-items-center
            justify-content-center
            top-50
            translate-middle-y
          "
        >
          <h5 class="fs-5 m-0 fw-light">歡迎來店用餐</h5>
          <router-link
            to="/"
            class="location-link d-inline-block text-decoration-none"
          >
            <h4 class="display-4 pt-5">台北信義店</h4>
            <p class="fs-4 fw-light">地址: 台北市信義區市府路1號</p>
          </router-link>
        </div>
      </div>
      <div class="carousel-item">
        <div class="shop-taichung"></div>
        <div
          class="
            carousel-caption
            d-none d-md-flex
            flex-column
            align-items-center
            justify-content-center
            top-50
            translate-middle-y
          "
        >
          <h5 class="fs-5 m-0 fw-light">歡迎來店用餐</h5>
          <router-link
            to="/"
            class="location-link d-inline-block text-decoration-none"
          >
            <h4 class="display-4 pt-5">台中西屯店</h4>
            <p class="fs-4 fw-light">地址: 台中市西屯區台灣大道三段99號</p>
          </router-link>
        </div>
      </div>
      <div class="carousel-item">
        <div class="shop-kausheng"></div>
        <div
          class="
            carousel-caption
            d-none d-md-flex
            flex-column
            align-items-center
            justify-content-center
            top-50
            translate-middle-y
          "
        >
          <h5 class="fs-5 m-0 fw-light">歡迎來店用餐</h5>
          <router-link
            to="/"
            class="location-link d-inline-block text-decoration-none"
          >
            <h4 class="display-4 pt-5">高雄苓雅店</h4>
            <p class="fs-4 fw-light">地址: 高雄市苓雅區四維三路2號</p>
          </router-link>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselLocation"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselLocation"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script >
import { onMounted, ref } from 'vue';
import Carousel from 'bootstrap/js/dist/carousel';

export default {
  setup() {
    const carouselDom = ref(null);
    const carousel = ref(null);

    onMounted(() => {
      carousel.value = new Carousel(carouselDom.value, {
        interval: 8000,
        ride: 'carousel',
      });
      carousel.value.cycle();
    });

    return {
      carouselDom,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/scss/custom/variables';

.carousel {
  height: 800px;
}
.shop-taipei,
.shop-taichung,
.shop-kausheng {
  height: 800px;
  background: center no-repeat;
  background-size: cover;
  position: relative;
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    position: absolute;
  }
}
.shop-taipei {
  background-image: url(~@/assets/images/street-cafe-taipei.jpg);
}
.shop-taichung {
  background-image: url(~@/assets/images/street-cafe-taichung.jpg);
}
.shop-kausheng {
  background-image: url(~@/assets/images/street-cafe-kausheng.jpg);
}
.location-link {
  color: $white;
  &:hover {
    color: shade-color($white, 10%);
  }
}
</style>
