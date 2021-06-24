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
    <HotSale />
    <Category />
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
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/views/frontend/Index';
</style>
