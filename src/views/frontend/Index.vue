<template>
  <Navbar />
  <main>
    <Carousel />
    <div class="bg-product-info">
      <div class="bg-filter">
        <TopSellProducts />
        <AboutCake />
      </div>
    </div>
  </main>
</template>

<script>
import Carousel from '@/components/frontend/Index/Carousel.vue';
import Navbar from '@/components/Navbar.vue';
import TopSellProducts from '@/components/frontend/Index/TopSellProducts.vue';
import AboutCake from '@/components/frontend/Index/AboutCake.vue';

export default {
  name: 'Index',
  components: {
    Navbar,
    Carousel,
    TopSellProducts,
    AboutCake,
  },
};
</script>

<style lang="scss" scoped>
.bg-product-info {
  background: center no-repeat url(~@/assets/images/image-bg-product-info.jpg);
  background-size: cover;
}
.bg-filter {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.85);
}
</style>
