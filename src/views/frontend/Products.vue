<template>
  <Navbar class="navbar">
    <template #content>
      <div
        class="
          category-title
          position-absolute
          start-50
          top-50
          translate-middle-x
        "
        :class="{ active: isTitleAniPlay && !isLoading }"
      >
        <h3
          v-if="!isLoading"
          class="text-white fs-1 fw-bold mt-25"
          @animationend="handTitleAni('removeClass')"
        >
          {{ nowCategory }}
        </h3>
      </div>
    </template>
  </Navbar>
  <main>
    <section class="nav-bg"></section>
    <section class="container py-12">
      <ul
        class="
          products-nav
          d-flex
          justify-content-around
          list-unstyled
          text-center
          mb-0
        "
      >
        <li
          v-for="category in categoryList"
          :key="category"
          class="flex-grow-1 py-3"
          :class="{ active: nowCategory === category }"
          @click="nowCategory = category"
          @mouseenter="nowHoverCategory = category"
          @mouseleave="nowHoverCategory = ''"
        >
          {{ category }}
        </li>
      </ul>
      <div class="progress position-relative">
        <div
          class="progress-bar position-absolute h-100"
          :style="handProgressBarAni"
          role="progressbar"
        ></div>
      </div>
    </section>
    <section class="container pb-25">
      <ul class="row gx-5 gy-10 list-unstyled">
        <li
          class="product-item col-3"
          v-for="product in pageProductsData"
          :key="product.id"
        >
          <router-link
            :to="`/product/${product.id}`"
            class="text-reset text-decoration-none d-block"
          >
            <div
              class="
                product-img
                rounded
                duration-200
                d-flex
                justify-content-center
                align-items-center
              "
              :style="{ 'background-image': `url(${product.imageUrl})` }"
            >
              <p class="more-info-text text-white duration-500">商品詳細</p>
            </div>
            <div class="product-content d-flex justify-content-between mt-2">
              <div>
                <h2 class="fs-5 mb-0 duration-200">{{ product.title }}</h2>
                <p class="fs-7 text-black-300 m-0">草莓、白酒</p>
              </div>
              <span
                class="text-danger align-self-start border border-danger px-1"
                >熱銷商品</span
              >
            </div>
            <p class="d-flex justify-content-between m-0">
              <span class="text-decoration-line-through"
                >原價: NT${{ product.origin_price }}</span
              ><span class="fs-5">售價: NT${{ product.price }}</span>
            </p>
          </router-link>
        </li>
      </ul>
    </section>
    <Pagination :pages="pagination" @handPage="handPage" />
  </main>
  <SubFooter />
  <Footer />
</template>

<script>
import { computed, reactive, ref, watch, inject, toRefs } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Pagination from '@/components/Pagination.vue';
import SubFooter from '@/components/SubFooter.vue';
import Footer from '@/components/Footer.vue';
import store from '@/composition/store';

const { getPageProducts } = store;

export default {
  name: 'Products',
  components: {
    Navbar,
    Pagination,
    SubFooter,
    Footer,
  },
  setup() {
    const state = inject('state');
    const categoryList = reactive([
      '全部',
      '咖啡',
      '蛋糕',
      '其他1',
      '其他2',
      '其他3',
    ]);
    const nowHoverCategory = ref('');
    const nowCategory = ref('全部');

    getPageProducts();

    // 換頁
    const handPage = (page) => {
      getPageProducts(page);
    };

    // 控制標題動畫 @keyframes
    const isTitleAniPlay = ref(true);
    const handTitleAni = (action) => {
      if (action === 'removeClass') {
        isTitleAniPlay.value = false;
      } else {
        isTitleAniPlay.value = true;
      }
    };

    // 控制 Category Nav 動畫
    const handProgressBarAni = computed(() => {
      const percent = 100 / categoryList.length;
      let position = 0;
      // 有 hover nav 時動畫停在 hover 對象，反之動畫停在 nowCategory 對象
      if (nowHoverCategory.value) {
        categoryList.forEach((item, idx) => {
          if (item === nowHoverCategory.value) position = idx * percent;
        });
      } else {
        categoryList.forEach((item, idx) => {
          if (item === nowCategory.value) position = idx * percent;
        });
      }
      return [
        { width: `${percent}%` },
        { left: `${position}%` },
        { transition: '0.3s' },
      ];
    });

    watch(nowCategory, () => {
      handTitleAni();
    });

    return {
      ...toRefs(state),
      categoryList,
      nowHoverCategory,
      nowCategory,
      isTitleAniPlay,
      handProgressBarAni,
      handPage,
      handTitleAni,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/views/frontend/Products';
</style>
