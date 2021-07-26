import frontReq, { PATH } from '@/api/frontReq';

export default (orderId) => frontReq.get(`api/${PATH}/order/${orderId}`);
