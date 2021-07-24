<template>
  <div class="navbar-bg"></div>
  <section class="container about-us-panel bg-white shadow-sm rounded mb-n12">
    <div class="p-sm-12">
      <div class="row g-8">
        <div class="col-xl-6">
          <img src="@/assets/images/bg-banner.jpg" alt="PastaHouse" class="img-fluid" />
        </div>
        <div class="col-xl-6 lh-lg">
          <h2 class="fs-3">關於我們</h2>
          <p>
            <span class="shop-name fw-bold text-danger">PastaHouse</span>
            是一家成立於 1950 年的義大利獨資公司。<br />
            一家新鮮義大利麵餐廳，提供熱食，如義大利麵、pizza等。
          </p>
          <p>
            我們致力於為我們的客戶帶來全家人都會喜歡的經典義大利麵食，<br />
            食材均來自嚴格篩選，我們使用通過 100% 安全認證之廠商。
          </p>
          <p>
            中央廚房每天烹飪，不含防腐劑、添加劑著色劑或味精。<br />
            無需真空包裝，因為它只是從我們廚房送到您手中的新鮮食物。
          </p>
          <p>
            義大利麵廚師確實為您提供了家人應得的古老時尚美食。<br />
            餐點是通過各地真實家庭的反饋完成的，我們的成功取決於他們！<br />
            我們致力於為您的家人提供包含傳統美味的食物。
          </p>
        </div>
      </div>
      <h2 class="text-center mt-12 mb-3">店家地址</h2>
      <ul class="d-flex list-unstyled">
        <li v-for="shop in shops" :key="shop.city" class="flex-grow-1">
          <button
            type="button "
            class="city-btn btn text-white w-100 rounded-0 shadow-none"
            :class="{ active: shopPosition === shop.city }"
            @click="setShopPosition(shop.city)"
          >
            {{ shop.city }}
          </button>
        </li>
      </ul>
      <div v-for="shop in shops" :key="shop.src" class="google-map">
        <iframe
          v-if="shopPosition === shop.city"
          :src="shop.src"
          width="100%"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </section>
  <div class="container bg-white rounded shadow-sm p-8 my-8">
    <h2 class="text-center">餐廳照片</h2>
    <RestaurantLightbox class="my-n20" />
  </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
import RestaurantLightbox from '@/components/frontend/RestaurantLightbox.vue';

export default {
  props: {
    city: {
      type: String,
      default: '台北',
    },
  },
  components: {
    RestaurantLightbox,
  },
  setup(props) {
    const { city } = toRefs(props);

    const shops = reactive([
      {
        city: '台北',
        src:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115676.73003252424!2d121.49439485820317!3d25.037541700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb9dc73545d%3A0x6513f5fb17ad1f67!2z6Ie65YyX5biC5pS_5bqc!5e0!3m2!1szh-TW!2stw!4v1624710293387!5m2!1szh-TW!2stw',
      },
      {
        city: '台中',
        src:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.282090079828!2d120.64467441536776!3d24.16183777885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d84daa07441%3A0x2c5e7459c2aaf71a!2z6Ie65Lit5biC5pS_5bqc!5e0!3m2!1szh-TW!2stw!4v1624725149252!5m2!1szh-TW!2stw',
      },
      {
        city: '高雄',
        src:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10416.999211285864!2d120.3066260090534!3d22.61776753863218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x344465d114abb19!2z6auY6ZuE5biC5pS_5bqcIOWbm-e2reihjOaUv-S4reW_gw!5e0!3m2!1szh-TW!2stw!4v1624723884270!5m2!1szh-TW!2stw',
      },
    ]);

    const shopPosition = ref(city.value);
    const setShopPosition = (place) => {
      shopPosition.value = place;
    };

    return {
      shops,
      shopPosition,
      setShopPosition,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

.shop-name {
  font-family: 'Nothing You Could Do', cursive;
}
.about-us-panel {
  transform: translateY(-50px);
}
@keyframes scale {
  to {
    transform: scale(1);
  }
}
.navbar-bg {
  height: 300px;
  background: url(~@/assets/images/bg-banner.jpg) no-repeat center;
  background-size: cover;
}

.city-btn {
  background: $black;
  &:hover {
    background: tint-color($black, 10%);
  }
  &.active {
    background: tint-color($black, 20%);
  }
}
</style>
