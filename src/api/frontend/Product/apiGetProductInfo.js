import { reactive, toRefs } from 'vue';
import frontReq from '@/api/frontReq';

export default {};

export const getProductInfo = (id) => {
  const productData = reactive({ productData: {} });
  frontReq.get(`api/${process.env.VUE_APP_PATH}/product/${id}`).then((res) => {
    if (res.data.success) {
      productData.productData = res.data;
    }
    console.log(productData.productData);
  });

  return { ...toRefs(productData) };
};
