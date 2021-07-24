<template>
  <teleport v-if="titleTeleportPosition" :to="titleTeleportPosition">
    <h3
      class="title fw-bold text-white px-md-12 pt-10"
      :class="[{ 'first-anime': playFirstAnime }, { 'second-anime': !playFirstAnime }]"
      :style="styleSheets.title"
      @animationend="handTeleport"
    >
      <span class="fw-bolder text-danger tracking-2 w-100">PastaHouse</span>
    </h3>
    <div class="btns-group ps-md-12 pb-1" :class="{ show: !playFirstAnime }">
      <Button @click="scrollToEl('menuPanelEl')">瀏覽菜單</Button>
      <Button class="ms-3" @click="scrollToEl('aboutMaterialPanelEl')">關於食材</Button>
    </div>
  </teleport>
</template>

<script>
import Button from '@/components/frontend/Button.vue';
import { ref, inject, onMounted } from 'vue';

export default {
  props: {
    styleSheets: {
      type: Object,
    },
    isReadyTextShadow: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:isReadyTextShadow': (isReady) => typeof isReady === 'boolean',
  },
  components: {
    Button,
  },
  setup(props, { emit }) {
    const $emitter = inject('$emitter');

    const playFirstAnime = ref(true);
    const titleTeleportPosition = ref('');
    const handTeleport = () => {
      playFirstAnime.value = false;
      titleTeleportPosition.value = '#titleTeleportAside';
      emit('update:isReadyTextShadow', true);
    };
    onMounted(() => {
      titleTeleportPosition.value = '#titleTeleportMiddle';
    });

    const scrollToEl = (id) => {
      $emitter.emit('scrollToEl', id);
    };

    return {
      titleTeleportPosition,
      playFirstAnime,
      handTeleport,
      scrollToEl,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';
@import '~bootstrap/scss/mixins';

.title {
  font-family: 'Nothing You Could Do', cursive;
  text-shadow: 0.2rem 0.2rem 0.2rem $white;
  &.first-anime {
    transform: translateY(200%) scale(0.95);
    margin-top: 64px;
    font-size: 10rem;
    animation: first-anime 4s 0.8s forwards cubic-bezier(0.17, 0.67, 0.73, 1.16);
    &::first-letter {
      font-size: 20rem;
    }
  }
  &.second-anime {
    transform: scale(0);
    font-size: 6rem;
    margin-top: 0;
    animation: second-anime 0.5s forwards cubic-bezier(0.17, 0.67, 0.73, 1.16);
    &::first-letter {
      font-size: 10rem;
    }
  }
  @include media-breakpoint-down(xxl) {
    &.first-anime {
      font-size: 6rem;
      &::first-letter {
        font-size: 8rem;
      }
    }
    &.second-anime {
      font-size: 4rem;
      &::first-letter {
        font-size: 6rem;
      }
    }
  }
  @include media-breakpoint-down(md) {
    &.first-anime {
      font-size: 4rem;
      &::first-letter {
        font-size: 10rem;
      }
    }
    &.second-anime {
      font-size: 4rem;
      &::first-letter {
        font-size: 6rem;
      }
    }
  }
  @include media-breakpoint-down(sm) {
    &.first-anime {
      font-size: 2rem;
    }
    &.second-anime {
      font-size: 2rem;
    }
  }
}
@keyframes first-anime {
  40% {
    transform: translateY(0) scale(0.95);
  }
  50% {
    transform: translateY(0) scale(0.95);
  }
  60% {
    transform: translateY(0) scale(1.05);
  }
  70% {
    transform: translateY(0) scale(1);
  }
  90% {
    transform: translateY(0) scale(1);
  }
  100% {
    transform: translateY(0) scale(0);
  }
}
@keyframes second-anime {
  100% {
    transform: scale(1);
  }
}

.btns-group {
  transform: translateY(100%);
  &.show {
    animation: btns-group 1s 1s forwards;
  }
}
@keyframes btns-group {
  to {
    transform: translateY(0);
  }
}
</style>
