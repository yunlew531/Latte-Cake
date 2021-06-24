<template>
  <section class="container pt-25 pb-50">
    <div class="category-panel text-white d-flex">
      <div class="hot-area w-50">
        <h3 class="display-3 fw-normal m-0 h-100 w-100">
          <router-link
            to="/products"
            class="
              d-flex
              align-items-end
              text-reset text-decoration-none
              p-12
              tracking-2
              h-100
            "
          >
            熱銷
          </router-link>
        </h3>
      </div>
      <ul class="w-50 d-flex flex-wrap list-unstyled m-0">
        <li class="coffee-area w-50 h-50">
          <h3 class="fs-2 h-100">
            <router-link
              to="/"
              class="
                d-block
                text-reset text-decoration-none
                tracking-2
                p-12
                h-100
              "
              >咖啡</router-link
            >
          </h3>
        </li>
        <li class="cake-area w-50 h-50">
          <h3 class="fs-2 h-100">
            <router-link
              to="/"
              class="
                d-block
                text-reset text-decoration-none
                tracking-2
                p-12
                h-100
              "
              >蛋糕</router-link
            >
          </h3>
        </li>
        <li class="salad-area w-50 h-50">
          <h3 class="fs-2 h-100">
            <router-link
              to="/"
              class="
                d-block
                text-reset text-decoration-none
                tracking-2
                p-12
                h-100
              "
              >沙拉</router-link
            >
          </h3>
        </li>
        <li class="set-area w-50 h-50">
          <h3 class="fs-2 h-100">
            <router-link
              to="/"
              class="
                d-block
                text-reset text-decoration-none
                tracking-2
                p-12
                h-100
              "
              >套餐</router-link
            >
          </h3>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.category-panel {
  height: 720px;
}

.hot-area,
.coffee-area,
.cake-area,
.salad-area,
.set-area {
  background: center no-repeat;
  background-size: cover;
}
.hot-area {
  background-image: url(~@/assets/images/hamburger-2.jpg);
}
.coffee-area {
  background-image: url(~@/assets/images/coffee-area.jpg);
}
.cake-area {
  background-image: url(~@/assets/images/cake-area.jpg);
}
.salad-area {
  background-image: url(~@/assets/images/salad-area.jpg);
}
.set-area {
  background-image: url(~@/assets/images/set-area.jpg);
}
</style>
