<template>
  <div class="nav-bg" />
  <section class="order-panel bg-white rounded shadow-sm container p-10">
    <Loading v-model:active="isLoading" :is-full-page="false" />
    <div v-if="order.id">
      <router-link to="/orders" class="btn btn-sm btn-outline-primary mb-3"
        >返回訂單列表</router-link
      >
      <div class="d-flex flex-wrap">
        <p class="fs-5 me-auto mb-0">
          <span class="fs-6 me-2">訂單編號:</span
          ><span class="d-inline-block w-100 w-sm-auto">{{ order.id }}</span>
        </p>
        <span class="fs-5 d-inline-block w-100 w-md-auto mb-2 mb-md-0">
          <span class="fs-6 me-2">成立時間:</span>{{ useTranslateTime(order.create_at) }}</span
        >
      </div>
      <div class="d-flex align-items-center mb-5">
        <h4 class="fs-6 d-flex align-items-center m-0 me-2">
          狀態:
          <span>
            <span v-if="order.is_paid" class="text-success d-flex align-items-center">
              <span class="material-icons-outlined"> done </span>
              <span>已付款</span>
            </span>
            <span v-else class="text-danger d-flex align-items-center">
              <span class="material-icons-outlined"> close </span>
              <span>未付款</span>
            </span>
          </span>
        </h4>
      </div>
      <ul class="list-unstyled bg-white-100 border rounded my-5">
        <li class="user-item d-flex">
          <span class="user-title px-5 py-2">姓名</span
          ><span class="px-5 py-2">{{ order.user.name }}</span>
        </li>
        <li class="user-item d-flex">
          <span class="user-title px-5 py-2">電話</span
          ><span class="px-5 py-2">{{ order.user.tel }}</span>
        </li>
        <li class="user-item d-flex">
          <span class="user-title px-5 py-2">信箱</span
          ><span class="px-5 py-2">{{ order.user.email }}</span>
        </li>
        <li class="user-item d-flex">
          <span class="user-title px-5 py-2">地址</span
          ><span class="px-5 py-2">{{ order.user.address }}</span>
        </li>
      </ul>
      <ul class="list-unstyled row g-6">
        <li v-for="product in order.products" :key="product.id" class="col-lg-6">
          <div class="bg-white-100 border rounded p-5">
            <h2 class="fs-5 m-0 me-auto mb-2">
              <router-link
                :to="`/product/${product.product.id}`"
                class="product-name text-decoration-none"
                >{{ product.product.title }}</router-link
              >
            </h2>
            <div class="d-flex flex-wrap">
              <img
                :src="product.product.imageUrl || product.product.imagesUrl[0]"
                :alt="product.product.title"
                class="product-img rounded me-8"
              />
              <div class="flex-grow-1 mt-5 mt-sm-0">
                <h4 class="fs-6">類別: {{ product.product.category }}</h4>
                <p class="d-flex align-items-center mb-2">
                  <span class="text-decoration-line-through me-auto"
                    >原價: {{ product.product.origin_price?.toLocaleString() }}</span
                  >
                  <span
                    >售價:
                    <span class="text-danger">{{ product.product.price?.toLocaleString() }}</span>
                  </span>
                </p>
                <p class="mb-2">數量: {{ product.qty }}</p>
                <p class="text-decoration-line-through mb-2">
                  金額: {{ product.total?.toLocaleString() }}
                </p>
                <p class="mb-2">
                  折扣後金額:
                  <span class="text-danger fs-5">{{ product.final_total?.toLocaleString() }}</span>
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <p class="text-end fs-6 m-0">
        總計: NT$
        <span class="fs-3">{{ order.total?.toLocaleString() }} </span>
      </p>
    </div>
  </section>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { apiGetCustOrder } from '@/api';
import { useToast, useTranslateTime } from '@/methods';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    Loading,
  },
  setup() {
    const route = useRoute();
    const isLoading = ref(false);

    const order = reactive({ order: {} });

    const getOrder = async () => {
      isLoading.value = true;
      const { id } = route.params;
      const { data } = await apiGetCustOrder(id);
      if (data.success) order.order = data.order;
      else useToast('無法取得訂單!', 'danger');
      isLoading.value = false;
    };

    const init = () => {
      getOrder();
    };
    init();

    return {
      ...toRefs(order),
      isLoading,
      useTranslateTime,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';
@import '~bootstrap/scss/mixins';

.nav-bg {
  height: 300px;
  background: url(~@/assets/images/bg-banner.jpg) center no-repeat;
  background-size: cover;
}
.order-panel {
  transform: translateY(-50px);
}
.user-item {
  border-top: $gray-300 solid 1px;
  border-bottom: $gray-300 solid 1px;
  margin-bottom: -1px;
  &:first-child {
    border-top: 0;
  }
  &:last-child {
    border-bottom: 0;
  }
}
.user-title {
  width: 150px;
  flex-shrink: 0;
  background: shade-color($white, 5%);
  @include media-breakpoint-down(sm) {
    width: 100px;
  }
}
.product-name {
  color: $primary;
  &:hover {
    color: tint-color($primary, 30%);
  }
}
.product-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}
.price-input {
  width: 150px;
  &::-webkit-inner-spin-button {
    margin-left: 5px;
  }
}
</style>
