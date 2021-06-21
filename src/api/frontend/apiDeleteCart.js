import frontReq from '@/api/frontReq';

export default (id) => frontReq.delete(`api/${process.env.VUE_APP_PATH}/cart/${id}`);
