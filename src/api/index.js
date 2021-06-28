import getShopImg from './frontend/AboutUs';
import getProductInfo from './frontend/Product';
import { getCarts, putCartQty, deleteCart, postAddCart } from './frontend/shared';
import getPageProducts from './frontend/Products';

// frontend
export const apiGetProductInfo = getProductInfo;
export const apiGetCarts = getCarts;
export const apiGetPageProducts = getPageProducts;
export const apiPutCartQty = putCartQty;
export const apiDeleteCart = deleteCart;
export const apiPostAddCart = postAddCart;
export const apiGetShopImg = getShopImg;
