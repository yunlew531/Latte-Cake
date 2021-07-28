<template>
  <div class="row">
    <div class="col-8">
      <div class="rounded bg-white shadow w-100 p-10 position-relative">
        <Loading v-model:active="isGetCouponsLoading" :is-full-page="false" :opacity="0.9" />
        <h2 class="mb-3">優惠券</h2>
        <ul class="list-unstyled">
          <li
            v-for="coupon in coupons"
            :key="coupon.id"
            class="coupon-item d-flex mb-5"
            :class="[
              { active: coupon.id === tempCoupon.id && isEdit },
              { shade: coupon.id !== tempCoupon.id && isEdit },
            ]"
          >
            <div class="w-50 d-flex flex-column py-2">
              <div class="coupon-papper h-100 p-8">
                <div class="d-flex text-white">
                  <h4 class="fs-6 fst-italic fw-light align-self-end">
                    優惠券
                  </h4>
                  <h3 class="flex-grow-1 text-center">{{ coupon.title }}</h3>
                </div>
                <span class="fs-1 fst-italic text-warning text-center d-block"
                  >{{ coupon.percent }} %</span
                >
                <p class="fs-4 text-white lh-1 d-flex justify-content-end m-0">
                  <span class="fs-6 fw-light align-self-end">優惠碼</span>
                  <span class="ms-3">{{ coupon.code }}</span>
                </p>
              </div>
            </div>
            <div
              class="
                coupon-package
                d-flex
                justify-content-center
                align-items-center
                flex-column
                w-50
                p-3
                text-center
              "
            >
              <div class="d-flex flex-column justify-content-center flex-grow-1">
                <span class="fs-6 text-black-200 d-block mb-1">編號: {{ coupon.id }}</span>
                <span class="fs-6 d-block">到期日</span>
                <span class="fs-2 d-block">
                  {{ useTranslateTime(coupon.due_date).split(' ')[0] }}
                </span>
                <div class="fs-5">
                  <span v-if="coupon.is_enabled" class="text-success">已啟用</span
                  ><span v-else class="text-danger">未啟用</span>
                </div>
              </div>
              <div class="w-100 d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-sm align-self-center btn-outline-danger"
                  @click="editCoupon($event, coupon)"
                  :disabled="isEdit && coupon.id !== tempCoupon.id"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-sm align-self-center btn-danger ms-2"
                  :disabled="isEdit && coupon.id !== tempCoupon.id"
                  @click="deleteCoupon(coupon.id)"
                >
                  刪除
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-4">
      <div
        class="
          add-coupon-panel
          rounded
          bg-white
          shadow
          w-100
          p-10
          position-sticky
        "
      >
        <Loading v-model:active="isAddCouponLoading" :is-full-page="false" />
        <span v-if="!isEdit" class="fs-2 d-block mb-1">新增優惠券</span>
        <div v-else class="mb-3">
          <span class="fs-2 d-block mb-1">編輯優惠券</span>
          <span class="fs-6 d-block mb-1"> 編號</span>
          <span class="fs-6 d-block"> {{ tempCoupon.id }} </span>
        </div>
        <Form v-slot="{ errors, resetForm }" @submit="handSubmit">
          <div class="mb-3">
            <label for="name" class="form-label mb-1">名稱</label>
            <Field
              id="name"
              name="名稱"
              rules="required"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['名稱'] }"
              placeholder="請輸入 名稱"
              v-model.trim="tempCoupon.title"
            ></Field>
            <ErrorMessage name="名稱" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="percent" class="form-label mb-1">折扣 % 數</label>
            <Field
              id="percent"
              name="折扣"
              rules="required"
              type="number"
              class="form-control"
              :class="{ 'is-invalid': errors['折扣'] }"
              placeholder="請輸入 折扣 ex: 80"
              min="0"
              v-model.number="tempCoupon.percent"
            ></Field>
            <ErrorMessage name="折扣" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="coupon-code" class="form-label mb-1">優惠碼</label>
            <Field
              id="coupon-code"
              name="優惠碼"
              rules="required"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['優惠碼'] }"
              placeholder="請輸入 優惠碼"
              v-model.trim="tempCoupon.code"
            ></Field>
            <ErrorMessage name="優惠碼" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="coupon-date" class="form-label d-block mb-1">到期日</label>
            <input id="oupon-date" type="date" v-model="tempCoupon.due_date" />
          </div>
          <div class="d-flex align-items-center">
            <div class="fs-5 me-auto">
              <input
                id="coupon-enabled"
                type="checkbox"
                v-model="tempCoupon.is_enabled"
                :true-value="1"
                :false-value="0"
              />
              <label for="coupon-enabled" class="form-label m-0 ms-2">啟用</label>
            </div>
            <button v-show="!isEdit" class="btn btn-primary" type="submit">
              新增
            </button>
            <button
              v-show="isEdit"
              class="btn btn-outline-primary me-2"
              type="button"
              @click="cancelEdit(resetForm)"
            >
              取消
            </button>
            <button v-show="isEdit" class="btn btn-primary" type="submit">
              儲存
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
import {
  apiPostAddCoupon, apiGetCoupons, apiPutEditCoupon, apiDeleteCoupon,
} from '@/api';
import { useTranslateTime, useToast } from '@/methods';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    Loading,
  },
  setup() {
    const coupons = reactive({ coupons: [] });
    const tempCoupon = reactive({ tempCoupon: { is_enabled: 1 } });
    const isEdit = ref(false);
    const isAddCouponLoading = ref(false);
    const isGetCouponsLoading = ref(false);

    const getCoupons = async () => {
      isGetCouponsLoading.value = true;
      try {
        const { data } = await apiGetCoupons();
        if (data.success) coupons.coupons = data.coupons;
        else useToast('無法取得', 'danger');
      } catch (err) {
        console.dir(err);
      }
      isGetCouponsLoading.value = false;
    };

    const initCouponForm = () => {
      let date = Date.now() / 1000;
      date = useTranslateTime(date, 'dash');
      tempCoupon.tempCoupon = {
        title: '',
        percent: '',
        code: '',
        is_enabled: 1,
        due_date: date,
      };
    };

    const cancelEdit = (resetForm) => {
      initCouponForm();
      resetForm();
      isEdit.value = false;
    };

    const submitAddCoupon = async () => {
      isAddCouponLoading.value = true;
      const data = { ...tempCoupon.tempCoupon };
      data.due_date = Date.parse(data.due_date) / 1000;
      try {
        const { data: resData } = await apiPostAddCoupon(data);
        if (resData.success) {
          useToast('成功新增');
          getCoupons();
          initCouponForm();
        } else useToast(resData.message[0], 'danger');
      } catch (err) {
        console.dir(err);
      }
      isAddCouponLoading.value = false;
    };

    const submitEditCoupon = async () => {
      isEdit.value = false;
      isAddCouponLoading.value = true;
      const time = Date.parse(tempCoupon.tempCoupon.due_date) / 1000;
      const temp = { ...tempCoupon.tempCoupon };
      temp.due_date = time;
      try {
        const { data } = await apiPutEditCoupon(temp.id, temp);
        if (data.success) {
          useToast('成功更新');
          getCoupons();
          initCouponForm();
        } else useToast('發生錯誤!', 'danger');
      } catch (err) {
        console.dir(err);
      }
      isAddCouponLoading.value = false;
    };

    const handSubmit = (value, { resetForm }) => {
      resetForm();
      if (isEdit.value) submitEditCoupon();
      else submitAddCoupon();
    };

    const editCoupon = ($event, coupon) => {
      const el = $event.target.closest('li');
      const domPositionCenter = el.offsetTop - el.offsetHeight;
      window.scrollTo(0, domPositionCenter);
      isEdit.value = true;
      const temp = { ...coupon };
      const dueDate = useTranslateTime(temp.due_date, 'dash');
      temp.due_date = dueDate;
      tempCoupon.tempCoupon = temp;
    };

    const deleteCoupon = async (id) => {
      isGetCouponsLoading.value = true;
      try {
        const { data } = await apiDeleteCoupon(id);
        if (data.success) {
          useToast(data.message);
          getCoupons();
        } else useToast(data.message, 'danger');
      } catch (err) {
        console.dir(err);
      }
      isGetCouponsLoading.value = false;
    };

    const init = () => {
      getCoupons();
      initCouponForm();
    };
    init();

    return {
      ...toRefs(coupons),
      ...toRefs(tempCoupon),
      isEdit,
      isAddCouponLoading,
      isGetCouponsLoading,
      useTranslateTime,
      handSubmit,
      editCoupon,
      deleteCoupon,
      cancelEdit,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

.add-coupon-panel {
  top: 125px;
}

.coupon-item {
  transition: 0.3s ease-out;
  &.active {
    transform: scale(1.1);
    .coupon-papper,
    .coupon-package {
      box-shadow: 3px 3px 10px tint-color($primary, 60%);
    }
  }
  &.shade {
    filter: blur(2px);
  }
}

.coupon-papper {
  background: $danger;
  position: relative;
  transition: 0.3s ease-out;
  &::before {
    content: '';
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translateX(-50%) translateY(-50%);
    border: 2px dashed $white;
  }
}

.coupon-package {
  background: shade-color($white-100, 10%);
  border: 1px solid shade-color($white-100, 15%);
  transition: 0.3s ease-out;
}
</style>
