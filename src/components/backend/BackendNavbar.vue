<template>
  <div class="header">
    <div class="header-nav d-flex p-8">
      <router-link
        to="/"
        class="
          d-flex
          align-items-center
          text-white text-decoration-none
          me-auto
        "
        ><span class="fs-1 material-icons-outlined"> home </span
        ><span class="fs-4 ms-2">前台</span></router-link
      >
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
        <button class="search-btn btn position-absolute end-0" type="button">
          <span class="material-icons"> search </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { watch, ref } from 'vue';

export default {
  name: 'BackendNavbar',
  setup() {
    const searchText = ref('');
    const isSearchFocus = ref(false);
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
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.header {
  height: 250px;
  background: rgba($info, 0.9);
  .header-nav {
    animation: header 0.3s forwards;
    transform: translateY(-100%);
  }
}
@keyframes header {
  to {
    transform: translateY(0);
  }
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
