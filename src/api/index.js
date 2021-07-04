import getShopImg from './frontend/AboutUs';
import getProductInfo from './frontend/Product';
import { getCarts, putCartQty, deleteCart, postAddCart } from './frontend/shared';
import postLogin from './backend/Login';
import postCheck from './backend/Backstage';
import getPageProducts from './frontend/Products';
import { postUploadImg, postAddProduct } from './backend/AddProduct/index';

// frontend
export const apiGetProductInfo = getProductInfo;
export const apiGetCarts = getCarts;
export const apiGetPageProducts = getPageProducts;
export const apiPutCartQty = putCartQty;
export const apiDeleteCart = deleteCart;
export const apiPostAddCart = postAddCart;
export const apiGetShopImg = getShopImg;

// backend
export const apiPostLogin = postLogin;
export const apiPostCheck = postCheck;
export const apiPostUploadImg = postUploadImg;
export const apiPostAddProduct = postAddProduct;
