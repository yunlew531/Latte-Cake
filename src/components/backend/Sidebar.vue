<template>
  <ul
    class="
      sidebar
      flex-shrink-0
      list-unstyled
      bg-white-100
      rounded
      px-2
      py-5
      my-5
      mb-lg-0
      me-5
    "
  >
    <li>
      <router-link
        to="/admin/salesChart"
        active-class="active"
        class="
          duration-1
          router-link
          d-flex
          align-items-center
          fs-5
          text-black-200 text-decoration-none
          rounded
          px-5
          py-2
        "
      >
        <span class="material-icons-outlined text-primary me-1"> insert_chart </span
        >銷售圖表</router-link
      >
    </li>
    <li>
      <router-link
        to="/admin/addProduct"
        active-class="active"
        class="
          duration-1
          router-link
          d-flex
          align-items-center
          fs-5
          text-black-200 text-decoration-none
          rounded
          px-5
          py-2
        "
      >
        <span class="material-icons-outlined text-primary me-1"> add </span
        >{{ boardStatus }}產品</router-link
      >
    </li>
    <li>
      <router-link
        to="/admin/products"
        active-class="active"
        class="
          router-link
          d-flex
          align-items-center
          fs-5
          text-black-200 text-decoration-none
          rounded
          px-5
          py-2
        "
      >
        <span class="material-icons-outlined text-primary me-1"> list_alt </span
        >商品列表</router-link
      >
    </li>
    <li>
      <router-link
        to="/admin/orders"
        active-class="active"
        class="
          router-link
          d-flex
          align-items-center
          fs-5
          text-black-200 text-decoration-none
          rounded
          px-5
          py-2
        "
      >
        <span class="material-icons-outlined text-primary me-1"> border_color </span
        >訂單列表</router-link
      >
    </li>
    <li>
      <router-link
        to="/admin/coupon"
        active-class="active"
        class="
          router-link
          d-flex
          align-items-center
          fs-5
          text-black-200 text-decoration-none
          rounded
          px-5
          py-2
        "
      >
        <span class="material-icons-outlined text-primary me-1"> local_offer </span
        >優惠券</router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    boardStatus: {
      type: String,
      default: '新增',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';
@import '~bootstrap/scss/mixins';

.sidebar {
  width: 250px;
  transform: translateX(-250px);
  animation: sidebar 0.3s forwards ease-in-out;
}
@keyframes sidebar {
  to {
    transform: translateX(0);
  }
}
@include media-breakpoint-down(lg) {
  .sidebar {
    width: 100%;
  }
}
.router-link {
  transition: 0.2s ease-in-out;
  &.active {
    box-shadow: $box-shadow;
    background: $white;
    transform: translateX(5px);
  }
}
</style>
