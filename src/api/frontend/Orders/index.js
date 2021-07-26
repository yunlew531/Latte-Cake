import frontReq, { PATH } from '@/api/frontReq';

export default (page = 1) => frontReq.get(`api/${PATH}/orders?page=${page}`);
