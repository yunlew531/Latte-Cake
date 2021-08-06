<template>
  <div class="nav-bg" />
  <section
    class="product-panel bg-white rounded shadow-sm container p-5 p-sm-10"
    :class="{ active: !isProductLoading }"
  >
    <div class="row gx-12">
      <ul class="product-img-list col-lg-6 list-unstyled order-2 order-lg-1 mb-0">
        <li
          v-if="product.imageUrl"
          class="product-img rounded"
          :style="{
            'background-image': `url(${product.imageUrl})`,
          }"
          @click="showLightbox(0)"
        />
        <li
          v-for="(img, key) in product.imagesUrl"
          :key="img + key"
          :style="{
            'background-image': `url(${img})`,
          }"
          class="product-img rounded"
          @click="showLightbox(product.imageUrl ? key + 1 : key)"
        />
      </ul>
      <div class="col-lg-6 order-1 order-lg-2">
        <div class="product-content position-sticky">
          <div class="d-flex flex-wrap justify-content-between pt-1">
            <h2 class="fw-bold lh-1 overflow-hidden order-2 order-sm-1">
              <span class="product-title d-block">{{ product.title }}</span>
            </h2>
            <div class="d-flex order-1 order-sm-2 pb-5 pb-sm-0">
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
                v-if="product.freeDelivery"
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
          </div>
          <h4 class="fs-6 text-black-300 overflow-hidden">
            <span class="product-material d-block">
              {{ product.description }}
            </span>
          </h4>
          <p class="fs-6 mb-0 lh-1 pt-2">
            <span
              class="
                text-black-200 text-decoration-line-through
                d-inline-block
                w-50
              "
              >NT${{ product.origin_price?.toLocaleString() }}</span
            >
            <span class="fs-5 text-primary d-inline-block w-50"
              >NT${{ product.price?.toLocaleString() }}</span
            >
          </p>
          <hr class="text-black-300" />
          <p class="text-wrap lh-lg fs-5 fw-light text-black-100 py-5">
            {{ product.content }}
          </p>
          <div
            class="
              bg-white
              border border-gray-300
              shadow-inset
              rounded
              p-5 p-sm-12
            "
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
                  type="button"
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
                  type="button"
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
                  <span class="material-icons border-0"> arrow_drop_down </span>
                </button>
              </div>
            </div>
            <Button
              bgColor="danger"
              class="fs-5 w-100 py-5 mt-8"
              :class="{ active: isProductLoading }"
              @click="addCart"
              >加入購物車
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <VueEasyLightbox
    moveDisabled
    :visible="isLightboxShow"
    :imgs="lightboxImgs"
    :index="lightboxIndex"
    @hide="hideLightbox"
  />
</template>

<script>
import {
  ref, watch, inject, onUnmounted,
} from 'vue';
import { useRoute } from 'vue-router';
import { apiPostAddCart, apiGetProductInfo } from '@/api';
import store from '@/composition/store';
import { useToast } from '@/methods';
import VueEasyLightbox from 'vue-easy-lightbox';
import Button from '@/components/frontend/Button.vue';

const { getCarts, setIsLoading } = store;

export default {
  name: 'Product',
  components: {
    VueEasyLightbox,
    Button,
  },
  setup() {
    const route = useRoute();
    const $emitter = inject('$emitter');

    const productId = route.params.id;
    const { product, lightboxImgs, isProductLoading } = apiGetProductInfo(productId);

    const lightboxIndex = ref(0);
    const isLightboxShow = ref(false);
    const showLightbox = (idx) => {
      lightboxIndex.value = idx;
      isLightboxShow.value = true;
    };

    const hideLightbox = () => {
      isLightboxShow.value = false;
    };

    const productNum = ref(1);
    const addCart = async () => {
      setIsLoading(true);
      const { id } = product.value;
      try {
        const { data } = await apiPostAddCart(id, productNum.value);
        if (data.success) {
          await getCarts();
          $emitter.emit('showCartCanvas', true);
          useToast('成功加入購物車!');
          productNum.value = 1;
        } else useToast('操作失敗!', 'danger');
      } catch (err) {
        console.dir(err);
      }
      setIsLoading(false);
    };

    watch(
      () => route.params.id,
      (id) => {
        if (route.name === 'Product') {
          product.value = {};
          apiGetProductInfo(id);
        }
      },
    );
    onUnmounted(() => {
      product.value = {};
    });

    return {
      product,
      lightboxImgs,
      isLightboxShow,
      lightboxIndex,
      productNum,
      isProductLoading,
      showLightbox,
      hideLightbox,
      addCart,
    };
  },
};
</script>

<style lang="scss">
.vel-toolbar {
  display: none;
}
</style>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';
@import '~bootstrap/scss/mixins';

.product-panel {
  transform: translateY(-50px);
  .product-img {
    height: 500px;
    background: center no-repeat;
    margin-bottom: $spacer * 1.25;
    background-size: cover;
    transform: scale(0);
    cursor: zoom-in;
    &:last-child {
      margin-bottom: 0;
    }
  }
  @include media-breakpoint-down(lg) {
    .product-img-list {
      display: flex;
      flex-wrap: wrap;
      padding-top: 20px;
      padding-right: 2%;
    }
    .product-img {
      width: 31.33333%;
      height: 200px;
      margin-right: 2%;
    }
  }
  @include media-breakpoint-down(md) {
    .product-img {
      width: 48%;
      margin-right: 2%;
    }
  }
  .product-title,
  .product-material {
    transform: translateY(100%);
  }
  &.active {
    .product-img {
      animation: scale-ani 0.5s forwards;
    }
    .product-title,
    .product-material {
      animation: rise-up 0.5s forwards;
    }
    .product-material {
      animation-delay: 0.3s;
    }
  }
}
.product-content {
  top: 150px;
}
@keyframes scale-ani {
  to {
    transform: scale(1);
  }
}
@keyframes rise-up {
  to {
    transform: translateY(0);
  }
}
.nav-bg {
  height: 300px;
  background: url(~@/assets/images/bg-banner.jpg) center no-repeat;
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
.add-cart-btn {
  transition: 0.3s;
  transform: translateY(0);
  opacity: 1;
  &:hover {
    color: $danger;
    background: $white-100;
  }
  &.active {
    transform: translateY(100px);
    opacity: 0;
  }
}
</style>
