<template>
  <section class="bg-info overflow-hidden">
    <div
      ref="whyChooseUsPanelEl"
      class="why-choose-us-panel bg-white-100"
      :class="{ active: isScrollTo }"
    >
      <div class="container overflow-hidden pt-38">
        <h3 class="title text-center">
          為什麼選擇
          <span class="shop-name fs-2 text-danger fw-bold px-1">PastaHouse</span>
          ?
        </h3>
        <p class="paragraph text-center fs-6 fw-light pt-3">
          我們的功夫源自於義大利威尼斯，代代相傳並由
          <span class="shop-name text-danger fw-bold px-1">PastaHouse</span
          >使用最好的原料，<br />讓您以簡單的方式品嘗到健康而正宗的傳統風味。
        </p>
        <ul class="row list-unstyled g-8 py-8">
          <li v-for="content in cardList" :key="content" class="col-sm-6 col-lg-4 card-item">
            <div
              class="
                card-container
                px-8
                py-12
                d-flex
                flex-column
                h-100
                shadow
                rounded
                overflow-hidden
              "
            >
              <div class="card-content">
                <h4 class="fs-3">{{ content.title }}</h4>
                <p class="m-0">
                  {{ content.content }}
                </p>
              </div>
            </div>
          </li>
        </ul>
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
    const scrollY = inject('scrollY');

    const cardList = reactive([
      {
        title: '品質',
        content: '從尚未加工的原材料開始：蔬菜經過清潔，肉經過研磨、調味和煮熟，雞蛋手工破碎。',
      },
      {
        title: '烹飪',
        content: '我們不斷學習，主動嘗試最新烹飪趨勢，以符合客人對我們的期待。',
      },
      {
        title: '服務',
        content: '對待客人像對待自己的朋友一樣善待他們。無論您是誰，我們都提供無可挑剔的服務。',
      },
    ]);

    const whyChooseUsPanelEl = ref(null);
    const isScrollTo = ref(false);
    watch(scrollY, (y) => {
      const { offsetTop, clientHeight } = whyChooseUsPanelEl.value;
      if (y > offsetTop - window.innerHeight * 0.67 && y < offsetTop + clientHeight * 0.67) {
        isScrollTo.value = true;
      }
    });
    return {
      isScrollTo,
      cardList,
      whyChooseUsPanelEl,
    };
  },
  // inject: ['scroll'],
  // data() {
  //   return {
  //     cardList: [
  //       {
  //         title: '品質',
  //         content:
  //           '從尚未加工的原材料開始：蔬菜經過清潔，肉經過研磨、調味和煮熟，雞蛋手工破碎。',
  //       },
  //       {
  //         title: '烹飪',
  //         content:
  //           '我們不斷學習，主動嘗試最新烹飪趨勢，以符合客人對我們的期待。',
  //       },
  //       {
  //         title: '服務',
  //         content:
  //           '對待客人像對待自己的朋友一樣善待他們。無論您是誰，我們都提供無可挑剔的服務。',
  //       },
  //     ],
  //     isScrollTo: false,
  //   };
  // },
  // watch: {
  //   scroll: {
  //     handler(scroll) {
  //       const { whyChooseUsPanelEl } = this.$refs;
  //       const { offsetTop, clientHeight } = whyChooseUsPanelEl;
  //       if (
  //         scroll.Y > offsetTop - window.innerHeight * 0.67
  //         && scroll.Y < offsetTop + clientHeight * 0.67
  //       ) {
  //         this.isScrollTo = true;
  //       }
  //     },
  //     deep: true,
  //   },
  // },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

.shop-name {
  font-family: 'Nothing You Could Do', cursive;
}
.why-choose-us-panel {
  transition: 1.5s cubic-bezier(0.34, 0.34, 0.32, 1);
  transform: translateY(50%);
  .title,
  .paragraph {
    opacity: 0;
    transition: 1s 1.5s cubic-bezier(0.34, 0.34, 0.32, 1);
    transform: translateY(100%) rotate3d(0, 1, 0, 30deg);
  }
  .paragraph {
    transition-delay: 2s;
  }
  .card-item {
    transition: 1s ease-out;
    opacity: 0;
    transform: translateY(100%) rotate3d(0, 1, 0, 30deg);
    &:nth-child(1) {
      transition-delay: 2.5s;
    }
    &:nth-child(2) {
      transition-delay: 3s;
    }
    &:nth-child(3) {
      transition-delay: 3.5s;
    }
  }
  &.active {
    transform: translateY(0%);
    .title,
    .paragraph {
      opacity: 1;
      transform: translateY(0);
    }
    .card-item {
      &:nth-child(n) {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
.card-container {
  background: $white;
  transition: 0.3s 0.2s background-color ease-in;
  .card-content {
    transition: 0.3s 0.2s ease-in;
    h4 {
      transition: 0.3s 0.2s ease-in;
      color: $primary;
    }
  }
  &:hover {
    color: $white;
    background: tint-color($primary, 10%);
    .card-content {
      transform: translateY(-20%);
      h4 {
        color: $white;
      }
    }
  }
}
</style>
