import backReq, { PATH } from '@/api/backReq';

export const getOrders = (page = 1) => backReq.get(`api/${PATH}/admin/orders?page=${page}`);

export default {};
