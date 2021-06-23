import { reactive, readonly } from 'vue';
import frontReq from '@/api/frontReq';

const PATH = process.env.VUE_APP_PATH;

// state
const state = reactive({
  cartsData: {},
  pageProductsData: {},
  pagination: {}
});

// actions
const getCarts = async () => {
  const { data } = await frontReq.get(`api/${PATH}/cart`);
  try {
    if (data.success) state.cartsData = data.data;
  } catch (err) {
    console.dir(err);
  }
};

const getPageProducts = async (page = 1) => {
  const { data } = await frontReq.get(`api/${PATH}/products?page=${page}`);
  try {
    if (data.success) {
      state.pageProductsData = data.products;
      state.pagination = data.pagination;
    }
  } catch (err) {
    console.dir(err);
  }
};

// mutations
const setCartsData = (cartsData) => {
  state.cartsData = cartsData;
};

export default {
  state: readonly(state),
  getCarts,
  getPageProducts,
  setCartsData
};
