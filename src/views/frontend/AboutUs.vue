<template>
  <Navbar class="navbar position-relative">
    <template class="" #content>
      <div class="position-absolute start-50 bottom-25 translate-middle-x">
        <h2 class="aboutus-title fs-1 text-white">關於Latte & Cake</h2>
      </div>
    </template>
  </Navbar>
  <main>
    <div class="navbar-bg"></div>
    <div class="container py-25">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115676.73003252424!2d121.49439485820317!3d25.037541700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb9dc73545d%3A0x6513f5fb17ad1f67!2z6Ie65YyX5biC5pS_5bqc!5e0!3m2!1szh-TW!2stw!4v1624710293387!5m2!1szh-TW!2stw"
        width="600"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  </main>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 500px;
}
.navbar-bg {
  height: 500px;
  background: url(~@/assets/images/bg-banner.jpg) no-repeat center;
  background-size: cover;
}
.aboutus-title {
  animation: title-ani 0.5s forwards;
}
@keyframes title-ani {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
