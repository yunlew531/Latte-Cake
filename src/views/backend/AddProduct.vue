<template>
  <h2 class="mb-5">新增產品</h2>
  <Form v-slot="{ errors }" @submit="onSubmit">
    <div class="row">
      <div class="col-4">
        <div class="mb-3">
          <label for="imgs" class="form-label mb-1">新增多圖</label>
          <input
            id="imgs"
            name="imgs"
            type="text"
            class="form-control"
            placeholder="輸入圖片網址"
            v-model="user.imgs"
          />
        </div>
        <div class="mb-3">
          <label for="img" class="form-label mb-1">圖片上傳</label>
          <input id="img" name="img" type="file" class="form-control" />
        </div>
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
            v-model="user.title"
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
                v-model="user.category"
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
                v-model="user.unit"
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
                v-model="user.originPrice"
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
                v-model="user.price"
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
            v-model="user.description"
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
            v-model="user.content"
            cols="30"
            rows="3"
          ></textarea>
        </div>
        <div class="d-flex mt-4">
          <div class="me-auto">
            <input
              id="deliveryFree"
              type="checkbox"
              class="form-check-input"
              v-model="user.deliveryFree"
            />
            <label for="deliveryFree" class="ms-2">免運費</label>
            <input
              id="enabled"
              type="checkbox"
              class="form-check-input ms-5"
              v-model="user.enabled"
            />
            <label for="enabled" class="ms-2">啟用上架</label>
          </div>
          <button class="btn btn-primary" type="submit">送出</button>
        </div>
      </div>
    </div>
  </Form>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'AddProduct',
  setup() {
    const user = reactive({});

    const onSubmit = () => {
      console.log('Submit');
    };

    return {
      user,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
