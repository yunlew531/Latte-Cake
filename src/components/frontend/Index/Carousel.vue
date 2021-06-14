<template>
  <section class="position-relative">
    <!-- carousel-nav -->
    <div class="carousel-nav position-absolute top-0 z-10">
      <nav
        class="
          navbar navbar-expand-lg navbar-light
          bg-transparent
          border-bottom border-secondary
          px-12
          py-0
        "
      >
        <div class="container-fluid">
          <a
            href="#"
            class="
              navbar-brand
              text-center
              position-relative
              m-0
              mt-2
              align-self-start
            "
          >
            <span class="material-icons display-4 lh-1"> local_cafe </span>
            <span
              class="
                fs-6
                position-absolute
                start-50
                translate-middle-x
                bottom-n2
                tracking-1
              "
              >LATTE & CAKE</span
            >
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse ps-25"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                class="
                  nav-item
                  border-start border-end border-secondary
                  ms-n1px
                "
              >
                <a
                  class="nav-link active px-16 py-10"
                  aria-current="page"
                  href="#"
                  >原料</a
                >
              </li>
              <li
                class="
                  nav-item
                  border-start border-end border-secondary
                  ms-n1px
                "
              >
                <a
                  class="nav-link d-block px-16 py-10"
                  aria-current="page"
                  href="#"
                  >商品</a
                >
              </li>
              <li
                class="
                  nav-item
                  border-start border-end border-secondary
                  ms-n1px
                "
              >
                <a class="nav-link d-block px-16 py-10" href="#">關於店家</a>
              </li>
            </ul>
            <form class="d-flex position-relative">
              <input
                class="
                  search-input
                  form-control
                  border-0 border-bottom border-2 border-white
                  me-2
                  ps-3
                "
                :class="{ active: isSearchFocus }"
                type="search"
                placeholder="搜尋商品"
                aria-label="Search"
                v-model="searchText"
              />
              <button
                class="search-btn btn position-absolute end-0"
                type="button"
              >
                <span class="material-icons"> search </span>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
    <!-- background carousel -->
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
import { ref, onMounted, watch } from 'vue';
import bootstrap from 'bootstrap/dist/js/bootstrap';

export default {
  name: 'Carousel',
  setup() {
    const searchText = ref('');
    const isSearchFocus = ref(false);
    const { photoData } = apiGetCarouselImgs();
    const carouselDom = ref(null);
    let carousel = null;

    const handCarousel = () => {
      carousel = new bootstrap.Carousel(carouselDom.value, {
        interval: 10000,
        pause: false,
        ride: 'carousel',
      });
      carousel.cycle();
    };

    onMounted(async () => {
      handCarousel();
    });

    watch(searchText, () => {
      if (searchText.value) {
        isSearchFocus.value = true;
      } else {
        isSearchFocus.value = false;
      }
    });

    return {
      searchText,
      isSearchFocus,
      carouselDom,
      photoData,
    };
  },
};
</script>

<style lang="scss" socped>
@import '~@/assets/scss/custom/variables';
@import '~bootstrap/scss/functions';

.carousel-nav {
  width: 100%;
  height: 100vh;
  background-color: hsla(0, 0%, 0%, 0.25);
}
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
.search-input {
  caret-color: $white;
  background-color: transparent;
  transition: 0.2s ease-in;
  &::placeholder {
    color: $white;
  }
  &:focus {
    box-shadow: 0 0 0 $white;
    background-color: rgba(255, 255, 255, 0.5);
    &::placeholder {
      opacity: 0;
    }
  }
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
  &.active {
    background-color: rgba(255, 255, 255, 0.5);
    &::placeholder {
      opacity: 0;
    }
  }
}
.search-btn {
  color: $white;
  &:hover {
    color: shade-color($white, 20%);
  }
  &:active {
    color: shade-color($white, 30%);
  }
  &:focus {
    box-shadow: 0 0 0 $white;
  }
}
</style>
