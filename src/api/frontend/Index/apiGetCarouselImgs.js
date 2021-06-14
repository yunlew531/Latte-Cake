import axios from 'axios';
import { reactive, toRefs } from 'vue';

const mockyReq = axios.create({
  baseURL: 'https://run.mocky.io/',
});

export const getCarouselImgs = () => {
  const photoData = reactive({ photoData: {} });
  mockyReq
    .get('v3/b858681d-6d51-46cf-8a5f-5d3cc9d5f378')
    .then((res) => {
      if (res.status) {
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
