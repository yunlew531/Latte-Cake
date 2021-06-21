<template>
  <Navbar class="transparent-nav">
    <template #content>
      <div class="text-white position-absolute start-25 top-50 ps-50">
        <h3 class="category-title fs-1 fw-bold mt-25">
          {{ productData.product?.title }}
        </h3>
      </div>
    </template>
  </Navbar>
  <main>
    <section class="nav-bg"></section>
    <section class="container py-38">
      <div class="row gx-12">
        <ul class="col-6 list-unstyled mb-0">
          <li
            class="product-img rounded"
            :style="{
              'background-image': `url(${productData.product?.imageUrl})`,
            }"
          ></li>
          <li class="product-img rounded"></li>
          <li class="product-img rounded"></li>
        </ul>
        <div class="col-6">
          <div class="position-sticky top-25">
            <div class="d-flex justify-content-between pt-1">
              <h2 class="fw-bold lh-1">{{ productData.product?.title }}</h2>
              <div class="d-flex">
                <p
                  class="
                    fs-7
                    align-self-start
                    d-flex
                    align-items-center
                    text-primary
                    border border-primary
                    px-1
                    mb-0
                  "
                >
                  <span class="material-icons ms-2px">
                    local_fire_department
                  </span>
                  <span class="ms-1">熱銷商品</span>
                </p>
                <p
                  class="
                    fs-7
                    align-self-start
                    d-flex
                    align-items-center
                    text-success
                    border border-success
                    px-1
                    ms-1
                    mb-0
                  "
                >
                  <span class="material-icons ms-2px"> local_shipping </span>
                  <span class="ms-1">免運費</span>
                </p>
              </div>
            </div>
            <h4 class="fs-6 text-black-300">蘋果、白酒</h4>
            <p class="fs-6 mb-0 lh-1 pt-2">
              <span
                class="
                  text-black-200 text-decoration-line-through
                  d-inline-block
                  w-50
                "
                >NT${{ productData.product?.origin_price }}</span
              >
              <span class="fs-5 text-primary d-inline-block w-50"
                >NT${{ productData.product?.price }}</span
              >
            </p>
            <hr class="text-black-300" />
            <p class="text-black-200 py-5">
              {{ productData.product?.description }}
            </p>
            <div
              class="bg-white border border-gray-300 shadow-inset rounded p-12"
            >
              <div class="d-flex align-items-center">
                <span class="fs-6 text-black-200">購買數量</span>
                <div class="position-relative">
                  <span
                    class="
                      d-inline-block
                      text-center
                      quantity-text
                      rounded
                      border border-black-300
                      fs-5
                      ms-12
                      pe-6
                      mb-1px
                    "
                    >{{ productNum }}</span
                  >
                  <button
                    class="
                      quntity-btn
                      h-50
                      border-1 border-black-300
                      position-absolute
                      end-0
                      top-0
                      p-0
                    "
                    @click="productNum++"
                  >
                    <span class="material-icons"> arrow_drop_up </span>
                  </button>
                  <button
                    class="
                      quntity-btn
                      h-50
                      border-1 border-black-300
                      position-absolute
                      top-50
                      end-0
                      p-0
                      mt-n1px
                    "
                    @click="productNum = productNum <= 1 ? 1 : productNum - 1"
                  >
                    <span class="material-icons border-0">
                      arrow_drop_down
                    </span>
                  </button>
                </div>
              </div>
              <button
                class="
                  add-cart-btn
                  fs-5
                  tracking-2
                  btn btn-danger
                  border-danger
                  rounded-lg
                  w-100
                  py-5
                  mt-8
                "
                @click="addCart"
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <SubFooter />
  <Footer />
</template>

<script>
import { inject, ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import SubFooter from '@/components/SubFooter.vue';
import Footer from '@/components/Footer.vue';
import { useRoute } from 'vue-router';
import { apiPostAddCart, apiGetProductInfo } from '@/api';

export default {
  name: 'Product',
  components: { Navbar, SubFooter, Footer },
  setup() {
    const $emitter = inject('$emitter');
    const route = useRoute();
    const { productData } = apiGetProductInfo(route.params.id);
    const productNum = ref(1);

    const addCart = async () => {
      const { id } = productData.value.product;
      const { data } = await apiPostAddCart(id, productNum.value);
      if (data.success) {
        $emitter.emit('showCartCanvas');
        productNum.value = 1;
      }
    };

    return { productNum, productData, addCart };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/scss/custom/variables';

.transparent-nav {
  height: 500px;
}
.nav-bg {
  height: 500px;
  background: url(~@/assets/images/photo-1489533119213-66a5cd877091.jpg) center;
  background-size: cover;
}
.product-img {
  height: 500px;
  background: url(https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1156&q=80)
    center no-repeat;
  margin-bottom: $spacer * 1.25;
  background-size: cover;
  &:last-child {
    margin-bottom: 0;
  }
}
.quantity-text {
  width: 120px;
  height: 45px;
  line-height: 45px;
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}
.quntity-btn {
  width: 25px;
  color: $danger;
  transition: 0.1s;
  background: $white;
  &:first-of-type {
    border-radius: 0 4px 0 0;
  }
  &:last-of-type {
    border-radius: 0 0 4px 0;
  }
  &:hover {
    color: $white;
    background: $danger;
  }
  &:active {
    background: shade-color($danger, 10%);
  }
}
.add-cart-btn {
  &:hover {
    color: $danger;
    background: $white-100;
  }
}
</style>
