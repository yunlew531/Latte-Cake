<template>
  <section class="nav-bg"></section>
  <section class="checkout-panel container position-relative mb-12">
    <router-link to="/cart" class="position-absolute start-0 top-n16">
      <Button class="fs-6 px-5 ms-2">返回購物車</Button>
    </router-link>
    <div class="row gx-8">
      <div class="col-md-6">
        <Form
          v-slot="{ errors }"
          @submit="onSubmit"
          class="submit-form bg-white rounded p-8 shadow-sm"
        >
          <h3 class="fs-4 text-black-100">資料填寫</h3>
          <div class="form-group text-black-200">
            <label for="orderEmail" class="form-label mb-1">Email</label>
            <Field
              id="orderEmail"
              name="Email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['Email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="user.email"
            ></Field>
            <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="form-group text-black-200">
            <label for="name" class="form-label mb-1">姓名</label>
            <Field
              id="name"
              name="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['name'] }"
              placeholder="請輸入名字"
              rules="required"
              v-model="user.name"
            ></Field>
            <ErrorMessage name="name" class="invalid-feedback" as="span">
              <span>姓名為必填</span>
            </ErrorMessage>
          </div>
          <div class="form-group text-black-200">
            <label for="tel" class="form-label mb-1">電話</label>
            <Field
              id="tel"
              name="tel"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['tel'] }"
              placeholder="請輸入電話 ex: 0912345678"
              :rules="validateTel"
              v-model="user.tel"
            ></Field>
            <ErrorMessage name="tel" class="invalid-feedback" as="span">
              <span>請填寫正確電話號碼</span>
            </ErrorMessage>
          </div>
          <div class="form-group text-black-200">
            <label for="address" class="form-label mb-1">地址</label>
            <Field
              id="address"
              name="address"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['address'] }"
              placeholder="請輸入地址"
              rules="required"
              v-model="user.address"
            ></Field>
            <ErrorMessage name="address" class="invalid-feedback" as="span">
              <span>地址為必填</span>
            </ErrorMessage>
          </div>
          <div class="form-group text-black-200">
            <label for="payment" class="form-label mb-1">付款方式</label>
            <Field
              id="payment"
              name="payment"
              class="form-control"
              as="select"
              v-model="user.payment"
            >
              <option value="">貨到付款</option>
              <option value="ATM 繳費">ATM 繳費</option>
              <option value="Apple Pay">Apple Pay</option>
              <option value="Google Pay">Google Pay</option>
            </Field>
          </div>
          <Button btnType="submit" class="fs-6 px-5 ms-2">送出訂單</Button>
        </Form>
      </div>
      <div class="col-md-6">
        <div class="bg-white shadow-sm rounded p-8">
          <ul class="list-unstyled">
            <li
              v-for="(product, key) in cartsData.carts"
              :key="product.id"
              class="product-item fs-5 shadow-sm rounded mb-2"
              :class="{ show: nowShowCarts.includes(key) }"
              @click="showCartInfo(key)"
            >
              <button type="button" class="btn d-flex flex-wrap align-items-end w-100 p-3">
                <h2 class="text-primary d-inline-block d-sm-block fs-5 m-0">
                  {{ product.product.title }}
                </h2>
                <span class="text-primary fs-7 ms-5">x</span>
                <span class="text-primary fs-7 ms-5 me-auto"> {{ product.qty }}</span>
                <span class="text-start text-primary fs-5 w-100 w-sm-auto"
                  ><span class="fs-7">NT$</span> {{ product.total }}</span
                >
              </button>
              <div class="product-content">
                <div class="fs-7 d-flex justify-content-between">
                  <router-link :to="`/product/${product.product.id}`">
                    商品連結
                  </router-link>
                  <span>售價: NT$ {{ product.product.price }}</span>
                </div>
                <p class="fs-6 fw-light py-1">
                  {{ product.product.content }}
                </p>
              </div>
            </li>
          </ul>
          <div class="d-flex flex-wrap">
            <router-link to="/products" class="me-auto">
              <Button class="px-5 ms-0 ms-lg-2">選購更多商品</Button>
            </router-link>
            <p class="text-primary fs-5 m-0">
              總金額 NT$
              <span
                class="fs-3 me-3"
                :class="{
                  'text-decoration-line-through': cartsData.final_total !== cartsData.total,
                }"
                >{{ cartsData.total }}</span
              >
              <span v-if="cartsData.final_total !== cartsData.total" class="fs-3">{{
                cartsData.final_total
              }}</span>
            </p>
          </div>
        </div>
        <div class="rounded shadow-sm bg-white p-8 mt-8">
          <label for="coupon" class="form-label fs-4">輸入優惠折扣碼</label>
          <Form v-slot="{ errors }" @submit="submitCoupon" class="d-flex flex-wrap">
            <div class="mb-3 flex-grow-1">
              <Field
                id="coupon"
                name="折扣碼"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['折扣碼'] }"
                placeholder="請輸入折扣碼"
                rules="required"
                v-model.trim="couponInput"
              ></Field>
              <ErrorMessage name="折扣碼" class="invalid-feedback"></ErrorMessage>
            </div>
            <Button
              btnType="submit"
              class="align-self-start w-100 w-lg-auto px-5 mt-2 mt-lg-0 ms-lg-2"
              >送出
            </Button>
          </Form>
        </div>
        <div class="rounded shadow-sm bg-white p-8 mt-8">
          <h4 class="fs-4 mb-3">折扣碼</h4>
          <ul class="list-unstyled">
            <li v-for="coupon in coupons" :key="coupon.code" @click="copyCouponCode(coupon.code)">
              <h3 class="fs-5 fw-light">{{ coupon.title }}</h3>
              <div class="d-flex btn-group">
                <p class="coupon-code btn flex-grow-1 m-0">
                  {{ coupon.code }}
                </p>
                <button class="flex-grow-0 px-5 btn btn-primary">複製</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  ref, reactive, inject, toRefs,
} from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from '@/methods';
import { apiPostCheckout, apiPostCoupon } from '@/api';
import store from '@/composition/store';
import Button from '@/components/frontend/Button.vue';

const { setIsLoading, getCarts } = store;

export default {
  components: {
    Button,
  },
  setup() {
    const state = inject('state');
    const { cartsData } = toRefs(state);
    const router = useRouter();
    const coupons = reactive([{ title: '防疫外送優惠', code: 'pastadiscount' }]);

    const user = reactive({});
    const onSubmit = async (value, { resetForm }) => {
      if (!cartsData.value.carts.length) {
        useToast('購物車沒有商品!', 'danger');
        return;
      }
      resetForm();
      setIsLoading(true);
      const data = { user };
      try {
        const { data: resData } = await apiPostCheckout(data);
        if (resData.success) router.push('/orderCompleted');
        else useToast('發生錯誤!', 'danger');
      } catch (err) {
        console.dir(err);
        useToast('發生錯誤!', 'danger');
      }
      setIsLoading(false);
    };

    const validateTel = () => {
      const rule = /^(09)[0-9]{8}$/;
      return rule.test(user.tel) ? true : '需要正確的電話號碼';
    };

    const couponInput = ref('');
    const submitCoupon = async (val, { resetForm }) => {
      if (!cartsData.value.carts.length) {
        useToast('購物車需有商品!', 'danger');
        return;
      }
      resetForm();
      const coupon = { data: { code: couponInput.value } };
      setIsLoading(true);
      try {
        const { data } = await apiPostCoupon(coupon);
        if (data.success) {
          await getCarts();
          useToast(data.message);
        } else useToast(data.message, 'danger');
      } catch (err) {
        console.dir(err);
        useToast('無法套用!', 'danger');
      }
      setIsLoading(false);
    };

    const copyCouponCode = async (code) => {
      try {
        await navigator.clipboard.writeText(code);
        useToast('已複製!');
      } catch (err) {
        useToast('無法複製!');
      }
    };

    const nowShowCarts = reactive([]);
    const showCartInfo = (key) => {
      const idx = nowShowCarts.indexOf(key);
      if (idx !== -1) nowShowCarts.splice(idx, 1);
      else nowShowCarts.push(key);
    };

    return {
      ...toRefs(state),
      user,
      nowShowCarts,
      coupons,
      couponInput,
      onSubmit,
      submitCoupon,
      copyCouponCode,
      validateTel,
      showCartInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

.checkout-panel {
  transform: translateY(-50px);
}
.nav-bg {
  height: 300px;
  background: url(~@/assets/images/bg-banner.jpg) center no-repeat;
  background-size: cover;
}
.page-title {
  > h3 {
    opacity: 0;
  }
  &.active {
    > h3 {
      transform: scale(0);
      animation: scale-anime 0.5s forwards;
      opacity: 1;
    }
  }
}
@keyframes scale-anime {
  to {
    transform: scale(1);
  }
}
.form-group {
  height: 100px;
}
.product-item {
  background: $white;
  border: 1px solid tint-color($primary, 95%);
  &:hover {
    background: shade-color($white, 2%);
  }
  &.show {
    border: 1px solid tint-color($primary, 90%);
    .product-content {
      max-height: 500px;
      border-top: 1px solid $gray-300;
      padding: 12px;
    }
  }
}
.product-content {
  overflow: hidden;
  max-height: 0;
}
.coupon-code {
  background: rgba($black-300, 0.1);
}
</style>
