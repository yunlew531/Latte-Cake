import getShopImg from './frontend/AboutUs';
import getProductInfo from './frontend/Product';
import { getCarts, putCartQty, deleteCart, postAddCart } from './frontend/shared';
import postLogin from './backend/Login';
import { postCheck, getUser } from './backend/Backstage';
import getPageProducts from './frontend/Products';
import { postUploadImg, postAddProduct, putEditProduct } from './backend/AddProduct/index';
import LogOut from './backend/shared/index';
import { getProducts } from './backend/Products';
import { getOrders } from './backend/Orders';
import putEditOrder from './backend/Order';
import { postAddCoupon, getCoupons, editCoupon, deleteCoupon } from './backend/Coupon';

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
export const apiGetUser = getUser;
export const apiPostUploadImg = postUploadImg;
export const apiPostAddProduct = postAddProduct;
export const apiLogOut = LogOut;
export const apiGetProducts = getProducts;
export const apiPutEditProduct = putEditProduct;
export const apiGetOrders = getOrders;
export const apiPutEditOrder = putEditOrder;
export const apiPostAddCoupon = postAddCoupon;
export const apiGetCoupons = getCoupons;
export const apiPutEditCoupon = editCoupon;
export const apiDeleteCoupon = deleteCoupon;
