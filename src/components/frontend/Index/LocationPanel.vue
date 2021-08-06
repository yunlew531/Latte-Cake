<template>
  <section class="bg-info overflow-hidden">
    <div
      ref="locationPanelEl"
      id="carouselLocation"
      class="location-panel carousel slide"
      :class="{ active: isScrollTo }"
    >
      <ul class="carousel-indicators list-unstyled">
        <li v-for="(page, key) in shopPosition" :key="page.address">
          <button
            type="button"
            data-bs-target="#carouselLocation"
            :data-bs-slide-to="key"
            :class="{ active: key === 0 }"
          />
        </li>
      </ul>
      <ul class="carousel-inner list-unstyled">
        <li
          v-for="(shop, key) in shopPosition"
          :key="shop.address"
          class="carousel-item "
          :class="{ active: key === 0 }"
        >
          <img
            class="shop-img img-fluid"
            :src="require(`@/assets/images/${shop.src}`)"
            :alt="shop.name"
          />
          <div
            class="
              carousel-caption
              d-flex
              flex-column
              align-items-center
              justify-content-center
              top-50
              translate-middle-y
            "
          >
            <h5 class="fs-5 m-0 fw-light">歡迎來店用餐</h5>
            <a
              href="javascript:;"
              @click="handDisplayCity(shop.city)"
              class="location-link d-inline-block text-decoration-none"
            >
              <h4 class="display-4 pt-5">{{ shop.name }}</h4>
              <p class="fs-4 fw-light">地址: {{ shop.address }}</p>
            </a>
          </div>
        </li>
      </ul>
      <button
        type="button"
        class="carousel-control-prev"
        data-bs-target="#carouselLocation"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true" />
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        type="button"
        class="carousel-control-next"
        data-bs-target="#carouselLocation"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true" />
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
</template>

<script>
import {
  ref, onMounted, inject, watch, reactive,
} from 'vue';
import { useRouter } from 'vue-router';
import Carousel from 'bootstrap/js/dist/carousel';

export default {
  setup() {
    const router = useRouter();

    const shopPosition = reactive([
      {
        city: '台北',
        name: '台北信義店',
        address: '台北市信義區市府路1號',
        src: 'street-cafe-taipei.jpg',
      },
      {
        city: '台中',
        name: '台中西屯店',
        address: '台中市西屯區台灣大道三段99號',
        src: 'street-cafe-taichung.jpg',
      },
      {
        city: '高雄',
        name: '高雄苓雅店',
        address: '高雄市苓雅區四維三路2號',
        src: 'street-cafe-kausheng.jpg',
      },
    ]);

    let carousel = null;
    const locationPanelEl = ref(null);
    const setCarousel = () => {
      carousel = new Carousel(locationPanelEl.value, {
        interval: 8000,
        ride: 'carousel',
      });
    };
    onMounted(setCarousel);

    const isScrollTo = ref(false);
    const scrollY = inject('scrollY');
    watch(scrollY, (y) => {
      const { offsetTop, clientHeight } = locationPanelEl.value;
      if (y > offsetTop - window.innerHeight * 0.67 && y < offsetTop + clientHeight * 0.67) {
        isScrollTo.value = true;
        carousel.cycle();
      }
    });

    const handDisplayCity = (city) => {
      router.push({ name: 'AboutUs', query: { city } });
    };

    return {
      shopPosition,
      locationPanelEl,
      isScrollTo,
      handDisplayCity,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

.location-panel {
  transform: translateY(50%);
  transition: 1.5s cubic-bezier(0.34, 0.34, 0.32, 1);
  &.active {
    transform: translateY(0);
  }
}

.carousel {
  height: 800px;
}
.shop-img {
  height: 800px;
  width: 100%;
  object-fit: cover;
  filter: brightness(0.25);
}
.location-link {
  color: $white;
  &:hover {
    color: shade-color($white, 10%);
  }
}
</style>
