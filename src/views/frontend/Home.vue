<template>
  <Carousel />
  <WhyChooseUs />
  <Menu />
  <HotSale />
  <ImmediatelyOrder />
  <AboutMaterialPanel />
  <OurTeam />
  <RestaurantLightbox />
  <LocationPanel />
</template>

<script>
import {
  ref, inject, provide, watch, toRefs, onMounted, onUnmounted, nextTick,
} from 'vue';
import store from '@/composition/store';
import useGetScrollY from '@/methods/useGetScrollY';
import Carousel from '@/components/frontend/Index/Carousel.vue';
import WhyChooseUs from '@/components/frontend/Index/WhyChooseUs.vue';
import Menu from '@/components/frontend/Index/Menu.vue';
import HotSale from '@/components/frontend/Index/HotSale.vue';
import ImmediatelyOrder from '@/components/frontend/Index/ImmediatelyOrder.vue';
import AboutMaterialPanel from '@/components/frontend/Index/AboutMaterialPanel.vue';
import OurTeam from '@/components/frontend/Index/OurTeam.vue';
import RestaurantLightbox from '@/components/frontend/RestaurantLightbox.vue';
import LocationPanel from '@/components/frontend/Index/LocationPanel.vue';

const { getAllProducts } = store;

export default {
  name: 'Index',
  props: {
    scrollToElProps: {
      type: String,
    },
  },
  components: {
    Carousel,
    WhyChooseUs,
    Menu,
    HotSale,
    ImmediatelyOrder,
    AboutMaterialPanel,
    OurTeam,
    RestaurantLightbox,
    LocationPanel,
  },
  setup(props) {
    const state = inject('state');
    const $emitter = inject('$emitter');
    const { scrollToElProps } = toRefs(props);

    const { scrollY } = useGetScrollY();
    provide('scrollY', scrollY);

    const ajaxStatus = ref(false);
    getAllProducts().then((data) => {
      if (data.success) ajaxStatus.value = true;
    });

    const scrollToEl = (id) => {
      nextTick(() => {
        const el = document.getElementById(`${id}`);
        const position = el.offsetTop;
        window.scrollTo(0, position);
      });
    };
    watch(
      scrollToElProps,
      (id) => {
        if (id) scrollToEl(id);
      },
      { immediate: true },
    );
    onMounted(() => {
      $emitter.on('scrollToEl', scrollToEl);
    });
    onUnmounted(() => {
      $emitter.off('scrollToEl', scrollToEl);
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/views/frontend/Home';
</style>
