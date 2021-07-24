import frontReq, { PATH } from '@/api/frontReq';

export const postCheckout = (data) => frontReq.post(`api/${PATH}/order`, { data });

export const postCoupon = (coupon) => frontReq.post(`api/${PATH}/coupon`, coupon);
