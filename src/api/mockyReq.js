import axios from 'axios';

const mockyReq = axios.create({
  baseURL: 'https://run.mocky.io/v3/'
});

export default mockyReq;
