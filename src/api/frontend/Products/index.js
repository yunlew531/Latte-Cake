import frontReq, { PATH } from '@/api/frontReq';

export const getPageProducts = (page) => frontReq.get(`api/${PATH}/products?page=${page}`);

export const getAllProducts = () => frontReq.get(`api/${PATH}/products/all`);
