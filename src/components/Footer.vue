<template>
  <footer class="py-20 text-white bg-black-100">
    <div
      class="
        container
        d-flex
        flex-wrap
        justify-content-between
        align-items-center
      "
    >
      <div>
        <h3 class="footer-title fw-bold tracking-2 text-danger">PastaHouse</h3>
        <p class="text-black-300">110台北市信義區市府路1號</p>
        <a href="tel:+886-2-22885566" class="text-black-300 text-decoration-none"
          >電話: 02-22885566</a
        >
        <a href="mailto:spaghetti@gmail.com" class="text-black-300 text-decoration-none d-block"
          >電子郵件： pastahouse@gmail.com</a
        >
        <div class="mt-4">
          <a href="javascript:;" class="link-icon d-inline-block fs-3 rounded-pill">
            <i class="bi bi-facebook"></i>
          </a>
          <a href="javascript:;" class="link-icon d-inline-block fs-3 rounded-pill ms-5">
            <i class="bi bi-instagram"></i>
          </a>
          <a href="javascript:;" class="link-icon d-inline-block fs-3 rounded-pill ms-5">
            <i class="bi bi-twitter"></i>
          </a>
          <a href="javascript:;" class="link-icon d-inline-block fs-3 rounded-pill ms-5">
            <i class="bi bi-google"></i>
          </a>
        </div>
      </div>
      <div></div>
      <div class="text-black-300 mt-8 mt-md-0">
        <h4 class="fs-5 lh-1">訂閱電子郵件</h4>
        <p class="fw-light mt-4">
          訂閱我們的電子郵件，可以收到最新的餐廳活動，<br />得知相關優惠訊息!
        </p>
        <Form v-slot="{ errors }" @submit="submitSubscribe" class="position-relative">
          <Field
            id="email"
            name="Email"
            type="email"
            class="
              form-control
              subscribe-input
              border-0
              rounded-pill
              ps-5
              pe-25
            "
            :class="{ 'is-invalid': errors['Email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="email"
          >
          </Field>
          <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
          <button
            type="submit"
            class="
              subscribe-btn
              btn btn-primary
              rounded-pill
              position-absolute
              top-0
              end-0
              px-5
            "
          >
            訂閱
          </button>
        </Form>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref } from 'vue';
import { useToast } from '@/methods';

export default {
  name: 'Footer',
  setup() {
    const email = ref('');

    const submitSubscribe = (val, { resetForm }) => {
      useToast('感謝您的訂閱!');
      email.value = '';
      resetForm();
    };

    return {
      email,
      submitSubscribe,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.footer-title {
  font-family: 'Nothing You Could Do', cursive;
}
.link-icon {
  color: $black-300;
  &:hover {
    color: $primary;
  }
}
.subscribe-input {
  width: 100%;
  height: 40px;
  // outline: none;
}
.subscribe-btn {
  outline: none;
  height: 40px;
}
</style>
