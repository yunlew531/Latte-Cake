import backReq from '@/api/backReq';
import axios from 'axios';

export const postCheck = () => backReq.post('api/user/check');

export const getUser = () => axios.get('https://randomuser.me/api/');
