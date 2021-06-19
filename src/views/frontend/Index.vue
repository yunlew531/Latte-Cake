<template>
  <Navbar>
    <template #content>
      <div class="container position-relative h-100">
        <div class="carousel-title position-absolute start-0 top-50">
          <h3 class="text-white fs-1 fw-bold tracking-2">
            歡迎光臨 <span class="text-danger">LATTE & CAKE</span>
          </h3>
        </div>
      </div>
    </template>
  </Navbar>
  <main>
    <Carousel />
    <div class="bg-product-info">
      <div class="bg-filter">
        <TopSellProducts />
        <AboutCake />
      </div>
    </div>
    <SubFooter />
  </main>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Carousel from '@/components/frontend/Index/Carousel.vue';
import TopSellProducts from '@/components/frontend/Index/TopSellProducts.vue';
import AboutCake from '@/components/frontend/Index/AboutCake.vue';
import SubFooter from '@/components/SubFooter.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Index',
  components: {
    Navbar,
    Carousel,
    TopSellProducts,
    AboutCake,
    SubFooter,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/views/frontend/Index';
</style>
