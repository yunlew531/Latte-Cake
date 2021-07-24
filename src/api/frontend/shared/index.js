import frontReq, { PATH } from '@/api/frontReq';

export const getCarts = () => frontReq.get(`api/${PATH}/cart`);

export const deleteCart = (id) => frontReq.delete(`api/${PATH}/cart/${id}`);

export const deleteAllCarts = () => frontReq.delete(`api/${PATH}/carts`);

export const postAddCart = (id, qty) => frontReq.post(`api/${PATH}/cart`, {
  data: { product_id: id, qty },
});

export const putCartQty = ({ product, qty, id }) => frontReq.put(`api/${PATH}/cart/${id}`, {
  data: { product_id: product.id, qty },
});
