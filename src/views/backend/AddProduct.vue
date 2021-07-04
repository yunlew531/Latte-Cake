<template>
  <div class="rounded bg-white shadow p-10">
    <h2 class="mb-5">{{ boardStatus }}產品</h2>
    <Form v-slot="{ errors }" @submit="addProduct">
      <div class="row">
        <div class="col-4">
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
              <button
                type="button"
                class="text-black btn btn-outline-secondary"
                @click="addImg"
              >
                新增
              </button>
            </div>
          </div>
          <div class="mb-3">
            <label for="img" class="form-label mb-1">圖片上傳</label>
            <input
              ref="fileInput"
              @change="upLoadImg"
              type="file"
              class="form-control"
            />
          </div>
          <ul class="list-unstyled m-0">
            <li v-if="product.img" class="position-relative mb-2">
              <img :src="product.img" class="img-fluid" />
              <button
                type="button"
                class="img-close-btn btn p-0 lh-1 position-absolute end-0 top-0"
                @click="product.img = ''"
              >
                <span class="material-icons-outlined"> close </span>
              </button>
            </li>
            <li
              v-for="(img, key) in product.imgs"
              :key="img + key"
              class="position-relative mb-2"
            >
              <img :src="img" class="img-fluid" />
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
        <div class="col-8">
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
            ></Field>
            <error-message name="名稱" class="invalid-feedback"></error-message>
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
                ></Field>
                <error-message
                  name="分類"
                  class="invalid-feedback"
                ></error-message>
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
                ></Field>
                <error-message
                  name="單位"
                  class="invalid-feedback"
                ></error-message>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="mb-3">
                <label for="originPrice" class="form-label mb-1">原價</label>
                <Field
                  id="originPrice"
                  name="原價"
                  type="number"
                  class="form-control"
                  :class="{ 'is-invalid': errors['原價'] }"
                  placeholder="請輸入 原價"
                  rules="required"
                  v-model.number="product.originPrice"
                ></Field>
                <error-message
                  name="原價"
                  class="invalid-feedback"
                ></error-message>
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
                  v-model.number="product.price"
                ></Field>
                <error-message
                  name="售價"
                  class="invalid-feedback"
                ></error-message>
              </div>
            </div>
          </div>
          <div class="dropdown-divider my-5"></div>
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
            ></textarea>
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
            ></textarea>
          </div>
          <div class="d-flex mt-4">
            <div class="me-auto">
              <input
                id="freeDelivery"
                type="checkbox"
                class="form-check-input"
                v-model="product.freeDelivery"
              />
              <label for="freeDelivery" class="ms-2">免運費</label>
              <input
                id="enabled"
                type="checkbox"
                class="form-check-input ms-5"
                v-model="product.enabled"
              />
              <label for="enabled" class="ms-2">啟用上架</label>
            </div>
            <button class="btn btn-primary" type="submit">送出</button>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import store from '@/composition/store';
import { useToast } from '@/methods';
import { apiPostUploadImg, apiPostAddProduct } from '@/api';

const { setIsLoading } = store;

export default {
  name: 'AddProduct',
  props: {
    boardStatus: {
      type: String,
      default: '新增',
    },
  },
  setup() {
    const product = reactive({
      imgs: [],
    });
    const fileInput = ref(null);

    const addImg = () => {
      if (!product.imgsTemp) {
        useToast('請輸入網址!', 'danger');
      } else if (
        (product.img && product.imgs.length >= 4) ||
        (!product.img && product.imgs.length >= 5)
      ) {
        useToast('已達圖片上限!', 'danger');
      } else product.imgs.push(product.imgsTemp);
      product.imgsTemp = '';
    };

    const addProduct = async () => {
      const productData = {
        title: product.title,
        category: product.category,
        origin_price: product.originPrice,
        price: product.price,
        unit: product.unit,
        description: product.description,
        content: product.content,
        is_enabled: product.enabled,
        imageUrl: product.img,
        imagesUrl: product.imgs,
        freeDelivery: product.freeDelivery,
      };
      try {
        const { data } = await apiPostAddProduct(productData);
        console.log(data);
        if (data.success) {
          useToast('新增成功!', 'success');
        } else useToast('發生錯誤!', 'danger');
      } catch (err) {
        console.dir(err);
      }
    };

    const removeImg = (key) => {
      product.imgs.splice(key, 1);
    };

    const onSubmit = () => {
      console.log('Submit');
    };

    const upLoadImg = async () => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file-to-upload', fileInput.value.files[0]);
      try {
        const { data } = await apiPostUploadImg(formData);
        if (data.success) {
          product.img = data.imageUrl;
          fileInput.value.value = '';
        } else useToast(data.message, 'danger');
        setIsLoading(false);
      } catch (err) {
        console.dir(err);
      }
    };

    return {
      product,
      fileInput,
      onSubmit,
      addImg,
      removeImg,
      upLoadImg,
      addProduct,
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
</style>
