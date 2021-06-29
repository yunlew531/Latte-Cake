<template>
  <section
    class="offcanvas offcanvas-end"
    tabindex="-1"
    ref="cartCanvasDom"
    id="cartCanvas"
    data-bs-backdrop="true"
    data-bs-scroll="false"
    aria-labelledby="cartCanvasLabel"
  >
    <div class="offcanvas-header">
      <h4 id="cartCanvasLabel">購物車</h4>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="px-4 m-0 d-flex align-items-center">
      <span class="me-auto">{{ cartsData.carts?.length }} 個品項</span>
      <a
        href="javascript:;"
        class="check-out-btn btn btn-danger"
        @click="goToPage('checkout')"
        >立刻結帳!</a
      >
    </div>
    <div class="px-4 py-3 border-bottom">
      <div
        class="progress"
        :class="{ active: isProgressAniPlay }"
        v-show="isProgressAniPlay"
      >
        <div class="progress-bar" role="progressbar"></div>
      </div>
    </div>
    <ul class="offcanvas-body list-unstyled mb-0">
      <li
        class="product-item border border-black-300 mb-3"
        v-for="product in cartsData.carts"
        :key="product.id"
      >
        <a
          href="javascript:;"
          class="text-decoration-none text-reset"
          @click="goToPage('product', product.product.id)"
        >
          <div class="d-flex">
            <div
              class="product-img"
              :style="{
                'background-image': `url(${product.product.imageUrl})`,
              }"
            ></div>
            <div class="p-3 flex-grow-1">
              <h3 class="fs-6">{{ product.product.title }}</h3>
              <div class="d-flex">
                <span class="flex-grow-1">
                  NT$ {{ product.product.price?.toLocaleString() }}
                </span>
                <span>x {{ product.qty }} 個</span>
              </div>
              <div class="d-flex">
                <span class="ms-auto"
                  >NT$
                  {{ (product.qty * product.product.price)?.toLocaleString() }}
                  元</span
                >
              </div>
              <div class="d-flex align-items-center mt-1">
                <div
                  class="d-flex align-items-center position-relative me-auto"
                >
                  <span
                    class="qty-btn material-icons"
                    @click.stop="handQty(product, -1)"
                  >
                    remove
                  </span>
                  <span
                    class="
                      text-black-100
                      d-block
                      border border-black-300
                      rounded
                      px-5
                    "
                    >{{ product.qty }}</span
                  >
                  <span
                    class="qty-btn material-icons"
                    @click.stop="handQty(product, 1)"
                  >
                    add
                  </span>
                </div>
                <button
                  type="button"
                  class="btn btn-danger py-2px"
                  @click.stop="removeCart(product.id)"
                >
                  移除
                </button>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <div class="d-flex align-items-center border-top px-4 py-4">
      <button type="button" class="btn btn-outline-danger" @click="goToCart">
        購物車詳細
      </button>
      <span class="fs-5 ms-auto"
        >總金額 NT$ {{ cartsData.total?.toLocaleString() }} 元</span
      >
    </div>
  </section>
</template>

<script>
import { ref, inject, toRefs, onMounted, onUnmounted } from 'vue';
import Offcanvas from 'bootstrap/js/dist/offcanvas';
import { apiPutCartQty, apiDeleteCart } from '@/api';
import { useRouter } from 'vue-router';
import store from '@/composition/store';
import { useToast } from '@/methods';

const { getCarts, setIsLoading } = store;

export default {
  setup() {
    const router = useRouter();
    const $emitter = inject('$emitter');
    const state = inject('state');
    const cartCanvasDom = ref(null);
    const isProgressAniPlay = ref(false);
    let cartCanvas = null;
    let progressAniTimeOut = null;

    const showCartCanvas = (playAni) => {
      if (isProgressAniPlay.value) {
        clearTimeout(progressAniTimeOut);
        isProgressAniPlay.value = false;
      } else if (playAni) {
        isProgressAniPlay.value = true;
        progressAniTimeOut = setTimeout(() => {
          isProgressAniPlay.value = false;
          cartCanvas.hide();
        }, 8000);
      }
      cartCanvas.show();
    };

    const hideCartCanvas = () => {
      cartCanvas.hide();
    };

    const goToPage = (page, id) => {
      if (page === 'product') router.push({ path: `/${page}/${id}` });
      else router.push({ path: `/${page}` });
      cartCanvas.hide();
    };

    const goToCart = () => {
      router.push({ path: '/cart' });
      cartCanvas.hide();
    };

    const handQty = async (item, num) => {
      const product = { ...item };
      product.qty = item.qty + num <= 1 ? 1 : item.qty + num;
      if (product.qty === item.qty) return;
      setIsLoading(true);
      try {
        const { data } = await apiPutCartQty(product);
        if (data.success) {
          setIsLoading(false);
          getCarts();
          useToast('成功更新數量!', 'success');
        } else useToast('操作失敗!', 'danger');
      } catch (err) {
        setIsLoading(false);
        console.dir(err);
      }
    };

    const removeCart = async (id) => {
      setIsLoading(true);
      try {
        const { data } = await apiDeleteCart(id);
        if (data.success) {
          setIsLoading(false);
          getCarts();
          useToast('成功移除商品!', 'success');
        } else useToast('發生錯誤!', 'danger');
      } catch (err) {
        setIsLoading(false);
        console.dir(err);
      }
    };

    onMounted(() => {
      cartCanvas = new Offcanvas(cartCanvasDom.value);
      $emitter.on('showCartCanvas', showCartCanvas); // Product.vue / Navbar.vue
      $emitter.on('hideCartCanvas', hideCartCanvas);
    });

    onUnmounted(() => {
      $emitter.off('showCartCanvas', showCartCanvas);
      $emitter.off('hideCartCanvas', hideCartCanvas);
    });

    return {
      ...toRefs(state),
      cartCanvasDom,
      goToPage,
      goToCart,
      handQty,
      removeCart,
      isProgressAniPlay,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/custom/variables';

.check-out-btn {
  color: $white;
  &:hover {
    color: $primary;
    background: $white;
  }
}

.progress {
  height: 6px;
  &.active {
    .progress-bar {
      animation: progress-ani 8s forwards linear;
    }
  }
}

.progress-bar {
  background: $danger;
  width: 100%;
}

@keyframes progress-ani {
  0% {
    width: 0;
  }
  55% {
    opacity: 1;
  }
  62% {
    opacity: 0;
  }
  69% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  81% {
    opacity: 1;
  }
  86% {
    opacity: 0;
  }
  91% {
    opacity: 1;
  }
  96% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    width: 100%;
  }
}

.qty-btn {
  color: $black-100;
  &:hover {
    color: $danger;
  }
}

.product-item {
  &:hover {
    box-shadow: $box-shadow;
  }
}
.product-img {
  width: 133px;
  background: center no-repeat;
  background-size: cover;
}
</style>
