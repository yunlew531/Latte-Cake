<template>
  <button :type="btnType" class="button btn" :class="`btn-${bgColor}`">
    <div class="button-hover" :class="`bg-${hoverBgColor}`"></div>
    <div class="opacity-0">
      <slot></slot>
    </div>
    <div
      class="
        position-absolute
        w-100
        h-100
        top-50
        start-50
        translate-middle
        z-10
        d-flex
        justify-content-center
        align-items-center
      "
    >
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: 'danger',
    },
    hoverBgColor: {
      type: String,
      default: 'info',
    },
    btnType: {
      type: String,
      default: 'button',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styleSheets/custom/variables';

.button {
  overflow: hidden;
  position: relative;
  &:hover {
    .button-hover {
      transform: translateY(0);
    }
  }
}
.button-hover {
  transition: 0.3s;
  transform: translateY(-100%);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: $border-radius;
}
</style>
