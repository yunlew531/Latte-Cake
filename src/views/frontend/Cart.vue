<template>
  <section class="navbar-bg"></section>
  <section class="container cart-panel mb-12">
    <div class="row g-8">
      <div class="col-lg-8">
        <div class="rounded shadow-sm bg-white p-8">
          <div v-if="cartsData.carts?.length !== 0" class="d-flex align-items-center">
            <span class="fs-4 me-auto">{{ cartsData.carts?.length }} 件商品</span>
            <Button @click="removeAllCarts" class="remove-all-products-btn">移除所有商品 </Button>
          </div>
          <div v-else class="d-flex justify-content-center align-content-center">
            <router-link to="/products">
              <Button class="px-5 py-2">立即前往購物 </Button>
            </router-link>
          </div>
          <ul class="list-unstyled">
            <li class="product-item py-8" v-for="product in cartsData.carts" :key="product.id">
              <div class="d-flex flex-wrap justify-content-between pb-2">
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
                    v-if="product.product.freeDelivery"
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
                    <span class="material-icons ms-2px"> local_shipping </span>
                    <span class="ms-1">免運費</span>
                  </p>
                </div>
                <span class="pt-2 pt-sm-0"
                  >單價 NT$ {{ product.product.price?.toLocaleString() }} 元</span
                >
              </div>
              <div class="d-flex flex-wrap flex-sm-nowrap">
                <div
                  class="product-img"
                  :style="{
                    'background-image': `url(${product.product.imageUrl ||
                      product.product.imagesUrl[0]})`,
                  }"
                ></div>
                <div
                  class="
                    d-flex
                    flex-column
                    justify-content-between
                    mt-5 mt-sm-0
                    ps-sm-5
                    flex-grow-1
                  "
                >
                  <div class="d-flex flex-wrap">
                    <div class="flex-grow-1 flex-shrink-1">
                      <h2 class="fs-3 mb-2px">
                        <router-link
                          :to="`/product/${product.product.id}`"
                          class="text-decoration-none text-nowrap"
                          >{{ product.product.title }}</router-link
                        >
                      </h2>
                      <h4 class="fs-7 text-black-300">
                        {{ product.product.description }}
                      </h4>
                      <h4 class="fs-7 text-black-200">
                        分類:
                        <a href="javascript:;" @click="searchCategory(product.product.category)">
                          {{ product.product.category }}
                        </a>
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
                      <span class="fs-6 text-black-200 py-5 py-md-0">購買數量</span>
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
                  <p class="text-wrap tracking-2 text-black-200">
                    {{ product.product.content }}
                  </p>
                  <div class="d-flex flex-wrap align-items-center">
                    <div class="d-flex flex-wrap align-items-center flex-grow-1">
                      <button
                        class="
                          product-remove-btn
                          border-0
                          bg-transparent
                          d-flex
                          align-items-center
                          p-0
                        "
                        type="button"
                        @click="removeCart(product)"
                      >
                        <span class="text-danger material-icons"> delete </span>
                        <span class="ms-1">移除商品</span>
                      </button>
                      <button
                        class="
                          product-remove-btn
                          border-0
                          bg-transparent
                          d-flex
                          align-items-center
                          p-0
                          mt-1 mt-sm-0
                          ms-md-3
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
                    <span class="fs-4">NT$ {{ product.total?.toLocaleString() }} 元</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="rounded shadow-sm bg-white p-8 mt-8">
          <p class="d-flex">
            <span class="fs-4 flex-lg-grow-1">預計到貨日</span
            ><span class="fs-3">{{ deliveryTime }}</span>
          </p>
          <p class="fw-light">
            (下定後預計兩日到貨，如下標時間超過下午5點則再順延一日)
          </p>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="total-price-panel position-sticky">
          <div class="rounded shadow-sm bg-white p-8">
            <p class="fs-4">總金額</p>
            <p class="d-flex text-black-400">
              <span class="flex-grow-1">金額</span
              ><span>NT$ {{ cartsData.total?.toLocaleString() }} 元</span>
            </p>
            <p class="d-flex text-black-400">
              <span class="flex-grow-1">運費</span><span>NT$ 100 元</span>
            </p>
            <router-link v-if="cartsData.carts?.length" to="/checkout" class="d-inline-block w-100"
              ><Button class="fs-5 w-100 py-3">結帳 </Button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  ref, inject, toRefs, computed,
} from 'vue';
import { useRouter } from 'vue-router';
import Button from '@/components/frontend/Button.vue';
import { useToast } from '@/methods';
import { apiPutCartQty, apiDeleteCart, apiDeleteAllCarts } from '@/api';
import store from '@/composition/store';

const { getCarts, setIsLoading } = store;

export default {
  name: 'Cart',
  components: {
    Button,
  },
  setup() {
    const router = useRouter();
    const state = inject('state');
    const productNum = ref(1);

    getCarts();

    const handQty = async (item, num) => {
      const product = { ...item };
      product.qty = item.qty + num <= 1 ? 1 : item.qty + num;
      if (product.qty === item.qty) return;
      setIsLoading(true);
      try {
        const { data } = await apiPutCartQty(product);
        if (data.success) {
          await getCarts();
          useToast('成功更新數量!');
        } else useToast('操作失敗!', 'danger');
      } catch (err) {
        console.dir(err);
      }
      setIsLoading(false);
    };

    const removeCart = async (product) => {
      setIsLoading(true);
      try {
        const { data } = await apiDeleteCart(product.id);
        if (data.success) {
          await getCarts();
          useToast('成功移除商品!');
        } else {
          useToast('操作失敗!', 'danger');
        }
      } catch (err) {
        console.dir(err);
      }
      setIsLoading(false);
    };

    const removeAllCarts = async () => {
      setIsLoading(false);
      try {
        const { data } = await apiDeleteAllCarts();
        if (data.success) {
          await getCarts();
          useToast('成功移除!');
        } else useToast('操作失敗!', 'danger');
      } catch (err) {
        console.dir(err);
      }
      setIsLoading(false);
    };

    const searchCategory = (category) => {
      router.push({ name: 'Products', params: { category } });
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

    return {
      ...toRefs(state),
      productNum,
      deliveryTime,
      removeCart,
      removeAllCarts,
      handQty,
      searchCategory,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styleSheets/views/frontend/Cart';
</style>
