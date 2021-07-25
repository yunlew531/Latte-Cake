import { reactive, readonly } from 'vue';
import {
  apiGetCarts, apiGetPageProducts, apiGetOrders, apiGetAllProducts,
} from '@/api';

// state
const state = reactive({
  isLoading: false,
  cartsData: {},
  allProducts: [],
  pageProductsData: {},
  pagination: {},
  orders: {},
});

// mutations
const setIsLoading = (boolean) => {
  state.isLoading = boolean;
};

const setCartsData = (cartsData) => {
  state.cartsData = cartsData;
};

const setAllProducts = (products) => {
  state.allProducts = products;
};

const setPageProducts = (data) => {
  state.pageProductsData = data.products;
  state.pagination = data.pagination;
};

const setOrders = (orders) => {
  state.orders = orders;
};

// actions
const getCarts = async () => {
  try {
    const { data } = await apiGetCarts();
    if (data.success) {
      setCartsData(data.data);
    }
  } catch (err) {
    console.dir('err');
  }
};

const getAllProducts = async () => {
  let resData = null;
  try {
    const { data } = await apiGetAllProducts();
    if (data.success) setAllProducts(data.products);
    resData = data;
  } catch (err) {
    console.dir(err);
    resData = err;
  }
  return resData;
};

const getPageProducts = async (page = 1) => {
  let resData = null;
  try {
    const { data } = await apiGetPageProducts(page);
    if (data.success) {
      setPageProducts(data);
      resData = data;
    }
  } catch (err) {
    console.dir(err);
    resData = err;
  }
  return resData;
};

const getOrders = async () => {
  let resData = null;
  try {
    const { data } = await apiGetOrders();
    if (data.success) {
      setOrders(data.orders);
    }
    resData = data;
  } catch (err) {
    console.dir(err);
    resData = err;
  }
  return resData;
};

export default {
  state: readonly(state),
  setIsLoading,
  getCarts,
  getOrders,
  getAllProducts,
  getPageProducts,
  setCartsData,
};
