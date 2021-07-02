<template>
  <div class="navbar-bg"></div>
  <section class="container pt-25">
    <ul class="d-flex list-unstyled mb-12">
      <li class="flex-grow-1">
        <button
          type="button "
          class="city-btn btn text-white w-100 rounded-0 shadow-none"
          :class="{ active: shopPosition === 'Taipei' }"
          @click="setShopPosition('Taipei')"
        >
          台北店
        </button>
      </li>
      <li class="flex-grow-1">
        <button
          type="button "
          class="city-btn btn text-white w-100 rounded-0 shadow-none"
          :class="{ active: shopPosition === 'Taichung' }"
          @click="setShopPosition('Taichung')"
        >
          台中店
        </button>
      </li>
      <li class="flex-grow-1">
        <button
          type="button "
          class="city-btn btn text-white w-100 rounded-0 shadow-none"
          :class="{ active: shopPosition === 'Kaohsiung' }"
          @click="setShopPosition('Kaohsiung')"
        >
          高雄店
        </button>
      </li>
    </ul>
    <div v-if="shopPosition === 'Taipei'">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115676.73003252424!2d121.49439485820317!3d25.037541700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb9dc73545d%3A0x6513f5fb17ad1f67!2z6Ie65YyX5biC5pS_5bqc!5e0!3m2!1szh-TW!2stw!4v1624710293387!5m2!1szh-TW!2stw"
        width="100%"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
    <div v-else-if="shopPosition === 'Taichung'">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.282090079828!2d120.64467441536776!3d24.16183777885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d84daa07441%3A0x2c5e7459c2aaf71a!2z6Ie65Lit5biC5pS_5bqc!5e0!3m2!1szh-TW!2stw!4v1624725149252!5m2!1szh-TW!2stw"
        width="100%"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
    <div v-else-if="shopPosition === 'Kaohsiung'">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10416.999211285864!2d120.3066260090534!3d22.61776753863218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x344465d114abb19!2z6auY6ZuE5biC5pS_5bqcIOWbm-e2reihjOaUv-S4reW_gw!5e0!3m2!1szh-TW!2stw!4v1624723884270!5m2!1szh-TW!2stw"
        width="100%"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  </section>
  <section class="container py-25">
    <VueEasyLightbox
      scrollDisabled
      moveDisabled
      :visible="visible"
      :imgs="imgs"
      :index="imgIdx"
      @hide="handleHide"
    >
    </VueEasyLightbox>
    <div class="row">
      <div class="col-lg-4 small-shop-imgs pt-6">
        <div
          :style="{ 'background-image': `url(${imgFilter})` }"
          class="shop-img w-100 h-100"
          @click="showLightbox(0)"
        ></div>
      </div>
      <div class="small-shop-imgs col-lg-8">
        <ul class="row gx-6 gy-6 h-100 mt-6 mt-lg-0 list-unstyled">
          <li
            v-for="(img, key) in imgsFilter"
            :key="img"
            class="col-4"
            @click="showLightbox(key + 1)"
          >
            <div
              :style="{ 'background-image': `url(${img})` }"
              class="shop-img w-100 h-100"
            ></div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, toRefs } from 'vue';
import VueEasyLightbox from 'vue-easy-lightbox';
import store from '@/composition/store';
import { apiGetShopImg } from '@/api';

const { state, setShopPosition } = store;

export default {
  components: {
    VueEasyLightbox,
  },
  setup() {
    const { imgs, imgFilter, imgsFilter } = apiGetShopImg();
    const imgIdx = ref(0);
    const visible = ref(false);

    const handleHide = () => {
      visible.value = false;
    };

    const showLightbox = (idx) => {
      visible.value = true;
      imgIdx.value = idx;
    };

    return {
      ...toRefs(state),
      imgs,
      imgIdx,
      imgsFilter,
      setShopPosition,
      imgFilter,
      visible,
      handleHide,
      showLightbox,
    };
  },
};
</script>

<style lang="scss">
.btn__close {
  margin-top: 50px;
}
.vel-toolbar {
  display: none;
}
</style>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

.navbar {
  height: 500px;
}
.navbar-bg {
  height: 500px;
  background: url(~@/assets/images/bg-banner.jpg) no-repeat center;
  background-size: cover;
}
.aboutus-title {
  &.active {
    animation: title-ani 0.5s forwards;
  }
}
@keyframes title-ani {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
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
.shop-img {
  background: center no-repeat;
  background-size: cover;
  border-radius: $border-radius-lg;
  &:hover {
    filter: brightness(1.1);
  }
}
.small-shop-imgs {
  height: 416px;
}
</style>
