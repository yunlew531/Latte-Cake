<template>
  <div ref="msgModal" class="modal fade" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content">
        <Loading v-model:active="isLoading" :is-full-page="false" />
        <div class="modal-header">
          <slot name="title">
            <h5 class="modal-title">{{ msg.title }}</h5>
          </slot>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <p>{{ msg.content }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-info" data-bs-dismiss="modal">
            取消
          </button>
          <slot name="button">
            <button type="button" class="btn btn-primary" @click="onDelete">
              刪除
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/src/modal';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      modal: null,
      msg: {
        title: '',
        content: '',
      },
    };
  },
  methods: {
    showModal(msg) {
      this.msg = msg;
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    onDelete() {
      this.isLoading = true;
      this.$emit('onDelete');
    },
    closeLoading() {
      this.isLoading = false;
    },
  },
  mounted() {
    const el = this.$refs.msgModal;
    this.modal = new Modal(el, {
      keyboard: false,
    });
    document.body.appendChild(el);
    el.addEventListener('hidden.bs.modal', this.closeLoading);
  },
  beforeUnmount() {
    const el = this.$refs.msgModal;
    document.body.removeChild(el);
    el.removeEventListener('hidden.bs.modal', this.closeLoading);
  },
};
</script>
