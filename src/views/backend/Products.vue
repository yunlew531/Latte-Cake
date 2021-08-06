<template>
  <div class="rounded bg-white shadow w-100 p-10">
    <Loading v-model:active="isLoading" :is-full-page="false" />
    <div class="d-flex align-items-center">
      <h2>商品列表</h2>
      <div v-if="searchText" class="d-flex align-items-center">
        <div
          class="
            d-flex
            align-items-center
            text-white
            bg-danger
            rounded
            border
            shadow
            ms-5
          "
        >
          <span class="cancel-search-btn material-icons-outlined mt-1px" @click="searchText = ''">
            close
          </span>
          <span class="px-1">{{ searchText }}</span>
        </div>
        <span class="ps-5"
          >搜尋到
          <span class="fs-4 text-danger">{{ displayProducts.length }} </span>
          樣有關 <span class="fs-4 text-danger"> {{ searchText }} </span> 的商品
        </span>
      </div>
    </div>
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
          <tr v-for="(product, key) in displayProducts" :key="product.id">
            <th scope="row">{{ key + 1 }}</th>
            <td class="pe-10">
              <div
                :style="{
                  'background-image': `url(${product.imageUrl || product.imagesUrl[0]})`,
                }"
                class="product-img"
              />
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
              <button type="button" class="btn btn-outline-primary" @click="editProduct(product)">
                編輯
              </button>
              <button type="button" class="btn btn-primary ms-2" @click="deleteProduct(product.id)">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination v-if="!searchText" class="mt-8" :pages="pages" @handPage="handPage" />
    </div>
  </div>
</template>

<script>
import {
  ref, reactive, computed, inject, onUnmounted, toRefs, watch,
} from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { apiGetProducts, apiGetAllAdminProducts, apiDeleteProduct } from '@/api';
import { useToast } from '@/methods';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'BackendProducts',
  props: {
    search: {
      type: String,
    },
  },
  components: {
    Loading,
    Pagination,
  },
  setup(props) {
    const router = useRouter();
    const { search } = toRefs(props);
    const $emitter = inject('$emitter');
    const isLoading = ref(false);

    const pageProducts = reactive({ pageProducts: [] });
    const products = reactive({ products: [] });
    const pages = reactive({ pages: {} });
    const searchText = ref('');

    const handPage = async (page = 1) => {
      isLoading.value = true;
      try {
        const { data } = await apiGetProducts(page);
        if (data.success) {
          products.products = data.products;
          pages.pages = data.pagination;
        }
      } catch (err) {
        console.dir(err);
      }
      isLoading.value = false;
    };

    watch(search, (value) => {
      console.log(value);
    });

    const getAllProducts = async () => {
      try {
        const { data } = await apiGetAllAdminProducts();
        if (data.success) {
          const keysArr = Object.keys(data.products);
          const valuesArr = Object.values(data.products);
          const productsData = keysArr.map((id, key) => ({
            id,
            ...valuesArr[key],
          }));
          products.products = productsData;
        }
      } catch (err) {
        console.dir(err);
      }
    };

    const deleteProduct = async (productId) => {
      isLoading.value = true;
      try {
        const { data } = await apiDeleteProduct(productId);
        if (data.success) {
          useToast('成功刪除!', 'success');
          handPage();
        } else useToast('發生錯誤!', 'danger');
      } catch (err) {
        console.dir(err);
      }
      isLoading.value = false;
    };

    const editProduct = (product) => {
      const tempProduct = JSON.stringify(product);
      $emitter.emit('handStatus', '編輯');
      router.push({
        name: 'AddProduct',
        params: { tempProduct, boardStatus: '編輯' },
      });
    };

    const handSearch = (text) => {
      searchText.value = text;
    };
    watch(
      search,
      (value) => {
        handSearch(value);
      },
      { immediate: true },
    );

    const displayProducts = computed(() => {
      let productsData = null;
      if (searchText.value) {
        productsData = products.products.filter((product) => product.title.match(searchText.value));
      } else productsData = products.products;
      return productsData;
    });

    const init = () => {
      handPage();
      getAllProducts();
      $emitter.on('handSearch', handSearch);
    };
    init();

    onUnmounted(() => {
      $emitter.off('handSearch', handSearch);
      $emitter.emit('removeSearch', '');
    });

    onBeforeRouteLeave((to, from, next) => {
      isLoading.value = false;
      next();
    });

    return {
      ...toRefs(pageProducts),
      ...toRefs(products),
      ...toRefs(pages),
      displayProducts,
      isLoading,
      searchText,
      handPage,
      editProduct,
      deleteProduct,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/mixins';
@import '~@/assets/styleSheets/custom/variables';

.table-panel {
  overflow: scroll;
  padding-bottom: 30px;
}
.table {
  min-width: 1200px;
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
tr:last-child {
  border-bottom: 1px solid $black;
}
.cancel-search-btn {
  cursor: pointer;
}
</style>
