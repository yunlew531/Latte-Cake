import backReq, { PATH } from '@/api/backReq';

export const getProducts = (page = 1) => backReq.get(`api/${PATH}/admin/products?page=${page}`);

export default {};
