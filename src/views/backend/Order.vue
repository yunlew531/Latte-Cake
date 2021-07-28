<template>
  <Modal ref="msgModalEl" @onDelete="deleteOrder" />
  <section class="rounded bg-white shadow w-100 p-10">
    <Loading v-model:active="isLoading" :is-full-page="false" />
    <div>
      <router-link to="/admin/orders" class="btn btn-sm btn-outline-primary mb-3"
        >返回訂單列表</router-link
      >
      <div class="d-flex flex-wrap">
        <h3 class="fs-5 me-auto"><span class="fs-6 me-2">訂單編號:</span>{{ order.id }}</h3>
        <span class="fs-5">
          <span class="fs-6 me-2">成立時間:</span>{{ useTranslateTime(order.create_at) }}</span
        >
      </div>
      <div class="d-flex align-items-center mb-5">
        <h4 class="fs-6 d-flex align-items-center m-0 me-2">
          狀態:
          <span v-show="!isEdit">
            <span v-if="order.is_paid" class="text-success d-flex align-items-center">
              <span class="material-icons-outlined"> done </span>
              <span>已付款</span>
            </span>
            <span v-else class="text-danger d-flex align-items-center">
              <span class="material-icons-outlined"> close </span>
              <span>未付款</span>
            </span>
          </span>
        </h4>
        <div v-show="isEdit" class="form-check form-switch mb-0">
          <input
            class="switch-paid form-check-input"
            type="checkbox"
            :checked="tempOrder.is_paid"
            v-model="tempOrder.is_paid"
          />
          <span
            v-show="tempOrder.is_paid"
            class="switch-paid text-success"
            @click="tempOrder.is_paid = !tempOrder.is_paid"
            >已付款</span
          >
          <span
            v-show="!tempOrder.is_paid"
            class="switch-paid text-danger"
            @click="tempOrder.is_paid = !tempOrder.is_paid"
            >未付款</span
          >
        </div>
      </div>
      <ul class="list-unstyled bg-white-100 border rounded my-5">
        <li class="user-item d-flex">
          <span class="user-title px-5 py-2">姓名</span
          ><span class="px-5 py-2">{{ order.user.name }}</span>
        </li>
        <li class="user-item d-flex">
          <span class="user-title px-5 py-2">電話</span
          ><span class="px-5 py-2">{{ order.user.tel }}</span>
        </li>
        <li class="user-item d-flex">
          <span class="user-title px-5 py-2 ">信箱</span
          ><span class="px-5 py-2">{{ order.user.email }}</span>
        </li>
        <li class="user-item d-flex">
          <span class="user-title px-5 py-2">地址</span
          ><span class="px-5 py-2">{{ order.user.address }}</span>
        </li>
      </ul>
      <ul class="list-unstyled row g-6">
        <li v-for="product in order.products" :key="product.id" class="col-lg-6">
          <div class="bg-white-100 border rounded p-5">
            <div class="d-flex flex-wrap align-items-center mb-3">
              <h2 class="fs-5 m-0 me-auto">
                <router-link
                  :to="`/product/${product.product.id}`"
                  class="product-name text-decoration-none"
                  >{{ product.product.title }}</router-link
                >
              </h2>
              <span class="fs-7"
                >id: <span class="fs-6">{{ product.product.id }}</span>
              </span>
            </div>
            <div class="d-flex flex-wrap">
              <img
                :src="product.product.imageUrl || product.product.imagesUrl[0]"
                :alt="product.product.title"
                class="product-img rounded me-8"
              />
              <div class="flex-grow-1 mt-5 mt-sm-0">
                <h4 class="fs-6">類別: {{ product.product.category }}</h4>
                <p class="d-flex flex-wrap align-items-center mb-2">
                  <span class="me-auto"
                    >原價: {{ product.product.origin_price?.toLocaleString() }}</span
                  >
                  <span>售價: {{ product.product.price?.toLocaleString() }}</span>
                </p>
                <p class="mb-2">數量: {{ product.qty }}</p>
                <p class="mb-2">金額: {{ product.total?.toLocaleString() }}</p>
                <p class="mb-2">
                  折扣後金額:
                  <span class="fs-5">{{ product.final_total?.toLocaleString() }}</span>
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="d-flex flex-wrap align-items-center">
        <div>
          <button v-show="!isEdit" type="button" class="btn btn-primary" @click="editOrder">
            編輯
          </button>
          <button
            v-show="isEdit"
            type="button"
            class="btn btn-outline-primary me-3"
            @click="cancelEditOrder"
          >
            取消
          </button>
          <button
            v-show="isEdit"
            type="button"
            class="btn btn-primary me-3"
            @click="saveEditOrder(order.id)"
          >
            儲存
          </button>
        </div>
        <button
          v-show="isEdit"
          type="button"
          class="
            btn btn-primary
            px-10
            me-auto
          "
          @click="showModal"
        >
          刪除
        </button>
        <p class="fs-6 ms-3 mb-0">
          總計: NT$
          <span v-show="!isEdit" class="fs-3">{{ order.total?.toLocaleString() }} </span>
          <input
            v-show="isEdit"
            type="number"
            class="price-input fs-3 text-end ps-2 mt-5 mt-sm-0"
            min="0"
            v-model.number="tempOrder.total"
          />
          元
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import {
  ref, reactive, toRefs, watch,
} from 'vue';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import { apiPutEditOrder, apiDelOrder, apiGetCustOrder } from '@/api';
import { useToast, useTranslateTime } from '@/methods';

import Modal from '@/components/Modal.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'BackendOrder',
  components: {
    Loading,
    Modal,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isLoading = ref(false);
    const isEdit = ref(false);
    let orderId = route.params.id;

    const order = reactive({ order: { user: {} } });
    const getOrder = async (id) => {
      isLoading.value = true;
      try {
        const { data } = await apiGetCustOrder(id);
        if (data.success) order.order = data.order;
        else {
          useToast('找不到訂單!', 'danger');
          router.push('/admin/orders');
        }
      } catch (err) {
        console.dir(err);
      }
      isLoading.value = false;
    };

    const tempOrder = reactive({ tempOrder: {} });
    const saveEditOrder = async () => {
      isLoading.value = true;
      try {
        const { data } = await apiPutEditOrder(orderId, {
          data: tempOrder.tempOrder,
        });
        if (data.success) {
          useToast('成功更新訂單!');
          await getOrder(orderId);
          isEdit.value = false;
        } else useToast(data.message, 'dnager');
      } catch (err) {
        console.dir(err);
      }
      isLoading.value = false;
    };

    const msgModalEl = ref(null);
    const deleteOrder = async () => {
      try {
        const { data } = await apiDelOrder(orderId);
        if (data.success) {
          useToast('已刪除訂單!');
          router.push('/admin/orders');
        } else useToast(data.message, 'danger');
      } catch (err) {
        console.dir(err);
      }
      msgModalEl.value.hideModal();
    };

    const editOrder = () => {
      isEdit.value = true;
      tempOrder.tempOrder = { ...order.order };
    };

    const cancelEditOrder = () => {
      isEdit.value = false;
    };

    const showModal = () => {
      msgModalEl.value.showModal({
        title: '刪除訂單',
        content: '是否刪除訂單? 刪除後無法恢復。',
      });
    };

    watch(
      () => route.params.id,
      (id) => {
        orderId = id;
        getOrder(id);
      },
    );

    const init = () => {
      getOrder(orderId);
    };
    init();

    onBeforeRouteLeave((to, from, next) => {
      isLoading.value = false;
      next();
    });

    return {
      ...toRefs(order),
      ...toRefs(tempOrder),
      msgModalEl,
      isEdit,
      isLoading,
      useTranslateTime,
      saveEditOrder,
      deleteOrder,
      editOrder,
      cancelEditOrder,
      showModal,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';
@import '~bootstrap/scss/mixins';

.user-item {
  flex-wrap: wrap;
  border-top: $gray-300 solid 1px;
  border-bottom: $gray-300 solid 1px;
  margin-bottom: -1px;
  &:first-child {
    border-top: 0;
  }
  &:last-child {
    border-bottom: 0;
  }
}
.user-title {
  flex-shrink: 0;
  width: 150px;
  background: shade-color($white, 5%);
  @include media-breakpoint-down(sm) {
    width: 100%;
  }
}
.product-name {
  color: $primary;
  &:hover {
    color: tint-color($primary, 30%);
  }
}
.product-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
}
.price-input {
  width: 150px;
  &::-webkit-inner-spin-button {
    margin-left: 5px;
  }
}
.switch-paid {
  cursor: pointer;
}
</style>
