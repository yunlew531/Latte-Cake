<template>
  <header class="carousel-nav d-block position-absolute z-20 top-0 p-0">
    <p
      class="
        container
        fs-7
        fw-light
        text-white
        d-flex
        justify-content-start
        align-items-center
        py-1
        mb-0
      "
    >
      <span class="fs-6 material-icons text-danger"> phone_iphone </span
      ><span class="ps-1">02-23164516</span>
      <span class="fs-6 material-icons text-danger ps-5"> schedule </span>
      <span class="ps-1">每日早上8點 ~ 晚上10點</span>
    </p>
    <nav
      class="
        navbar navbar-expand-lg navbar-light
        shadow
        duration-200
        position-fixed
        start-0
        end-0
        px-12
        py-0
        z-20
      "
      :class="{ active: isScrollDown }"
    >
      <div class="container-fluid">
        <h1 class="m-0 pt-1 pb-2px">
          <router-link
            to="/"
            class="navbar-brand d-block"
            :class="{ active: isScrollDown }"
          >
          </router-link>
        </h1>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#carouselNabar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ps-8" id="carouselNabar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active px-16" aria-current="page" href="#"
                >原料</a
              >
            </li>
            <li class="nav-item">
              <router-link
                to="/products"
                class="nav-link d-block px-16"
                aria-current="page"
                href="#"
                >商品</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/aboutUs" class="nav-link d-block px-16"
                >關於我們</router-link
              >
            </li>
          </ul>
          <button
            type="button"
            class="cart-btn lh-1 bg-transparent border-0 position-relative"
            @click="showCartCanvas"
          >
            <span class="material-icons h-100 w-100"> shopping_cart </span>
            <span
              class="
                fs-7
                text-white
                bg-danger
                p-1
                rounded-pill
                position-absolute
                top-0
                end-0
                translate-middle-y
              "
              >{{ cartsData.carts?.length }}</span
            >
          </button>
          <form class="d-flex position-relative ms-3">
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
    <slot name="content"></slot>
  </header>
</template>

<script>
import { ref, watch, inject, toRefs } from 'vue';
import { useGetScrollY } from '@/methods';
import store from '@/composition/store';

const { getCarts } = store;

export default {
  name: 'Navbar',
  setup() {
    const searchText = ref('');
    const { scrollY } = useGetScrollY();
    const isSearchFocus = ref(false);
    const isScrollDown = ref(false);
    const $emitter = inject('$emitter');
    const state = inject('state');
    getCarts();

    const showCartCanvas = () => {
      $emitter.emit('showCartCanvas');
    };

    watch(searchText, () => {
      if (searchText.value) {
        isSearchFocus.value = true;
      } else {
        isSearchFocus.value = false;
      }
    });

    watch(scrollY, (newScrollY) => {
      if (newScrollY >= 100) {
        isScrollDown.value = true;
      } else {
        isScrollDown.value = false;
      }
    });

    return {
      ...toRefs(state),
      searchText,
      isSearchFocus,
      isScrollDown,
      showCartCanvas,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/scss/custom/variables';

.navbar-brand {
  width: 136px;
  height: 56px;
  background: center no-repeat;
  background-size: cover;
  background-image: url(~@/assets/images/logo_transparent_medium.png);
  .logo-icon {
    padding-bottom: $spacer * 1;
  }
  .logo-icon-text {
    bottom: $spacer * 0.25;
  }
  &.active {
    width: 117px;
    height: 48px;
    background-image: url(~@/assets/images/logo_transparent_small.png);
  }
}

.cart-btn {
  color: $white;
  &:hover {
    color: shade-color($white, 20%);
  }
}

.navbar {
  background-color: rgba(28, 28, 28, 0.6);
  top: $spacer * 1.75;
  &.active {
    top: 0;
    background-color: rgba(28, 28, 28, 0.9);
  }
}
.carousel-nav {
  width: 100%;
  height: 100vh;
  background-color: hsla(0, 0%, 0%, 0.15);
}

.search-input {
  caret-color: $white;
  background-color: transparent;
  transition: 0.2s ease-in;
  position: relative;
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
