import axios from 'axios';

export const PATH = process.env.VUE_APP_PATH;

const backReq = axios.create({
  baseURL: process.env.VUE_APP_URL
});

export default backReq;
