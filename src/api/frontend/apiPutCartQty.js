import frontReq from '@/api/frontReq';

export default (product) => frontReq.put(`api/${process.env.VUE_APP_PATH}/cart/${product.id}`, {
  data: { product_id: product.product.id, qty: product.qty }
});
