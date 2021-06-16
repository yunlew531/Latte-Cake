<template>
  <header>
    <nav
      class="
        navbar navbar-expand-lg navbar-light
        bg-black-200
        position-fixed
        start-0
        end-0
        z-20
        p-1
        duration-300
      "
      :class="{ show: isNavShow }"
    >
      <div class="container-fluid px-12">
        <a
          href="#"
          class="
            navbar-brand
            text-center
            position-relative
            m-0
            p-0
            pb-1
            align-self-start
          "
        >
          <span class="material-icons fs-3"> local_cafe </span>
          <span
            class="
              fs-8
              position-absolute
              start-50
              translate-middle-x
              bottom-n1
              tracking-1
            "
            >LATTE & CAKE</span
          >
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#slideNavbar"
          @click="handScroll"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ps-12" id="slideNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active px-8" aria-current="page" href="#"
                >原料</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link px-8" href="#">商品</a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-8" href="#">關於我們</a>
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
  </header>
</template>

<script>
import { ref, watch } from 'vue';
import { getScrollY } from '@/methods';

export default {
  setup() {
    const isNavShow = ref(false);
    const { scrollY } = getScrollY();
    const searchText = ref('');
    const isSearchFocus = ref(false);

    const handScroll = () => {
      document.body.classList.toggle('overflow-hidden');
    };

    watch(scrollY, (newScrollY) => {
      if (newScrollY >= 100) {
        isNavShow.value = true;
      } else {
        isNavShow.value = false;
      }
    });

    watch(searchText, () => {
      if (searchText.value) {
        isSearchFocus.value = true;
      } else {
        isSearchFocus.value = false;
      }
    });

    return {
      isNavShow,
      handScroll,
      searchText,
      isSearchFocus,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
// @import '~@/assets/scss/custom/variables';
@import '~bootstrap/scss/mixins';
@import '~bootstrap/scss/variables';

@import '~bootstrap/scss/grid';

.navbar {
  top: -60px;
  &.show {
    top: 0;
  }
}
@include media-breakpoint-up(lg) {
}
</style>
