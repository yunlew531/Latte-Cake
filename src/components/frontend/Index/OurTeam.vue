<template>
  <section class="bg-info overflow-hidden">
    <div ref="ourTeamEl" class="our-team" :class="{ active: isScrollTo }">
      <div class="bg-filter">
        <div class="container py-25">
          <h3 class="title text-center text-white">
            我們的專業 <span class="fw-bold text-danger">廚師</span>
          </h3>
          <ul class="row list-unstyled g-8 pt-8">
            <li
              v-for="chef in chefs"
              :key="chef.name"
              class="col-md-6 col-lg-4 chef-card position-relative"
            >
              <img class="img-fluid" :src="chef.url" :alt="chef.name" />
              <div
                class="
                  card-content
                  text-center
                  bg-white-100
                  position-absolute
                  bottom-0
                  start-50
                  shadow
                  rounded-1
                  p-5
                "
              >
                <h4 class="chef-name fs-5 pb-2 m-0">{{ chef.name }}</h4>
                <span class="fs-7 text-black-200 d-block py-2">{{ chef.position }}</span>
                <div>
                  <a href="javascript:;" class="link-icon">
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a href="javascript:;" class="link-icon ms-2">
                    <i class="bi bi-instagram"></i>
                  </a>
                  <a href="javascript:;" class="link-icon ms-2">
                    <i class="bi bi-twitter"></i>
                  </a>
                  <a href="javascript:;" class="link-icon ms-2">
                    <i class="bi bi-google"></i>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  ref, reactive, inject, watch,
} from 'vue';

export default {
  setup() {
    const chefs = reactive([
      {
        name: 'ANDERSON',
        url:
          'https://images.unsplash.com/photo-1611728022556-d1475c4ce9d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=923&q=80',
        position: '主廚',
      },
      {
        name: 'ESTELLA',
        url:
          'https://images.unsplash.com/photo-1614436163996-25cee5f54290?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=681&q=80',
        position: '廚師',
      },
      {
        name: 'ISRAEL',
        url:
          'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80',
        position: '廚師',
      },
    ]);

    const scrollY = inject('scrollY');
    const isScrollTo = ref(false);
    const ourTeamEl = ref(null);
    watch(scrollY, (y) => {
      const { offsetTop, clientHeight } = ourTeamEl.value;
      if (y > offsetTop - window.innerHeight * 0.67 && y < offsetTop + clientHeight * 0.67) {
        isScrollTo.value = true;
      }
    });

    return {
      chefs,
      isScrollTo,
      ourTeamEl,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.our-team {
  background-size: cover;
  background: url(~@/assets/images/photo-bg.jpg) center no-repeat;
  background-attachment: fixed;
  transform: translateY(50%);
  transition: 1.5s cubic-bezier(0.34, 0.34, 0.32, 1);
  &.active {
    transform: translateY(0);
    .title,
    .chef-card {
      opacity: 1;

      transform: translateY(0);
    }
  }
}

.bg-filter {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
}

.title,
.chef-card {
  opacity: 0;
  transform: translateY(100%) rotate3d(0, 1, 0, 45deg);
  transition: 1.5s 2s cubic-bezier(0.34, 0.34, 0.32, 1);
}
.chef-card {
  &:nth-of-type(1) {
    transition-delay: 2.5s;
  }
  &:nth-of-type(2) {
    transition-delay: 3s;
  }
  &:nth-of-type(3) {
    transition-delay: 3.5s;
  }
}

.chef-card {
  margin-bottom: 70px;
  .chef-name {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) scaleX(35);
      width: 2px;
      height: 2px;
      border-radius: 50%;
      background: $primary;
    }
  }
  > img {
    height: 500px;

    width: 100%;
    object-fit: cover;
  }
  .card-content {
    transform: translateX(-50%) translateY(50%);
    width: 80%;
  }
}

.link-icon {
  color: $black-300;
  &:hover {
    color: $primary;
  }
}
</style>
