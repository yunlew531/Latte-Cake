import backReq, { PATH } from '@/api/backReq';

export const postAddCoupon = (data) => backReq.post(`api/${PATH}/admin/coupon`, { data });

export const getCoupons = (page = 1) => backReq.get(`api/${PATH}/admin/coupons?page=${page}`);

export const editCoupon = (id, data) => backReq.put(`api/${PATH}/admin/coupon/${id}`, { data });

export const deleteCoupon = (id) => backReq.delete(`api/${PATH}/admin/coupon/${id}`);
