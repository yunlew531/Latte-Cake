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
      <span class="me-auto"
        >{{ cartsData.cartsData.carts?.length }} 個品項</span
      >
      <a href="#" class="check-out-btn btn btn-danger">手刀結帳!</a>
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
        v-for="product in cartsData.cartsData.carts"
        :key="product.id"
      >
        <a
          href="javascript:;"
          class="text-decoration-none text-reset"
          @click="goToPage(product.product.id)"
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
                    @click.stop="minusQty(product)"
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
                    @click.stop="addQty(product)"
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
      <button type="button" class="btn btn-outline-danger">購物車詳細</button>
      <span class="fs-5 ms-auto"
        >總計 NT$ {{ cartsData.cartsData.total?.toLocaleString() }} 元</span
      >
    </div>
  </section>
</template>

<script>
import { onMounted, ref, inject, reactive, toRefs } from 'vue';
import Offcanvas from 'bootstrap/js/dist/offcanvas';
import { apiGetCarts, apiPutCartQty, apiDeleteCart } from '@/api';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const $emitter = inject('$emitter');
    const cartCanvasDom = ref(null);
    const cartCanvas = ref(null);
    const isProgressAniPlay = ref(false);
    const cartsData = reactive({ cartsData: {} });
    let progressAniTimeOut = null;

    const showCartCanvas = (playAni) => {
      if (isProgressAniPlay.value === true) {
        clearTimeout(progressAniTimeOut);
        isProgressAniPlay.value = false;
      }
      if (playAni) {
        isProgressAniPlay.value = true;
        progressAniTimeOut = setTimeout(() => {
          isProgressAniPlay.value = false;
          cartCanvas.value.hide();
        }, 10000);
      }
      const { cartsData: newData, cartsQty } = apiGetCarts();
      const { cartsData: data } = toRefs(newData);
      cartsData.cartsData = data;
      $emitter.emit('updateCartsQty', cartsQty);
      cartCanvas.value.show();
    };

    const hideCartCanvas = () => {
      cartCanvas.value.hide();
    };

    const goToPage = (id) => {
      router.push({ path: `/product/${id}` });
      cartCanvas.value.hide();
    };

    const addQty = async (item) => {
      const originQty = item.qty;
      const product = item;
      product.qty += 1;
      const { data } = await apiPutCartQty(product);
      if (data.success) {
        showCartCanvas();
      } else {
        product.qty = originQty;
      }
    };

    const minusQty = async (item) => {
      const originQty = item.qty;
      const product = item;
      if (product.qty === 1) return;
      product.qty -= 1;
      const { data } = await apiPutCartQty(product);
      if (data.success) {
        showCartCanvas();
      } else {
        product.qty = originQty;
      }
    };

    const removeCart = async (id) => {
      const { data } = await apiDeleteCart(id);
      if (data.success) {
        const { cartsData: newData, cartsQty } = apiGetCarts();
        const { cartsData: data1 } = toRefs(newData);
        cartsData.cartsData = data1;
        $emitter.emit('updateCartsQty', cartsQty);
        $emitter.emit('updateCarts', cartsData);
      }
    };

    onMounted(() => {
      cartCanvas.value = new Offcanvas(cartCanvasDom.value);
      $emitter.on('showCartCanvas', showCartCanvas);
      $emitter.on('hideCartCanvas', hideCartCanvas);
    });

    return {
      cartCanvasDom,
      cartsData,
      goToPage,
      addQty,
      minusQty,
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
      animation: progress-ani 10s forwards linear;
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
  50% {
    opacity: 1;
  }
  55% {
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
  65% {
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
  85% {
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
  95% {
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

.offcanvas-footer {
}
</style>
