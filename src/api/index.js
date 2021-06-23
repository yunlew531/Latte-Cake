import getProductInfo from './frontend/Product/apiGetProductInfo';
import putCartQty from './frontend/apiPutCartQty';
import deleteCart from './frontend/apiDeleteCart';
import postAddCart from './frontend/apiPostAddCart';

// frontend
export const apiGetProductInfo = getProductInfo;
export const apiPutCartQty = putCartQty;
export const apiDeleteCart = deleteCart;
export const apiPostAddCart = postAddCart;
export default {};
