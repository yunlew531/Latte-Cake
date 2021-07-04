<template>
  <div class="rounded bg-white shadow p-12">
    <h2>產品列表</h2>
    <button @click="editProduct">change</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'BackendProducts',
  emits: {
    handStatus: (status) => status === '編輯',
  },
  setup(props, { emit }) {
    const router = useRouter();

    const editProduct = () => {
      emit('handStatus', '編輯');
      router.push('/admin/addProduct');
    };
    return {
      editProduct,
    };
  },
};
</script>

<style>
</style>
