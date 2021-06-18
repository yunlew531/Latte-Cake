<template>
  <header class="carousel-nav position-absolute z-10">
    <p
      class="
        container
        fs-7
        fw-light
        text-white
        d-flex
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
        position-absolute
        top-7
        start-0
        end-0
        px-12
        py-0
        z-20
      "
      :class="{ active: isScrollDown }"
    >
      <div class="container-fluid">
        <router-link
          to="/"
          class="
            navbar-brand
            text-center
            position-relative
            m-0
            align-self-start
          "
        >
          <span
            class="logo-icon material-icons text-danger duration-200 fs-1 lh-1"
            :class="[{ 'fs-3': isScrollDown }, { 'pb-4': isScrollDown }]"
          >
            local_cafe
          </span>
          <span
            class="
              logo-icon-text
              fw-bold
              fs-6
              position-absolute
              start-50
              translate-middle-x
              tracking-1
            "
            :class="[{ 'fs-7': isScrollDown }, { 'bottom-1': isScrollDown }]"
            >LATTE & CAKE</span
          >
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#carouselNabar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ps-25" id="carouselNabar">
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
              <a class="nav-link d-block px-16" href="#">關於我們</a>
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
    <slot name="content"></slot>
  </header>
</template>

<script>
import { ref, watch } from 'vue';
import { getScrollY } from '@/methods';

export default {
  setup() {
    const searchText = ref('');
    const { scrollY } = getScrollY();
    const isSearchFocus = ref(false);
    const isScrollDown = ref(false);

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
      searchText,
      isSearchFocus,
      isScrollDown,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/scss/custom/variables';

.navbar-brand {
  width: 150px;
  .logo-icon {
    padding-bottom: $spacer * 1;
  }

  .logo-icon-text {
    bottom: $spacer * 0.25;
  }
}

.navbar {
  background-color: rgba(28, 28, 28, 0.6);
  position: fixed !important;
  &.active {
    top: 0 !important;
    background-color: rgba(28, 28, 28, 0.9);
  }
}
.carousel-nav {
  width: 100%;
  height: 100vh;
  background-color: hsla(0, 0%, 0%, 0.25);
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
