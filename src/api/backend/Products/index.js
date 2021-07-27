import backReq, { PATH } from '@/api/backReq';

export const getProducts = (page = 1) => backReq.get(`api/${PATH}/admin/products?page=${page}`);

export const getAllAdminProducts = () => backReq.get(`api/${PATH}/admin/products/all`);

export const deleteProduct = (productId) => backReq.delete(`api/${PATH}/admin/product/${productId}`);
