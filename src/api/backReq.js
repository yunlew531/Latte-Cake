import axios from 'axios';

const backReq = axios.create({
  baseURL: process.env.VUE_APP_URL
});

export default backReq;
