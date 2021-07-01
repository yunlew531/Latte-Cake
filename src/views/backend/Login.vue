<template>
  <Navbar class="navbar position-relative">
    <template v-slot:content>
      <div
        class="
          login-panel
          shadow
          rounded
          position-absolute
          start-50
          top-50
          translate-middle
          p-8
        "
      >
        <Form v-slot="{ errors }" @submit="onSubmit">
          <div class="mb-3">
            <div class="form-group">
              <label for="email" class="form-label text-white">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email"
                rules="email|required"
                v-model="user.email"
              >
              </Field>
              <error-message
                name="email"
                class="invalid-feedback"
              ></error-message>
            </div>
            <div class="form-group">
              <label for="password" class="form-label text-white">密碼</label>
              <Field
                id="password"
                name="密碼"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['密碼'] }"
                placeholder="請輸入密碼"
                rules="required"
                v-model="user.password"
              ></Field>
              <error-message
                name="密碼"
                class="invalid-feedback"
              ></error-message>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-primary" type="submit">登入</button>
          </div>
        </Form>
      </div>
    </template>
  </Navbar>
  <main>
    <section class="navbar-bg"></section>
  </main>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { apiPostLogin } from '@/api';
import { useToast } from '@/methods';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Login',
  components: {
    Navbar,
  },
  setup() {
    const user = reactive({});
    const router = useRouter();

    const onSubmit = async () => {
      const userData = { username: user.email, password: user.password };
      try {
        const { data } = await apiPostLogin(userData);
        if (data.success) {
          const { expired } = data;
          const { token } = data;
          document.cookie = `LatteCake=${token};expires=${new Date(expired)};`;
          router.push('/admin');
        } else {
          useToast('登入失敗!', 'danger');
        }
      } catch (err) {
        console.dir(err);
      }
    };

    return {
      user,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.navbar-bg {
  height: 100vh;
  background: url(~@/assets/images/bg-banner.jpg) no-repeat center;
  background-size: cover;
}
.login-panel {
  width: 400px;
  background: rgba($white, 0.3);
}
.form-group {
  height: 100px;
}
</style>
