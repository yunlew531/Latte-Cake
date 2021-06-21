import frontReq from '@/api/frontReq';

export default (id, qty) => frontReq.post(`api/${process.env.VUE_APP_PATH}/cart`, {
  data: { product_id: id, qty }
});
