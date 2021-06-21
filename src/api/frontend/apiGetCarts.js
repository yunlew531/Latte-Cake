import { ref, reactive } from 'vue';
import frontReq from '@/api/frontReq';

export const getCarts = () => {
  const cartsData = reactive({ cartsData: {} });
  const cartsQty = ref(0);

  frontReq.get(`api/${process.env.VUE_APP_PATH}/cart`).then((res) => {
    if (res.data.success) {
      cartsData.cartsData = res.data.data;
      cartsQty.value = res.data.data.carts.length;
    }
  });

  return {
    cartsData,
    cartsQty
  };
};

export default {};
