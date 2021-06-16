import axios from 'axios';
import { reactive, toRefs } from 'vue';

const mockyReq = axios.create({
  baseURL: 'https://run.mocky.io/',
});

export const getCarouselImgs = () => {
  const photoData = reactive({ photoData: {} });
  mockyReq
    .get('v3/196c4507-c8a3-4c11-88a3-9c63393d77d3')
    .then((res) => {
      if (res.status === 200) {
        photoData.photoData = res.data;
      }
    })
    .catch((err) => {
      console.dir(err);
    });
  return {
    ...toRefs(photoData),
  };
};

export default mockyReq;
