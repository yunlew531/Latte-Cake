import { reactive, readonly } from 'vue';
import { apiGetCarts, apiGetPageProducts, apiGetOrders } from '@/api';

// state
const state = reactive({
  isLoading: false,
  cartsData: {},
  pageProductsData: {},
  pagination: {},
  shopPosition: 'Taipei',
  orders: {}
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

const getOrders = async () => {
  try {
    const { data } = await apiGetOrders();
    if (data.success) {
      state.orders = data.orders;
      return data;
    }
    return false;
  } catch (err) {
    console.dir(err);
    return false;
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
  getOrders,
  getPageProducts,
  setCartsData,
  setShopPosition
};
