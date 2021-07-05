<template>
  <div class="header position-relative">
    <div class="header-nav d-flex flex-wrap p-8">
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
      <form class="d-flex position-relative">
        <input
          class="
            search-input
            form-control
            border-0 border-bottom border-2 border-white
            ps-3
            me-2
            mt-1
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
      <button
        type="button"
        class="align-self-start btn btn-primary mt-2 ms-0 ms-xm-5"
        @click="logOut"
      >
        登出
      </button>
    </div>
    <div
      class="
        d-flex
        align-items-center
        text-white
        position-absolute
        start-0
        bottom-0
        p-8
      "
    >
      <div
        :style="{ 'background-image': `url(${user.photo})` }"
        class="user-photo rounded-pill border overflow-hiddden"
      ></div>
      <p class="m-0 ms-3">
        <span
          class="d-block fs-5"
          :class="calcNameSize(user.username?.length)"
          >{{ user.username }}</span
        >
        <span class="fs-7 text-black-300">管理員</span>
      </p>
    </div>
  </div>
</template>

<script>
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiLogOut } from '@/api';

export default {
  name: 'BackendNavbar',
  props: {
    user: {
      type: Object,
      default: () => ({ username: '無法取得用戶者資料' }),
    },
  },
  setup() {
    const router = useRouter();

    const searchText = ref('');
    const isSearchFocus = ref(false);
    watch(searchText, () => {
      if (searchText.value) {
        isSearchFocus.value = true;
      } else {
        isSearchFocus.value = false;
      }
    });

    const calcNameSize = (length) => {
      if (length > 15) return 'fs-6';
      return 'fs-5';
    };

    const logOut = async () => {
      const { data } = await apiLogOut();
      if (data.success) {
        document.cookie = 'LatteCake=;expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        router.push('/login');
      }
    };

    return {
      searchText,
      isSearchFocus,
      logOut,
      calcNameSize,
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
.user-photo {
  width: 60px;
  height: 60px;
  background: center no-repeat;
  background-size: cover;
}
</style>
