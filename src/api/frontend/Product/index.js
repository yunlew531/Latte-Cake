import { ref, reactive, toRefs, onUnmounted } from 'vue';
import frontReq from '@/api/frontReq';

const productData = reactive({ productData: {} });
const isProductLoading = ref(false);

export default (id, lifeCycle) => {
  isProductLoading.value = true;
  frontReq.get(`api/${process.env.VUE_APP_PATH}/product/${id}`).then((res) => {
    if (res.data.success) {
      productData.productData = res.data;
      isProductLoading.value = false;
    }
  });

  if (lifeCycle === 'setup') {
    onUnmounted(() => {
      productData.productData = {};
    });
  }

  return {
    ...toRefs(productData),
    isProductLoading
  };
};
