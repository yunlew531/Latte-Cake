import { reactive, toRefs, computed } from 'vue';
import mockyReq from '@/api/mockyReq';

export default () => {
  const imgs = reactive({ imgs: [] });

  mockyReq.get('c05d4527-819f-4b8f-ac01-f4ef3cb16d1c').then((res) => {
    if (res.status === 200) imgs.imgs = res.data.map((img) => img.url);
  });

  const imgFilter = computed(() => imgs.imgs[0]);

  const imgsFilter = computed(() => imgs.imgs.filter((image, key) => key !== 0));

  return {
    ...toRefs(imgs),
    imgFilter,
    imgsFilter
  };
};
