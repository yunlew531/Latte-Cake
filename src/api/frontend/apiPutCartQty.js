import frontReq from '@/api/frontReq';

const PATH = process.env.VUE_APP_PATH;

export default ({ product, qty, id }) => frontReq.put(`api/${PATH}/cart/${id}`, {
  data: { product_id: product.id, qty }
});
