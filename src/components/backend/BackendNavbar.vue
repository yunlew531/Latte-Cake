<template>
  <div class="header position-relative">
    <div class="header-nav d-flex flex-wrap p-8">
      <router-link
        to="/"
        class="
          tofront-link
          d-flex
          align-items-center
          text-decoration-none
          me-auto
        "
        ><span class="fs-1 material-icons-outlined"> home </span
        ><span class="fs-4 ms-2 tracking-2">返回前台</span></router-link
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
          v-model.trim="search"
          @keyup.enter="searchProduct"
        />
        <button
          class="search-btn btn position-absolute end-0 bottom-n1"
          type="button"
          @click="searchProduct"
        >
          <span class="material-icons"> search </span>
        </button>
      </form>
      <button
        type="button"
        class="align-self-start btn btn-primary mt-2 ms-0 ms-sm-5"
        @click="logOut"
      >
        登出
      </button>
    </div>
    <div
      class="
        user-panel
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
        <span class="d-block fs-5" :class="calcNameSize(user.username?.length)">{{
          user.username
        }}</span>
        <span class="fs-7 text-black-300">管理員</span>
      </p>
    </div>
  </div>
</template>

<script>
import {
  inject, onUnmounted, ref, reactive, watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiLogOut, apiGetUser } from '@/api';

import store from '@/composition/store';

const { setIsLogIn } = store;

export default {
  name: 'BackendNavbar',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const $emitter = inject('$emitter');
    const search = ref('');

    const logOut = async () => {
      const { data } = await apiLogOut();
      if (data.success) {
        document.cookie = 'LatteCake=;expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        setIsLogIn(false);
        router.push('/login');
      }
    };

    const calcNameSize = (length) => {
      if (length > 15) return 'fs-6';
      return 'fs-5';
    };

    const searchProduct = () => {
      if (route.name === 'BackendProducts') {
        $emitter.emit('handSearch', search.value);
      } else {
        router.push({
          name: 'BackendProducts',
          query: { search: search.value },
        });
      }
    };

    const removeSearch = () => {
      search.value = '';
    };

    const user = reactive({});
    const getUser = async () => {
      try {
        const res = await apiGetUser();
        if (res.status === 200) {
          const data = res.data.results[0];
          user.username = `${data.name.first} ${data.name.last}`;
          user.photo = data.picture.medium;
        }
      } catch (err) {
        console.dir(err);
      }
    };

    const init = () => {
      $emitter.on('removeSearch', removeSearch);
      getUser();
    };
    init();

    onUnmounted(() => {
      $emitter.off('removeSearch', removeSearch);
    });

    const isSearchFocus = ref(false);
    watch(search, (value) => {
      if (value) isSearchFocus.value = true;
      else isSearchFocus.value = false;
    });

    return {
      user,
      search,
      isSearchFocus,
      logOut,
      calcNameSize,
      searchProduct,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
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
.tofront-link {
  color: $white;
  transition: 0.2s;
  &:hover {
    color: shade-color($white, 20%);
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
.user-panel {
  opacity: 0;
  transform: translateX(-100%);
  animation: user-panel 0.3s forwards ease-in-out;
}
@keyframes user-panel {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.user-photo {
  width: 60px;
  height: 60px;
  background: center no-repeat;
  background-size: cover;
}
</style>
