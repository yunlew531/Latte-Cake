<template>
  <Navbar />
  <main>
    <router-view />
  </main>
  <SubFooter />
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import SubFooter from '@/components/SubFooter.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    SubFooter,
    Footer,
  },
};
</script>
