<template>
  <section
    class="offcanvas offcanvas-end"
    tabindex="-1"
    ref="cartCanvasDom"
    id="cartCanvas"
    data-bs-backdrop="false"
    data-bs-scroll="true"
    aria-labelledby="cartCanvasLabel"
    @click="playProgressAnime = false"
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
      <span class="me-auto">{{ carts.carts?.length }} 個品項</span>
      <Button class="py-1" @click="goToPage('cart')"> 詳細購物車 </Button>
    </div>
    <div class="px-4 py-3 border-bottom">
      <div class="progress" :class="{ active: playProgressAnime }" v-show="playProgressAnime">
        <div class="progress-bar" role="progressbar"></div>
      </div>
    </div>
    <ul class="offcanvas-body list-unstyled mb-0">
      <li
        class="product-item border border-black-300 mb-3"
        v-for="product in carts.carts"
        :key="product.id"
      >
        <div>
          <div class="d-flex">
            <div
              class="product-img"
              :style="{
                'background-image': `url(${product.product.imageUrl ||
                  product.product.imagesUrl[0]})`,
              }"
            ></div>
            <div class="p-3 flex-grow-1">
              <h3 class="product-title fs-6" @click="goToPage('product', product.product.id)">
                {{ product.product.title }}
              </h3>
              <div class="d-flex">
                <span class="flex-grow-1"> NT$ {{ product.product.price?.toLocaleString() }} </span>
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
                <div class="d-flex align-items-center position-relative me-auto">
                  <span class="qty-btn material-icons" @click="handQty(product, -1)">
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
                  <span class="qty-btn material-icons" @click="handQty(product, 1)">
                    add
                  </span>
                </div>
                <Button class="py-2px" @click="removeCart(product.id)">
                  移除
                </Button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="d-flex align-items-center border-top px-4 py-4">
      <span class="fs-5 ms-auto">總金額 NT$ {{ carts.total?.toLocaleString() }} 元</span>
    </div>
  </section>
</template>

<script>
import {
  ref, reactive, inject, toRefs, watch, onMounted, onUnmounted,
} from 'vue';
import Offcanvas from 'bootstrap/js/dist/offcanvas';
import { apiPutCartQty, apiDeleteCart } from '@/api';
import { useRouter } from 'vue-router';
import store from '@/composition/store';
import { useToast } from '@/methods';
import Button from '@/components/frontend/Button.vue';

const { getCarts, setIsLoading } = store;

export default {
  name: 'CartCanvas',
  components: {
    Button,
  },
  setup() {
    const state = inject('state');
    const { cartsData } = toRefs(state);
    const $emitter = inject('$emitter');
    const router = useRouter();

    const carts = reactive({ carts: [] });
    watch(cartsData, (data) => {
      carts.carts = data;
    });

    let cartCanvas = null;
    const hideCartCanvas = () => {
      cartCanvas.hide();
    };

    let progressAnimeTimeout = null;
    const playProgressAnime = ref(false);
    const showCartCanvas = (playAnime = false) => {
      if (playProgressAnime.value) {
        clearTimeout(progressAnimeTimeout);
        playProgressAnime.value = false;
      } else if (playAnime) {
        playProgressAnime.value = true;
        progressAnimeTimeout = setTimeout(() => {
          if (playProgressAnime.value === false) return;
          playProgressAnime.value = false;
          hideCartCanvas();
        }, 8000);
      }
      cartCanvas.show();
    };

    const goToPage = (page, id) => {
      if (page === 'product') router.push(`/${page}/${id}`);
      else router.push(`/${page}`);
      cartCanvas.hide();
    };

    const goToCart = () => {
      router.push('/cart');
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
          await getCarts();
          useToast('成功更新數量!', 'success');
        } else useToast('操作失敗!', 'danger');
      } catch (err) {
        console.dir(err);
      }
      setIsLoading(false);
    };

    const removeCart = async (productId) => {
      setIsLoading(true);
      try {
        const { data } = await apiDeleteCart(productId);
        if (data.success) {
          await getCarts();
          useToast('成功移除商品!', 'success');
        } else {
          useToast('操作失敗!', 'danger');
        }
      } catch (err) {
        console.dir(err);
      }
      setIsLoading(false);
    };

    const init = () => {
      $emitter.on('showCartCanvas', showCartCanvas);
      $emitter.on('hideCartCanvas', hideCartCanvas);
    };
    init();

    const cartCanvasDom = ref(null);
    onMounted(() => {
      cartCanvas = new Offcanvas(cartCanvasDom.value);
    });
    onUnmounted(() => {
      $emitter.off('showCartCanvas', showCartCanvas);
      $emitter.off('hideCartCanvas', hideCartCanvas);
    });

    return {
      ...toRefs(carts),
      cartCanvasDom,
      playProgressAnime,
      showCartCanvas,
      goToPage,
      goToCart,
      handQty,
      removeCart,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

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

.product-title {
  color: $primary;
  cursor: pointer;
  &:hover {
    color: shade-color($primary, 10%);
  }
}

.product-img {
  width: 133px;
  background: center no-repeat;
  background-size: cover;
}
</style>
