import backReq, { PATH } from '@/api/backReq';

export default (id, data) => backReq.put(`api/${PATH}/admin/order/${id}`, data);
