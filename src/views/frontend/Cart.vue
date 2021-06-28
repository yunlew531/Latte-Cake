<template>
  <Navbar class="navbar position-relative">
    <template #content>
      <h3
        class="
          fs-1
          fw-bold
          text-white
          position-absolute
          start-50
          bottom-25
          translate-middle-x
        "
      >
        購物車
      </h3>
    </template>
  </Navbar>
  <main>
    <section class="navbar-bg"></section>
    <section class="container py-25">
      <div class="row g-8">
        <div class="col-lg-8">
          <div class="rounded shadow bg-white p-8">
            <span v-if="cartsData.carts?.length !== 0" class="fs-4"
              >{{ cartsData.carts?.length }} 件商品</span
            >
            <div
              v-else
              class="d-flex justify-content-center align-content-center"
            >
              <router-link to="/products" class="btn btn-primary">
                立即前往購物
              </router-link>
            </div>
            <ul class="list-unstyled">
              <li
                class="product-item py-8"
                v-for="product in cartsData.carts"
                :key="product.id"
              >
                <div class="d-flex justify-content-between pb-2">
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
                        ms-2
                        mb-0
                      "
                    >
                      <span class="material-icons ms-2px">
                        local_shipping
                      </span>
                      <span class="ms-1">免運費</span>
                    </p>
                  </div>
                  <span
                    >單價 NT$
                    {{ product.product.price?.toLocaleString() }} 元</span
                  >
                </div>
                <div class="d-flex">
                  <div
                    class="product-img"
                    :style="{
                      'background-image': `url(${product.product.imageUrl})`,
                    }"
                  ></div>
                  <div
                    class="
                      d-flex
                      flex-column
                      justify-content-between
                      ps-5
                      flex-grow-1
                    "
                  >
                    <div class="d-flex">
                      <div class="flex-grow-1 flex-shrink-1">
                        <h2 class="fs-3">
                          <router-link
                            :to="`/product/${product.product.id}`"
                            class="text-decoration-none"
                            >{{ product.product.title }}</router-link
                          >
                        </h2>
                        <h4 class="fs-7 text-black-300">
                          {{ product.product.category }}
                        </h4>
                      </div>

                      <div
                        class="
                          align-self-start
                          d-flex
                          align-items-center
                          flex-shrink-0
                        "
                      >
                        <span class="fs-6 text-black-200">購買數量</span>
                        <div class="position-relative">
                          <span
                            class="
                              d-block
                              text-center
                              quantity-text
                              rounded
                              border border-black-300
                              fs-5
                              ms-5
                              pe-6
                              mb-1px
                            "
                            >{{ product.qty }}</span
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
                            @click.stop="handQty(product, 1)"
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
                            @click.stop="handQty(product, -1)"
                          >
                            <span class="material-icons border-0">
                              arrow_drop_down
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <p class="text-black-200">
                      {{ product.product.content }}
                    </p>
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center flex-grow-1">
                        <button
                          class="
                            product-remove-btn
                            border-0
                            bg-transparent
                            d-flex
                            align-items-center
                          "
                          type="button"
                          @click="removeCart(product)"
                        >
                          <span class="text-danger material-icons">
                            delete
                          </span>
                          <span class="ms-1">移除物品</span>
                        </button>
                        <button
                          class="
                            product-remove-btn
                            border-0
                            bg-transparent
                            d-flex
                            align-items-center
                            ms-3
                          "
                          type="button"
                        >
                          <span class="material-icons heart-border">
                            favorite_border
                          </span>
                          <span class="material-icons heart-solid">
                            favorite
                          </span>
                          <span class="btn-text ms-1">移動到想要清單</span>
                        </button>
                      </div>
                      <span class="fs-4"
                        >NT$ {{ product.total?.toLocaleString() }} 元</span
                      >
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="rounded shadow bg-white p-8 mt-8">
            <p class="d-flex">
              <span class="fs-4 flex-lg-grow-1">預計到貨日</span
              ><span class="fs-3">{{ deliveryTime }}</span>
            </p>
            <p class="fw-light">
              (下定後預計兩日到貨，如下標時間超過下午5點則再順延一日)
            </p>
          </div>
        </div>
        <div class="col-4">
          <div class="position-sticky top-20">
            <div class="rounded shadow bg-white p-8">
              <p class="fs-4">總金額</p>
              <p class="d-flex text-black-400">
                <span class="flex-grow-1">金額</span
                ><span>NT$ {{ cartsData.total?.toLocaleString() }} 元</span>
              </p>
              <p class="d-flex text-black-400">
                <span class="flex-grow-1">運費</span><span>NT$ 100 元</span>
              </p>
              <router-link
                to="/checkout"
                class="checkout-btn fs-5 btn w-100 py-3"
                >結帳</router-link
              >
            </div>
            <div class="rounded shadow bg-white p-8 mt-8">
              <h4 class="fs-4">輸入優惠折扣碼</h4>
              <div class="d-flex">
                <input type="text" class="flex-grow-1" />
                <button type="button" class="btn coupon-btn px-5 ms-2">
                  送出
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</template>

<script>
import { ref, inject, toRefs, watch, computed } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { useToast } from '@/methods';
import { apiPutCartQty, apiDeleteCart } from '@/api';
import store from '@/composition/store';

const { getCarts } = store;

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const state = inject('state');
    const productNum = ref(1);

    getCarts();

    const handQty = async (item, num) => {
      const product = { ...item };
      product.qty = item.qty + num <= 1 ? 1 : item.qty + num;
      if (product.qty === item.qty) return;
      try {
        const { data } = await apiPutCartQty(product);
        if (data.success) {
          getCarts();
          useToast('成功更新數量!', 'success');
        } else useToast('操作失敗!', 'danger');
      } catch (err) {
        console.dir(err);
      }
    };

    const removeCart = async (product) => {
      try {
        const { data } = await apiDeleteCart(product.id);
        if (data.success) {
          getCarts();
          useToast('成功移除商品!', 'success');
        } else {
          useToast('操作失敗!', 'danger');
        }
        console.log(data);
      } catch (err) {
        console.dir(err);
      }
    };

    const deliveryTime = computed(() => {
      const dayTranslate = ['日', '一', '二', '三', '四', '五', '六'];
      const date = new Date();
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const day = date.getDay();
      const hour = date.getHours();
      const deliveryD = hour >= 17 ? d + 3 : d + 2;
      let deliveryDay = hour >= 17 ? day + 3 : day + 2;
      if (deliveryDay === 7) deliveryDay = 0;
      else if (deliveryDay === 8) deliveryDay = 1;
      else if (deliveryDay === 9) deliveryDay = 2;
      const time = `${y} / ${m} / ${deliveryD} 星期${dayTranslate[deliveryDay]}`;
      return time;
    });

    watch(
      state,
      () => {
        console.log(state.cartsData);
      },
      { deep: true }
    );

    return {
      ...toRefs(state),
      productNum,
      deliveryTime,
      removeCart,
      handQty,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/custom/variables';

.navbar {
  height: 500px;
}
.navbar-bg {
  height: 500px;
  background: url(~@/assets/images/bg-banner.jpg) no-repeat center;
  background-size: cover;
}
.product-item {
  border-bottom: 1px solid $secondary;
  &:last-of-type {
    border-bottom: 0;
  }
}
.product-img {
  width: 200px;
  min-height: 200px;
  flex-shrink: 0;
  background: no-repeat center;
  background-size: cover;
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
.product-remove-btn {
  color: $black-200;
  .heart-border,
  .heart-solid {
    color: $danger;
  }
  .heart-solid {
    display: none;
  }

  &:hover {
    color: $danger;
    .heart-border {
      display: none;
    }
    .heart-solid {
      display: block;
    }
  }
}
.checkout-btn {
  background: $primary;
  color: white;
  &:hover {
    background: $white-100;
    border: 1px solid $primary;
    color: $primary;
  }
}
.coupon-btn {
  border: 1px solid $black-200;
  color: $primary;
  &:hover {
    color: $white;
    background: $primary;
  }
}
</style>
