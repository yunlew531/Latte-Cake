import backReq, { PATH } from '@/api/backReq';

export const putEditOrder = (id, data) => backReq.put(`api/${PATH}/admin/order/${id}`, data);

export const delOrder = (orderId) => backReq.delete(`api/${PATH}/admin/order/${orderId}`);
