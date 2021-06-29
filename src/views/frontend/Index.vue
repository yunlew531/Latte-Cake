<template>
  <Navbar>
    <template #content>
      <div class="container position-relative h-100">
        <div
          class="carousel-title position-absolute start-0 top-50"
          :class="{ active: !isLoading }"
        >
          <h3 class="text-white fs-1 fw-bold tracking-2">
            歡迎光臨 <span class="text-danger">LATTE & CAKE</span>
          </h3>
        </div>
      </div>
    </template>
  </Navbar>
  <main>
    <Carousel />
    <HotSale />
    <Category />
    <div class="bg-info">
      <div class="container position-relative py-8 py-md-16 mt-16">
        <img
          class="
            hamburger-img
            img-fluid
            position-absolute
            ms-xl-50
            start-0
            bottom-0
          "
          src="@/assets/images/photo-hamburger.png"
          alt="hamburger"
        />
        <div class="text-end px-xl-50 ps-50">
          <router-link
            to="/products"
            class="
              products-page-link
              border-2
              btn btn-danger
              text-decoration-none
              px-6 px-sm-12
              overflow-hidden
            "
          >
            <span
              class="position-absolute start-50 top-50 translate-middle w-100"
              >立即點餐</span
            >
            <span class="opacity-0">立即點餐</span></router-link
          >
          <p
            class="
              d-flex
              flex-wrap
              align-items-center
              justify-content-end
              text-white
              fs-2
              tracking-3
              mt-5
              mb-0
            "
          >
            <span class="text-danger fs-5">餓了嗎?</span>
            <span class="ms-5">立即享用餐點</span>
          </p>
        </div>
      </div>
    </div>

    <div class="bg-product-info">
      <div class="bg-filter">
        <AboutCake />
      </div>
    </div>
    <LocationPanel />
    <SubFooter />
  </main>
  <Footer />
</template>

<script>
import { inject, toRefs } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Carousel from '@/components/frontend/Index/Carousel.vue';
import HotSale from '@/components/frontend/Index/HotSale.vue';
import Category from '@/components/frontend/Index/Category.vue';
import AboutCake from '@/components/frontend/Index/AboutCake.vue';
import SubFooter from '@/components/SubFooter.vue';
import Footer from '@/components/Footer.vue';
import LocationPanel from '../../components/frontend/Index/LocationPanel.vue';

export default {
  name: 'Index',
  components: {
    Navbar,
    Carousel,
    HotSale,
    Category,
    AboutCake,
    SubFooter,
    Footer,
    LocationPanel,
  },
  setup() {
    const state = inject('state');

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/views/frontend/Index';
</style>
