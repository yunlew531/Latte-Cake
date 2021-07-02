import { ref, reactive, toRefs, onUnmounted } from 'vue';
import frontReq from '@/api/frontReq';

const productData = reactive({ productData: {} });
const isAniPlay = ref(false);

export default (id, lifeCycle) => {
  isAniPlay.value = false;
  frontReq.get(`api/${process.env.VUE_APP_PATH}/product/${id}`).then((res) => {
    if (res.data.success) {
      productData.productData = res.data;
      isAniPlay.value = true;
    }
  });

  if (lifeCycle === 'setup') {
    onUnmounted(() => {
      productData.productData = {};
      isAniPlay.value = false;
    });
  }

  return {
    ...toRefs(productData),
    isAniPlay
  };
};
