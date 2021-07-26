<template>
  <section
    class="not-found-panel d-flex justify-content-center align-items-center"
  >
    <div
      class="
        not-found-content
        d-flex
        flex-column
        justify-content-center
        align-items-center
        rounded
        pb-8
      "
    >
      <h2 class="title text-primary lh-1">404</h2>
      <div class="d-flex align-items-center">
        <span class="sad-icon text-info material-icons-outlined">
          sentiment_dissatisfied
        </span>
        <p class="display-5 mb-0 ms-5">沒有這個路徑!</p>
      </div>
      <router-link to="/home">
        <Button class="fs-4 px-10 py-3 mt-5">回首頁</Button>
      </router-link>
    </div>
  </section>
</template>

<script>
import Button from '@/components/frontend/Button.vue';

export default {
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 15rem;
}
.sad-icon {
  font-size: 10rem;
}
.not-found-panel {
  height: 100vh;
  background: url(https://images.unsplash.com/photo-1522336572468-97b06e8ef143?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80);
}
.not-found-content {
  width: 800px;
  background: rgba(white, 0.7);
}
</style>
