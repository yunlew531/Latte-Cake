<template>
  <section class="d-flex justify-content-center pb-8">
    <nav aria-label="Page navigation example">
      <ul class="pagination m-0">
        <li
          class="page-item"
          :class="{ disabled: pagination.pagination.current_page === 1 }"
        >
          <a
            class="page-link"
            href="javascript:;"
            aria-label="Previous"
            @click="handPage(-1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in pagination.pagination.total_pages"
          :key="page"
          class="page-item"
          :class="[{ active: page === pagination.pagination.current_page }]"
        >
          <a
            class="page-link"
            href="javascript:;"
            @click="handPage(page, true)"
            >{{ page }}</a
          >
        </li>
        <li
          class="page-item"
          :class="{
            disabled:
              pagination.pagination.current_page ===
              pagination.pagination.total_pages,
          }"
        >
          <a
            class="page-link"
            href="javascript:;"
            aria-label="Next"
            @click="handPage(1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import { reactive, watch } from 'vue';

export default {
  name: 'Pagination',
  props: {
    pages: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const pagination = reactive({ pagination: {} });

    const handPage = (num, isPage) => {
      let page = 1;
      const { pagination: p } = pagination;
      if (isPage) {
        if (p.current_page === num) return;
        page = num;
      } else if (p.current_page + num >= p.total_pages) {
        page = p.total_pages;
      }
      emit('handPage', page);
    };

    watch(
      () => props.pages,
      () => {
        pagination.pagination = props.pages.pagination;
      },
      { deep: true }
    );

    return {
      pagination,
      handPage,
    };
  },
};
</script>

<style>
</style>
