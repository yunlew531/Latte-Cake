<template>
  <section class="container py-25">
    <h3 class="fs-4 text-center pb-5">店長推薦</h3>
    <div
      class="
        recommend-products-link
        duration-600
        d-flex
        justify-content-end
        pb-5
      "
    >
      <router-link
        to="/products"
        class="
          text-decoration-none text-reset
          d-flex
          align-items-center
          m-0
          p-1
        "
      >
        <h4 class="fs-6 lh-1 m-0">所有商品一覽</h4>
        <span class="material-icons ms-1"> trending_flat </span>
      </router-link>
    </div>
    <ul class="row gx-2px gy-12 list-unstyled">
      <li
        class="col-sm-2 col-md-4 col-xl-3"
        v-for="product in 8"
        :key="product"
      >
        <a
          href="#"
          class="product-item d-block text-decoration-none duration-300"
        >
          <div class="overflow-hidden">
            <div
              class="top-sell-img duration-300"
              style="
                background-image: url(https://images.unsplash.com/photo-1618550454160-c69921c2f1a8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);
              "
            ></div>
          </div>
          <div class="d-flex justify-content-sm-between p-1">
            <div>
              <h2 class="fs-5 m-0">蘋果蛋糕</h2>
              <h4 class="fs-7 m-0 py-1 text-black-300">蘋果、丹麥麵粉</h4>
              <p>NT$250</p>
            </div>
            <span
              class="
                text-danger
                fs-7
                border border-danger
                align-self-start
                px-1
              "
              >熱銷商品</span
            >
          </div>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/custom/variables';

.product-item {
  color: $black-200;
  overflow: hidden;
  .top-sell-img {
    background: center no-repeat;
    background-size: cover;
    overflow: hidden;
    height: 250px;
    filter: brightness(0.9);
  }
  &:hover {
    color: $danger;
    .top-sell-img {
      filter: brightness(1);
      transform: scale(1.01);
    }
  }
}
.recommend-products-link {
  cursor: pointer;
  margin-right: 5px;
  color: transparent;
  background: url(~@/assets/images/red-black.png) no-repeat;
  background-position: right -5px top 0;
  background-clip: text;
  &:hover {
    margin-right: 0;
    background-position: right -155px top 0;
  }
}
</style>
