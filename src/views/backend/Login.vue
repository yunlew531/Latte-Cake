<template>
  <section class="navbar-bg">
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
      <Form v-slot="{ errors }" @submit="login">
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
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="form-group">
            <label for="password" class="form-label text-white">密碼</label>
            <Field
              id="password"
              name="密碼"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors['密碼'] }"
              placeholder="請輸入密碼"
              rules="required"
              v-model="user.password"
            ></Field>
            <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <router-link to="/home" class="text-white fw-lighter text-decoration-none me-auto"
            >返回前台</router-link
          >
          <Button btnType="submit"> 登入 </Button>
        </div>
      </Form>
    </div>
  </section>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { apiPostLogin } from '@/api';
import { useToast } from '@/methods';
import Button from '@/components/frontend/Button.vue';

export default {
  name: 'Login',
  components: {
    Button,
  },
  setup() {
    const router = useRouter();

    const user = reactive({});
    const login = async () => {
      const userData = {
        username: user.email,
        password: user.password,
      };
      try {
        const { data } = await apiPostLogin(userData);
        if (data.success) {
          const { expired } = data;
          const { token } = data;
          document.cookie = `LatteCake=${token};expires=${new Date(expired)};`;
          router.push('/admin');
        } else useToast('登入失敗!', 'danger');
      } catch (err) {
        console.dir(err);
      }
    };

    return {
      user,
      login,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!from.path.match('/admin')) {
        vm.$router.push('/admin');
      }
    });
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
