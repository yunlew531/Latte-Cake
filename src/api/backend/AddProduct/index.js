import backReq, { PATH } from '@/api/backReq';

export const postUploadImg = (file) => backReq.post(`api/${PATH}/admin/upload`, file);

export const postAddProduct = (data) => backReq.post(`api/${PATH}/admin/product`, { data });

export const putEditProduct = (data, id) =>
  backReq.put(`api/${PATH}/admin/product/${id}`, { data });
