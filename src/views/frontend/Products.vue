<template>
  <main class="products">
    <section class="banner position-relative">
      <Navbar class="transparent-nav">
        <template #content>
          <div class="text-white position-absolute top-50 ps-50">
            <h3 class="fs-1">
              {{ nowCategory.chinese }}
            </h3>
            <span class="text-white-100">{{ nowCategory.eng }}</span>
          </div>
        </template>
      </Navbar>
    </section>
    <section class="container py-12">
      <ul
        class="
          products-nav
          d-flex
          justify-content-around
          list-unstyled
          border-top border-1 border-gray-300
          text-center
        "
      >
        <li
          class="flex-grow-1 border-top border-3 pt-3"
          :class="{ active: nowCategory.chinese === '全部商品' }"
          @click="nowCategory = { chinese: '全部商品', eng: 'All Products' }"
        >
          全部商品
        </li>
        <li
          class="flex-grow-1 border-top border-3 pt-3"
          :class="{ active: nowCategory.chinese === '咖啡' }"
          @click="nowCategory = { chinese: '咖啡', eng: 'Coffee' }"
        >
          咖啡
        </li>
        <li
          class="flex-grow-1 border-top border-3 pt-3"
          :class="{ active: nowCategory.chinese === '蛋糕' }"
          @click="nowCategory = { chinese: '蛋糕', eng: 'Cake' }"
        >
          蛋糕
        </li>
        <li class="flex-grow-1 border-top border-3 pt-3">其他</li>
        <li class="flex-grow-1 border-top border-3 pt-3">其他</li>
        <li class="flex-grow-1 border-top border-3 pt-3">其他</li>
      </ul>
    </section>
    <section class="container pb-25">
      <ul class="row gx-5 gy-10 list-unstyled">
        <li
          class="product-item col-4"
          v-for="product in productsData.productsData"
          :key="product.id"
        >
          <a
            href="javascript:;"
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
          </a>
        </li>
      </ul>
    </section>
    <Pagination :pages="pagination" @handPage="handPage" />
  </main>
  <SubFooter />
  <Footer />
</template>

<script>
import { ref, toRefs } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Pagination from '@/components/Pagination.vue';
import SubFooter from '@/components/SubFooter.vue';
import Footer from '@/components/Footer.vue';
import { apiGetPageProducts } from '@/api';

export default {
  components: {
    Navbar,
    Pagination,
    SubFooter,
    Footer,
  },
  setup() {
    const nowCategory = ref({ chinese: '全部商品', eng: 'All Products' });
    const { pagination, productsData } = apiGetPageProducts();

    const handPage = (page) => {
      const { pagination: newPages, productsData: newData } =
        apiGetPageProducts(page);
      const products = toRefs(newData);
      const pages = toRefs(newPages);
      productsData.productsData = products.productsData;
      pagination.pagination = pages.pagination;
    };

    return {
      nowCategory,
      productsData,
      pagination,
      handPage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/scss/custom/variables';

.banner {
  height: 500px;
  background: url(~@/assets/images/photo-1489533119213-66a5cd877091.jpg) center;
  background-size: cover;
}
.transparent-nav {
  height: 500px !important;
}
.products-nav {
  > li {
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      border-color: tint-color($danger, 30%) !important;
      color: tint-color($danger, 30%);
    }
    &.active {
      border-color: $danger !important;
      color: $danger;
    }
  }
}
.product-item {
  animation: product-ani 0.3s;
  .product-img {
    height: 400px;
    background-position: center;
    background-size: cover;
    position: relative;
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      transition: 0.3s;
      position: absolute;
    }
  }
  .more-info-text {
    font-size: $h4-font-size;
    opacity: 0;
    transform: scale(2) !important;
  }
  &:hover {
    .product-img {
      &::before {
        background: rgba(0, 0, 0, 0.3);
      }
    }
    .more-info-text {
      opacity: 1;
      transform: scale(1) !important;
    }
    .product-content {
      color: $danger;
    }
  }
}
@keyframes product-ani {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
