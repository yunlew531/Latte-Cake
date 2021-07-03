import { reactive, readonly } from 'vue';
import { apiGetCarts, apiGetPageProducts } from '@/api';

// state
const state = reactive({
  isLoading: false,
  cartsData: {},
  pageProductsData: {},
  pagination: {},
  shopPosition: 'Taipei'
});

// actions
const getCarts = async () => {
  try {
    const { data } = await apiGetCarts();
    if (data.success) {
      state.cartsData = data.data;
    }
  } catch (err) {
    console.dir('err');
  }
};

const getPageProducts = async (page = 0) => {
  try {
    const { data } = await apiGetPageProducts(page);
    if (data.success) {
      state.pageProductsData = data.products;
      state.pagination = data.pagination;
    }
  } catch (err) {
    console.dir(err);
  }
};

// mutations
const setIsLoading = (boolean) => {
  state.isLoading = boolean;
};

const setCartsData = (cartsData) => {
  state.cartsData = cartsData;
};

const setShopPosition = (city) => {
  state.shopPosition = city;
};

export default {
  state: readonly(state),
  setIsLoading,
  getCarts,
  getPageProducts,
  setCartsData,
  setShopPosition
};
