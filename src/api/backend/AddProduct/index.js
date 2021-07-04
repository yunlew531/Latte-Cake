import backReq, { PATH } from '@/api/backReq';

export const postUploadImg = (file) => backReq.post(`api/${PATH}/admin/upload`, file);

export const postAddProduct = (data) => backReq.post(`api/${PATH}/admin/product`, { data });
