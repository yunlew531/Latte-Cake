import { ref, reactive, toRefs } from 'vue';
import frontReq from '@/api/frontReq';

export default (id) => {
  const productData = reactive({ productData: {} });
  const isLoad = ref(false);

  frontReq.get(`api/${process.env.VUE_APP_PATH}/product/${id}`).then((res) => {
    if (res.data.success) {
      productData.productData = res.data;
      isLoad.value = true;
    }
  });

  return { ...toRefs(productData), isLoad };
};
