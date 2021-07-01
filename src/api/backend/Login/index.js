import backReq from '@/api/backReq';

export default (userData) => backReq.post('admin/signin', userData);
