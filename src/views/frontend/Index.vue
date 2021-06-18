<template>
  <Navbar />
  <main>
    <TransparentNavbar>
      <template #content>
        <h3 class="fs-1 text-white position-absolute bottom-0 w-50 ps-25 pb-12">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h3>
      </template>
    </TransparentNavbar>
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
import TransparentNavbar from '@/components/TransparentNavbar.vue';
import Carousel from '@/components/frontend/Index/Carousel.vue';
import Navbar from '@/components/Navbar.vue';
import TopSellProducts from '@/components/frontend/Index/TopSellProducts.vue';
import AboutCake from '@/components/frontend/Index/AboutCake.vue';
import SubFooter from '@/components/SubFooter.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Index',
  components: {
    TransparentNavbar,
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
