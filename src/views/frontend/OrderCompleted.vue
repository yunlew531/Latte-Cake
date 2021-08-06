<template>
  <section class="navbar-bg"></section>
  <section class="container order-completed-panel mb-12">
    <div class="rounded shadow-sm bg-white p-8">
      <h2 class="text-center text-danger pb-2">完成訂購!</h2>
      <img
        class="img-fluid hand-img rounded"
        src="https://images.unsplash.com/photo-1580893246395-52aead8960dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80"
        alt="order-complete-hand"
      />
      <div class="d-flex justify-content-center pt-5">
        <router-link to="/products">
          <Button>我要繼續購物 !</Button>
        </router-link>
        <router-link to="/orders">
          <Button bgColor="outline-danger" class="ms-5">查看訂單資訊</Button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import Button from '@/components/frontend/Button.vue';

export default {
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped>
.navbar-bg {
  height: 300px;
  background: url(~@/assets/images/bg-banner.jpg) no-repeat center;
  background-size: cover;
}
.order-completed-panel {
  max-width: 992px;
  transform: translateY(-50px);
}
.hand-img {
  object-fit: cover;
  object-position: 50% 65%;
  width: 100%;
  height: 500px;
}
</style>
