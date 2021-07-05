<template>
  <div class="rounded bg-white shadow w-100 p-12">
    <Loading v-model:active="isLoading" :is-full-page="false" />
    <h2>商品列表</h2>
    <div class="table-panel">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th class="pe-8" scope="col">圖片</th>
            <th class="px-8" width="200" scope="col">商品</th>
            <th class="px-8" width="50%" scope="col">內容</th>
            <th class="px-10" width="130" scope="col">狀態</th>
            <th width="130" scope="col">原價</th>
            <th width="130" scope="col">售價</th>
            <th width="130" scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, key) in products" :key="product.id">
            <th scope="row">{{ key + 1 }}</th>
            <td class="pe-10">
              <div
                :style="{ 'background-image': `url(${product.imageUrl})` }"
                class="product-img"
              ></div>
            </td>
            <td class="text-nowrap px-8">{{ product.title }}</td>
            <td class="px-8 lh-1">
              <div class="h-100 d-flex align-items-center">
                <p class="m-0 lh-base tracking-2">
                  {{ product.content }}
                </p>
              </div>
            </td>
            <td class="text-nowrap px-8">
              <span v-if="product.is_enabled" class="text-success">已上架</span>
              <span v-else class="text-danger">未上架</span>
            </td>
            <td class="text-nowrap">NT$ {{ product.origin_price }}</td>
            <td class="text-nowrap">NT$ {{ product.price }}</td>
            <td class="text-nowrap">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="editProduct(product)"
              >
                編輯
              </button>
              <button type="button" class="btn btn-primary ms-2">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { apiGetProducts } from '@/api';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'BackendProducts',
  emits: {
    handStatus: (status) => status.status === '編輯',
  },
  components: {
    Loading,
  },
  setup(props, { emit }) {
    const router = useRouter();

    const isLoading = ref(true);
    const products = reactive({ products: [] });
    apiGetProducts().then(({ data }) => {
      if (data.success) {
        products.products = data.products;
        isLoading.value = false;
      }
    });

    const editProduct = (product) => {
      emit('handStatus', { status: '編輯', product });
      router.push('/admin/addProduct');
    };

    return {
      ...toRefs(products),
      editProduct,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/mixins';
@import '~@/assets/styleSheets/custom/variables';

@include media-breakpoint-down(xxl) {
  .table-panel {
    overflow: scroll;
  }
  .table {
    min-width: 1200px;
  }
}
tbody {
  th,
  td {
    height: 117px;
    overflow: hidden;
    line-height: 100px;
  }
}
.product-img {
  width: 100px;
  height: 100px;
  background: center no-repeat;
  background-size: cover;
}
</style>
