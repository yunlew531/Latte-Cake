import frontReq from '@/api/frontReq';

const PATH = process.env.VUE_APP_PATH;

export default (page) => frontReq.get(`api/${PATH}/products?page=${page}`);
