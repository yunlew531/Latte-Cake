<template>
  <teleport v-if="navTeleport" :to="navTeleport">
    <section
      class="products-nav-panel bg-white rounded shadow-sm p-5 p-sm-10"
      :class="{ 'drop-down': isScrollDown }"
      :style="fixedNavSticky"
    >
      <ul
        class="
          d-flex
          flex-grow-1
          list-unstyled
          text-center
          mb-0
          order-1
          overflow-hidden
        "
        :class="navTeleport === '#navbarTeleportAside' ? 'flex-wrap' : 'flex-nowrap'"
      >
        <li
          v-for="category in categoryList"
          :key="category"
          class="flex-grow-1 py-3 text-nowrap"
          :class="{ active: nowCategory === category }"
          @click="handNowCategory(category)"
          @mouseenter="nowHoverCategory = category"
          @mouseleave="nowHoverCategory = ''"
        >
          {{ category }}
        </li>
      </ul>
      <div class="d-flex flex-column order-0">
        <div class="progress position-relative flex-grow-1">
          <div
            class="progress-bar position-absolute"
            :style="progressBarAnime"
            role="progressbar"
          ></div>
        </div>
      </div>
    </section>
  </teleport>
</template>

<script>
import {
  ref, reactive, toRefs, inject, onMounted, computed, watch,
} from 'vue';
import { useRoute } from 'vue-router';

export default {
  props: {
    nowCategory: {
      type: String,
      default: '全部',
    },
    isScrollDown: {
      type: Boolean,
      default: false,
    },
    displayData: {
      default: () => [],
    },
  },
  emits: {
    removeSearch: (category) => typeof category === 'string',
  },
  setup(props, { emit }) {
    const { nowCategory, displayData, isScrollDown } = toRefs(props);
    const route = useRoute();
    const $emitter = inject('$emitter');
    const categoryList = reactive(['全部', '圓直麵', '筆管麵', '咖啡', '甜品']);

    const handNowCategory = (category) => {
      if (category === nowCategory.value) return;
      emit('removeSearch', category);
      $emitter.emit('removeSearch');
    };

    const navTeleport = ref('');
    const initNavPosition = () => {
      navTeleport.value = '#navbarTeleportTop';
    };
    onMounted(initNavPosition);

    const fixedNavSticky = computed(() => {
      let style = null;
      if (
        displayData.value.length <= 3
        && isScrollDown.value
        && navTeleport.value === '#navbarTeleportAside'
      ) {
        style = {
          position: 'absolute',
          'margin-right': '12px',
        };
      } else style = '';
      return style;
    });

    watch(
      () => route.query.search,
      (value) => {
        if (value && categoryList[0] !== '搜尋') {
          categoryList.unshift('搜尋');
        } else if (!value && categoryList[0] === '搜尋') {
          categoryList.shift('搜尋');
        }
      },
    );

    let teleportTopToAsideTimeout = null;
    watch(isScrollDown, (down) => {
      // isScrollDown 會觸發css動畫，動畫跑完再 teleport
      if (down) {
        teleportTopToAsideTimeout = setTimeout(() => {
          navTeleport.value = '#navbarTeleportAside';
        }, 250);
      } else {
        clearTimeout(teleportTopToAsideTimeout);
        navTeleport.value = '#navbarTeleportTop';
      }
    });

    const nowHoverCategory = ref('');
    const progressBarAnime = computed(() => {
      let style = [];
      const percent = 100 / categoryList.length;
      let position = 0;
      let sizeDirection = null;
      let zeroDirection = null;
      // 有 hover nav 時動畫停在 hover 元素，反之動畫停在 nowCategory 元素
      if (nowHoverCategory.value) {
        categoryList.forEach((item, idx) => {
          if (item === nowHoverCategory.value) position = idx * percent;
        });
      } else {
        categoryList.forEach((item, idx) => {
          if (item === nowCategory.value) position = idx * percent;
        });
      }
      // isScrollDown 判斷 navbar 是水平或是垂直
      if (isScrollDown.value) {
        sizeDirection = 'height';
        zeroDirection = 'top';
      } else {
        sizeDirection = 'width';
        zeroDirection = 'left';
      }
      style = [{ [sizeDirection]: `${percent}%` }, { [zeroDirection]: `${position}%` }];
      return style;
    });

    return {
      categoryList,
      nowHoverCategory,
      navTeleport,
      handNowCategory,
      fixedNavSticky,
      progressBarAnime,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/styleSheets/custom/variables';

.products-nav-panel {
  transform: translateY(-50px);
  > ul {
    > li {
      width: 16.667%;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        color: tint-color($danger, 30%);
      }
      &.active {
        color: $danger;
        font-weight: $font-weight-bold;
      }
    }
  }
  &.drop-down {
    display: flex;
    position: sticky;
    transform: translateY(-50%);
    margin-bottom: 0;
    animation: drop-down 0.3s both;
    li {
      width: 100%;
    }
    .progress {
      width: 3px;
      display: flex;
      flex-direction: column;
    }
    .progress-bar {
      width: 100%;
    }
  }
}
@keyframes drop-down {
  from {
    top: 20%;
  }
  to {
    top: 50%;
  }
}

.progress {
  height: 3px;
}

.progress-bar {
  transition: 0.3s;
  height: 100%;
}
</style>
