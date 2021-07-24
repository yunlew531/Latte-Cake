import axios from 'axios';

export const PATH = process.env.VUE_APP_PATH;

const frontReq = axios.create({
  baseURL: process.env.VUE_APP_URL,
});

export default frontReq;
