<template>
  <section class="subfooter-panel">
    <div class="container py-25">
      <ul class="row gx-8 list-unstyled">
        <li class="col-md-6 mb-8 mb-md-0">
          <a
            @click.prevent="handToPageMaterials"
            class="
              link-item
              text-reset text-decoration-none
              bg-white
              d-flex
              align-items-center
              border border-secondary
              p-1
              rounded
            "
          >
            <div class="raw-material-img" />
            <div class="ps-5 flex-grow-1">
              <h3 class="fs-5 m-0">關於食材</h3>
              <p class="m-0">About Raw Materials</p>
            </div>
            <span class="material-icons fs-5 text-danger pe-2">
              play_circle_outline
            </span>
          </a>
        </li>
        <li class="col-md-6 mb-md-0">
          <router-link
            to="/aboutus"
            class="
              link-item
              text-reset text-decoration-none
              bg-white
              d-flex
              align-items-center
              border border-secondary
              p-1
              rounded
            "
          >
            <div class="shop-img" />
            <div class="ps-5 flex-grow-1">
              <h3 class="fs-5 m-0">關於本店</h3>
              <p class="m-0">About Shop</p>
            </div>
            <span class="material-icons fs-5 text-danger pe-2">
              play_circle_outline
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'SubFooter',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $emitter = inject('$emitter');

    const handToPageMaterials = () => {
      if (route.path === '/home') {
        $emitter.emit('scrollToEl', 'aboutMaterialPanelEl');
      } else {
        router.push({
          name: 'Home',
          params: { scrollToElProps: 'aboutMaterialPanelEl' },
        });
      }
    };

    return {
      handToPageMaterials,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.subfooter-panel {
  background-color: $white-100;
  background-size: cover;
  box-shadow: $box-shadow-lg-inset;
}
.raw-material-img,
.shop-img {
  width: 100px;
  height: 100px;
  transition: 0.2s;
  background-size: cover;
  background-position: center;
}
.raw-material-img {
  background-image: url(~@/assets/images/photo-1509440159596-0249088772ff.jpg);
}
.shop-img {
  background-image: url(~@/assets/images/street-cafe-taipei.jpg);
}
.link-item {
  cursor: pointer;
  h3,
  p {
    transition: 0.2s;
  }
  p {
    color: $black-300;
  }
  transition: 0.2s;
  box-shadow: $box-shadow;
  &:hover {
    h3,
    p {
      color: $danger;
    }
    .raw-material-img,
    .shop-img {
      filter: brightness(0.8);
    }
    box-shadow: $box-shadow-sm;
  }
}
</style>
