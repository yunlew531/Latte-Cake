import { reactive } from 'vue';
import frontReq from '@/api/frontReq';

export const getPageProducts = (page = 1) => {
  const productsData = reactive({ productsData: {} });
  const pagination = reactive({ pagination: {} });

  frontReq.get(`api/${process.env.VUE_APP_PATH}/products?page=${page}`).then((res) => {
    if (res.status === 200) {
      productsData.productsData = res.data.products;
      pagination.pagination = res.data.pagination;
    }
  });

  return {
    productsData,
    pagination
  };
};

export default {};
