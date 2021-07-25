<template>
  <div class="nav-bg"></div>
  <section class="container mb-12">
    <div
      id="navbarTeleportTop"
      class="teleport-container-top duration-600 mb-8"
      :class="isScrollDown ? 'w-0' : 'w-100'"
    ></div>
    <div class="row">
      <CategoryNav
        v-model:nowCategory="nowCategory"
        :isScrollDown="isScrollDown"
        :displayData="displayData"
        :searchText="search"
      />
      <div
        id="navbarTeleportAside"
        class="teleport-container-aside duration-500 position-relative"
        :class="isScrollDown ? 'col-2' : 'w-0 p-0'"
      ></div>
      <div
        class="products-panel-container duration-500"
        :class="isScrollDown ? 'col-10' : 'col-12'"
      >
        <h3 v-if="search && allProducts.length" class="fs-5 pb-2">
          搜尋到
          <span class="fs-4 text-danger">{{ displayData.length }}</span> 件有關
          <span class="fs-4 text-danger">{{ search }}</span> 的商品
        </h3>
        <section
          class="
            products-panel
            d-flex
            flex-column
            bg-white
            rounded
            shadow-sm
            p-5 p-sm-10
          "
          :class="{ active: playAnime }"
        >
          <div
            v-if="!displayData.length && search && allProducts.length"
            class="
              flex-grow-1
              d-flex
              flex-column
              justify-content-center
              align-items-center
            "
          >
            <p class="display-5">找不到您要的商品!</p>
            <button type="button" class="btn btn-primary" @click="removeSearch">
              返回全部品項
            </button>
          </div>
          <ul v-if="displayData.length" class="row gx-5 gy-10 list-unstyled">
            <li
              v-for="(product, key) in displayData"
              :key="product.id"
              class="product-item d-flex flex-column"
              :class="isScrollDown ? 'col-4' : 'col-sm-6 col-lg-4 col-xl-3'"
              @animationend="removeAnime(key)"
            >
              <router-link
                :to="`/product/${product.id}`"
                class="
                  text-reset text-decoration-none
                  d-block
                  flex-grow-1
                  d-flex
                  flex-column
                  justify-content-between
                "
              >
                <div>
                  <div
                    class="
                      product-img
                      rounded
                      duration-200
                      d-flex
                      justify-content-center
                      align-items-center
                    "
                    :style="{
                      'background-image': `url(${product.imageUrl || product.imagesUrl[0]})`,
                    }"
                  >
                    <p class="more-info-text text-white duration-500">
                      商品詳細
                    </p>
                  </div>
                  <div class="product-content d-flex justify-content-between mt-2">
                    <div>
                      <h2 class="fs-5 mb-0 duration-200">
                        {{ product.title }}
                      </h2>
                      <p class="fs-7 text-black-300 m-0">
                        {{ product.description }}
                      </p>
                    </div>
                    <span
                      class="
                        text-danger text-nowrap
                        align-self-start
                        border border-danger
                        px-1
                      "
                      >熱銷商品</span
                    >
                  </div>
                </div>
                <p class="d-flex justify-content-between m-0">
                  <span class="text-decoration-line-through"
                    >原價: NT${{ product.origin_price?.toLocaleString() }}</span
                  ><span class="fs-5">售價: NT${{ product.price.toLocaleString() }}</span>
                </p>
              </router-link>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <Pagination
      class="py-8"
      :class="{ invisible: nowCategory !== '全部' || search }"
      :pages="pagination"
      @handPage="handPage"
    />
  </section>
</template>

<script>
import {
  ref, inject, watch, toRefs, computed, onUnmounted,
} from 'vue';
import store from '@/composition/store';
import CategoryNav from '@/components/frontend/Products/CategoryNav.vue';
import Pagination from '@/components/Pagination.vue';

const { getAllProducts, getPageProducts } = store;

export default {
  name: 'Products',
  components: {
    CategoryNav,
    Pagination,
  },
  props: {
    category: {
      type: String,
    },
    search: {
      type: String,
    },
  },
  setup(props) {
    const state = inject('state');
    const { allProducts, pageProductsData, pagination } = toRefs(state);
    const { search } = toRefs(props);
    const scrollY = inject('scrollY');
    const $emitter = inject('$emitter');

    const isPhone = ref(document.body.offsetWidth < 1366);
    const isScrollDown = ref(false);

    const nowCategory = ref('全部');
    const displayData = computed(() => {
      let data = null;
      if (search.value && allProducts.value.length) {
        data = allProducts.value.filter((product) => product.title.match(search.value));
      } else if (nowCategory.value === '全部' || nowCategory.value === '搜尋') {
        data = pageProductsData.value;
      } else {
        data = allProducts.value.filter((product) => product.category === nowCategory.value);
      }
      return data;
    });

    watch(scrollY, (y) => {
      if (y > 180 && !isPhone.value) isScrollDown.value = true;
      else isScrollDown.value = false;
    });

    const playAnime = ref(false);
    watch(nowCategory, () => {
      playAnime.value = true;
    });

    watch(search, (value) => {
      if (value) nowCategory.value = '搜尋';
    });

    const handPage = (page) => {
      getPageProducts(page);
      window.scrollTo(0, 0);
    };

    const removeSearch = () => {
      $emitter.emit('removeSearch', '');
      nowCategory.value = '全部';
    };
    onUnmounted(removeSearch);

    getAllProducts();
    getPageProducts().then(({ success }) => {
      if (success) playAnime.value = true;
    });
    const removeAnime = (key) => {
      if (key === 0) playAnime.value = false;
    };

    return {
      isScrollDown,
      nowCategory,
      allProducts,
      displayData,
      pagination,
      playAnime,
      handPage,
      removeSearch,
      removeAnime,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/views/frontend/Products';
</style>
