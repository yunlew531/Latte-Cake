import { getCarouselImgs } from './frontend/Index/apiGetCarouselImgs';
import { getCarts } from './frontend/apiGetCarts';
import { getProductInfo } from './frontend/Product/apiGetProductInfo';
import { getPageProducts } from './frontend/Products/apiGetPageProducts';
import putCartQty from './frontend/apiPutCartQty';
import deleteCart from './frontend/apiDeleteCart';
import postAddCart from './frontend/apiPostAddCart';

// frontend
export const apiGetCarouselImgs = getCarouselImgs;
export const apiGetPageProducts = getPageProducts;
export const apiGetProductInfo = getProductInfo;
export const apiGetCarts = getCarts;
export const apiPutCartQty = putCartQty;
export const apiDeleteCart = deleteCart;
export const apiPostAddCart = postAddCart;
export default {};
