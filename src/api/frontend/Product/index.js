import { ref, reactive, toRefs } from 'vue';
import frontReq from '@/api/frontReq';

const product = reactive({ product: {} });
const lightboxImgs = reactive({ lightboxImgs: [] });

const isProductLoading = ref(false);

export default (id) => {
  isProductLoading.value = true;
  frontReq.get(`api/${process.env.VUE_APP_PATH}/product/${id}`).then(({ data }) => {
    if (data.success) {
      product.product = data.product;
      lightboxImgs.lightboxImgs = data.product.imageUrl
        ? [data.product.imageUrl, ...(data.product.imagesUrl || [])]
        : data.product.imagesUrl || [];
    }
    isProductLoading.value = false;
  });

  return {
    ...toRefs(product),
    ...toRefs(lightboxImgs),
    isProductLoading,
  };
};
