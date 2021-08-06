<template>
  <div class="rounded bg-white shadow w-100 p-10">
    <Loading v-model:active="isLoading" :is-full-page="false" />
    <h2 class="mb-5">{{ boardStatus }}產品</h2>
    <Form v-slot="{ errors }" @submit="addProduct">
      <div class="row">
        <div class="col-lg-4">
          <div class="mb-3">
            <label for="imgs" class="form-label mb-1">新增多圖</label>
            <div class="input-group">
              <input
                id="imgs"
                name="imgs"
                type="text"
                class="form-control"
                placeholder="輸入圖片網址"
                v-model.trim="product.imgsTemp"
              />
              <button type="button" class="text-black btn btn-outline-secondary" @click="addImg">
                新增
              </button>
            </div>
          </div>
          <div class="mb-3">
            <label for="img" class="form-label mb-1">圖片上傳</label>
            <input ref="fileInputEl" @change="upLoadImg" type="file" class="form-control" />
          </div>
          <ul class="product-img-list d-flex flex-wrap list-unstyled py-sm-5 mb-0">
            <li v-if="product.imageUrl" class="product-img position-relative mb-2">
              <img :src="product.imageUrl" class="img-fluid" :alt="product.title" />
              <button
                type="button"
                class="img-close-btn btn p-0 lh-1 position-absolute end-0 top-0"
                @click="product.imageUrl = ''"
              >
                <span class="material-icons-outlined"> close </span>
              </button>
            </li>
            <li
              v-for="(img, key) in product.imagesUrl"
              :key="img + key"
              class="product-img position-relative mb-2"
            >
              <img :src="img" class="img-fluid" :alt="img" />
              <button
                type="button"
                class="img-close-btn btn p-0 lh-1 position-absolute end-0 top-0"
                @click="removeImg(key)"
              >
                <span class="material-icons-outlined"> close </span>
              </button>
            </li>
          </ul>
        </div>
        <div class="col-lg-8">
          <div class="mb-3">
            <label for="title" class="form-label mb-1">名稱</label>
            <Field
              id="title"
              name="名稱"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['名稱'] }"
              placeholder="請輸入 名稱"
              rules="required"
              v-model.trim="product.title"
            />
            <ErrorMessage name="名稱" class="invalid-feedback" />
          </div>
          <div class="row">
            <div class="col-6">
              <div class="mb-3">
                <label for="category" class="form-label mb-1">分類</label>
                <Field
                  id="category"
                  name="分類"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['分類'] }"
                  placeholder="請輸入 分類"
                  rules="required"
                  v-model.trim="product.category"
                />
                <ErrorMessage name="分類" class="invalid-feedback" />
              </div>
            </div>
            <div class="col-6">
              <div class="mb-3">
                <label for="unit" class="form-label mb-1">單位</label>
                <Field
                  id="unit"
                  name="單位"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['單位'] }"
                  placeholder="請輸入 單位"
                  rules="required"
                  v-model.trim="product.unit"
                />
                <ErrorMessage name="單位" class="invalid-feedback" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="mb-3">
                <label for="origin_price" class="form-label mb-1">原價</label>
                <Field
                  id="origin_price"
                  name="原價"
                  type="number"
                  class="form-control"
                  :class="{ 'is-invalid': errors['原價'] }"
                  placeholder="請輸入 原價"
                  rules="required"
                  min="0"
                  v-model.number="product.origin_price"
                />
                <ErrorMessage name="原價" class="invalid-feedback" />
              </div>
            </div>
            <div class="col-6">
              <div class="mb-3">
                <label for="price" class="form-label mb-1">售價</label>
                <Field
                  id="price"
                  name="售價"
                  type="number"
                  class="form-control"
                  :class="{ 'is-invalid': errors['售價'] }"
                  placeholder="請輸入 售價"
                  rules="required"
                  min="0"
                  v-model.number="product.price"
                />
                <ErrorMessage name="售價" class="invalid-feedback" />
              </div>
            </div>
          </div>
          <div class="dropdown-divider my-5" />
          <div class="mb-3">
            <label for="description" class="form-label mb-1">產品描述</label>
            <textarea
              id="description"
              name="產品描述"
              class="form-control"
              placeholder="請輸入 產品描述"
              v-model.trim="product.description"
              cols="30"
              rows="3"
            />
          </div>
          <div class="mb-3">
            <label for="content" class="form-label mb-1">產品內容</label>
            <textarea
              id="content"
              name="產品內容"
              class="form-control"
              placeholder="請輸入 產品內容"
              v-model.trim="product.content"
              cols="30"
              rows="3"
            />
          </div>
          <div class="d-flex align-items-center mt-4">
            <div class="me-auto">
              <input
                id="freeDelivery"
                type="checkbox"
                class="form-check-input"
                v-model="product.freeDelivery"
              />
              <label for="freeDelivery" class="ms-2 me-10 me-sm-0">免運費</label>
              <input
                id="is_enabled"
                type="checkbox"
                class="form-check-input ms-0 ms-sm-5"
                v-model="product.is_enabled"
              />
              <label for="is_enabled" class="ms-2">啟用上架</label>
            </div>
            <button
              v-if="boardStatus === '編輯'"
              type="button"
              @click="handStatus"
              class="btn btn-outline-primary text-nowrap mx-3"
            >
              取消
            </button>
            <button type="submit" class="btn btn-primary text-nowrap">
              送出
            </button>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import {
  ref, reactive, toRefs, onUnmounted, watch, inject,
} from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { useToast } from '@/methods';
import { apiPostUploadImg, apiPostAddProduct, apiPutEditProduct } from '@/api';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'AddProduct',
  components: {
    Loading,
  },
  props: {
    boardStatus: {
      type: String,
      default: '新增',
    },
    tempProduct: {
      type: String,
    },
  },
  setup(props) {
    const { boardStatus, tempProduct } = toRefs(props);
    const router = useRouter();
    const $emitter = inject('$emitter');

    const isLoading = ref(false);

    const product = reactive({ product: { imgs: [] } });
    const addImg = () => {
      const prod = product.product;
      if (!prod.imagesUrl) prod.imagesUrl = [];
      if (!prod.imgsTemp) useToast('請輸入網址!', 'danger');
      else if (
        (prod.imageUrl && prod.imagesUrl.length >= 4)
        || (!prod.imageUrl && prod.imagesUrl.length >= 5)
      ) {
        useToast('已達圖片上限!', 'danger');
      } else prod.imagesUrl.push(prod.imgsTemp);
      prod.imgsTemp = '';
    };

    const addProduct = async () => {
      isLoading.value = true;
      const prod = product.product;
      const productData = {
        title: prod.title,
        category: prod.category,
        origin_price: prod.origin_price,
        price: prod.price,
        unit: prod.unit,
        description: prod.description,
        content: prod.content,
        is_enabled: prod.is_enabled,
        imageUrl: prod.imageUrl,
        imagesUrl: prod.imagesUrl,
        freeDelivery: prod.freeDelivery,
      };
      const method = boardStatus.value === '新增' ? apiPostAddProduct : apiPutEditProduct;
      const { id } = product.product;
      try {
        const { data } = await method(productData, id);
        if (data.success) {
          useToast(boardStatus.value === '新增' ? '新增成功!' : '完成更新!', 'success');
          router.push('/admin/products');
        } else useToast('發生錯誤!', 'danger');
      } catch (err) {
        console.dir(err);
      }
      isLoading.value = false;
    };

    const removeImg = (key) => {
      product.product.imagesUrl.splice(key, 1);
    };

    const fileInputEl = ref(null);
    const upLoadImg = async () => {
      isLoading.value = true;
      const formData = new FormData();
      formData.append('file-to-upload', fileInputEl.value.files[0]);
      try {
        const { data } = await apiPostUploadImg(formData);
        if (data.success) {
          product.product.imageUrl = data.imageUrl;
          fileInputEl.value.value = '';
          useToast('成功上傳!', 'success');
        } else useToast(data.message, 'danger');
      } catch (err) {
        console.dir(err);
      }
      isLoading.value = false;
    };

    const handStatus = () => {
      $emitter.emit('handStatus', '新增');
      router.push('/admin/products');
    };

    watch(
      tempProduct,
      (value) => {
        if (value) {
          product.product = JSON.parse(value);
        }
      },
      { immediate: true },
    );

    onUnmounted(() => {
      $emitter.emit('handStatus', '新增');
    });

    onBeforeRouteLeave((to, from, next) => {
      isLoading.value = false;
      next();
    });

    return {
      ...toRefs(product),
      fileInputEl,
      isLoading,
      addImg,
      addProduct,
      removeImg,
      upLoadImg,
      handStatus,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.img-close-btn {
  color: $black;
  &:hover {
    color: $primary;
  }
}
.product-img-list {
  margin-right: -10px;
}
.product-img {
  width: calc((100% - 20px) / 2);
  margin-right: 10px;
}
</style>
