<template>
  <section class="nav-bg"></section>
  <section
    class="product-panel bg-white rounded shadow-sm container p-10"
    :class="{ active: !isProductLoading }"
  >
    <div class="row gx-12">
      <ul class="col-6 list-unstyled mb-0">
        <li
          class="product-img rounded"
          :style="{
            'background-image': `url(${productData.product?.imageUrl})`,
          }"
          @click="showLightbox(0)"
        ></li>
        <li
          v-for="(img, key) in productData.product?.imagesUrl"
          :key="img + key"
          :style="{
            'background-image': `url(${img})`,
          }"
          class="product-img rounded"
          @click="showLightbox(productData.product?.imageUrl ? key + 1 : key)"
        ></li>
      </ul>
      <div class="col-6">
        <div class="product-content position-sticky">
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
                v-if="productData.product?.freeDelivery"
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
                  <span class="material-icons border-0"> arrow_drop_down </span>
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
              :class="{ active: isProductLoading }"
              @click="addCart"
            >
              加入購物車
            </button>
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
  ></VueEasyLightbox>
</template>

<script>
import { inject, ref, reactive, watch, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { apiPostAddCart, apiGetProductInfo } from '@/api';
import store from '@/composition/store';
import { useToast } from '@/methods';
import VueEasyLightbox from 'vue-easy-lightbox';

const { getCarts, setIsLoading } = store;

export default {
  name: 'Product',
  components: {
    VueEasyLightbox,
  },
  setup() {
    const state = inject('state');
    const $emitter = inject('$emitter');
    const route = useRoute();
    const { productData, isProductLoading } = apiGetProductInfo(
      route.params.id,
      'setup'
    );
    const productNum = ref(1);

    const isLightboxShow = ref(false);
    const lightboxImgs = reactive({ lightboxImgs: [] });
    const lightboxIndex = ref(0);

    watch(productData, () => {
      const data = productData.value.product;
      lightboxImgs.lightboxImgs = data.imageUrl
        ? [data.imageUrl, ...(data.imagesUrl || [])]
        : data.imagesUrl || [];
    });

    const showLightbox = (idx) => {
      lightboxIndex.value = idx;
      isLightboxShow.value = true;
    };

    const hideLightbox = () => {
      isLightboxShow.value = false;
    };

    const addCart = async () => {
      const { id } = productData.value.product;
      try {
        setIsLoading(true);
        const { data } = await apiPostAddCart(id, productNum.value);
        if (data.success) {
          await getCarts();
          setIsLoading(false);
          $emitter.emit('showCartCanvas', true);
          useToast('成功加入購物車!', 'success');
          productNum.value = 1;
        } else useToast('操作失敗!', 'danger');
      } catch (err) {
        console.dir(err);
      }
    };

    watch(
      () => route.params.id,
      (id) => {
        apiGetProductInfo(id);
      }
    );

    return {
      ...toRefs(state),
      productNum,
      productData,
      isProductLoading,
      addCart,
      isLightboxShow,
      ...toRefs(lightboxImgs),
      lightboxIndex,
      showLightbox,
      hideLightbox,
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

.product-panel {
  transform: translateY(-50px);
  .product-img {
    height: 500px;
    background: center no-repeat;
    margin-bottom: $spacer * 1.25;
    background-size: cover;
    transform: scale(0);
    &:last-child {
      margin-bottom: 0;
    }
  }
  &.active {
    .product-img {
      animation: scale-ani 0.5s forwards;
    }
  }
}
.product-content {
  top: 150px;
}
.page-title {
  &.active {
    > h3 {
      animation: scale-ani 0.5s forwards;
      transform: scale(0);
    }
  }
}
@keyframes scale-ani {
  to {
    transform: scale(1);
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
