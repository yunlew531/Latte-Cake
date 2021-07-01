<template>
  <Navbar class="navbar">
    <template #content>
      <div
        class="
          page-title
          position-absolute
          start-50
          bottom-25
          translate-middle-x
        "
        :class="{ active: !isLoading }"
      >
        <h3 class="text-white fs-1 fs-bold">結帳</h3>
      </div>
    </template>
  </Navbar>
  <main>
    <section class="nav-bg"></section>
    <section class="container pt-20 pb-25">
      <router-link to="/cart" class="fs-5 text-decoration-none d-block pb-5"
        >返回購物車</router-link
      >
      <div class="row gx-8">
        <div class="col-6">
          <Form
            v-slot="{ errors }"
            @submit="onSubmit"
            class="submit-form rounded p-8 bg-white shadow"
          >
            <h3 class="fs-4 text-black-100">資料填寫</h3>
            <div class="form-group text-black-200">
              <label for="email" class="form-label mb-1">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email"
                rules="email|required"
                v-model="user.email"
              ></Field>
              <error-message
                name="email"
                class="invalid-feedback"
              ></error-message>
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
              <error-message name="name" class="invalid-feedback" as="span">
                <span>姓名為必填</span>
              </error-message>
            </div>
            <div class="form-group text-black-200">
              <label for="tel" class="form-label mb-1">電話</label>
              <Field
                id="tel"
                name="tel"
                type="number"
                class="form-control"
                :class="{ 'is-invalid': errors['tel'] }"
                placeholder="請輸入電話 ex: 0912345678"
                :rules="validateTel"
                v-model="user.tel"
              ></Field>
              <error-message name="tel" class="invalid-feedback" as="span">
                <span>電話為必填</span>
              </error-message>
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
              <error-message name="address" class="invalid-feedback" as="span">
                <span>地址為必填</span>
              </error-message>
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
            <button class="fs-5 btn btn-primary w-100 py-4 mt-4" type="submit">
              送出訂單
            </button>
          </Form>
        </div>
        <div class="col-6">
          <div class="bg-white shadow rounded p-8">
            <ul class="list-unstyled">
              <li
                v-for="(product, key) in cartsData.carts"
                :key="product.id"
                class="product-item fs-5 shadow-sm rounded mb-2"
                :class="{ show: nowShow.includes(key) }"
                @click="showInfo(key)"
              >
                <button
                  type="button"
                  class="btn d-flex align-items-end w-100 p-3"
                >
                  <h2 class="text-primary fs-5 m-0">
                    {{ product.product.title }}
                  </h2>
                  <span class="text-primary fs-7 ms-5">x</span>
                  <span class="text-primary fs-7 ms-5 me-auto">
                    {{ product.qty }}</span
                  >
                  <span class="text-primary fs-5"
                    ><span class="fs-7">NT$</span> {{ product.total }}</span
                  >
                </button>
                <div class="product-content">
                  <p class="fs-7 d-flex justify-content-end m-0">
                    <span>售價: NT$ {{ product.product.price }}</span>
                  </p>
                  {{ product.product.content }}
                </div>
              </li>
            </ul>
            <div class="d-flex">
              <router-link
                to="/products"
                class="btn btn-primary text-decoration-none me-auto"
                >選購更多商品</router-link
              >
              <p class="text-primary fs-5 m-0">
                總金額 NT$ <span class="fs-3">{{ cartsData.final_total }}</span>
              </p>
            </div>
          </div>
          <div class="rounded shadow bg-white p-8 mt-8">
            <h4 class="fs-4">輸入優惠折扣碼</h4>
            <div class="d-flex">
              <input type="text" class="flex-grow-1" />
              <button
                type="button"
                class="btn coupon-btn px-5 ms-2 position-relative"
              >
                <span
                  class="
                    coupon-btn-text
                    position-absolute
                    start-50
                    translate-middle-x
                  "
                  >送出</span
                ><span class="opacity-0">送出</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</template>

<script>
import { reactive, inject, toRefs } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const state = inject('state');
    const user = reactive({});

    const validateTel = () => {
      const rule = /^(09)[0-9]{8}$/;
      return rule.test(user.tel) ? true : '需要正確的電話號碼';
    };

    const onSubmit = (value, { resetForm }) => {
      resetForm();
    };

    const nowShow = reactive([]);
    const showInfo = (key) => {
      const idx = nowShow.indexOf(key);
      if (idx !== -1) nowShow.splice(idx, 1);
      else nowShow.push(key);
    };

    return {
      ...toRefs(state),
      user,
      nowShow,
      onSubmit,
      validateTel,
      showInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/scss/custom/variables';

.navbar {
  height: 500px;
}
.nav-bg {
  height: 500px;
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
      animation: scale-ani 0.5s forwards;
      opacity: 1;
    }
  }
}
@keyframes scale-ani {
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

.btn-check:focus + .btn,
.btn:focus {
  box-shadow: 0 0 0 0 rgb(0, 0, 0);
}
.coupon-btn {
  border: 1px solid $black-200;
  overflow: hidden;
  .coupon-btn-text {
    color: $primary;
    transition: 0.2s;
  }
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: $primary;
    border-radius: $border-radius;
    top: -105%;
    left: 0;
    transition: 0.2s ease-in-out;
  }
  &:hover {
    color: $white;
    background: $primary;
    &::before {
      top: 0;
    }
    .coupon-btn-text {
      color: $white;
    }
  }
}
</style>
