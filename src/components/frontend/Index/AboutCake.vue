<template>
  <section class="container pt-25 pb-50">
    <div
      class="
        handle-heat
        d-flex
        justify-content-between
        align-items-center
        flex-wrap
      "
      :class="{ active: isHeatAniPlay }"
    >
      <div class="about-cake-img">
        <img
          class="img-fluid"
          src="@/assets/images/image-cake-2.jpg"
          alt="cake"
        />
      </div>
      <div class="p-12">
        <h3 class="paragraph-title text-primary fs-4 fw-bold tracking-2 mb-5">
          火侯的掌握
        </h3>
        <p class="paragraph-content-1 fs-6 lh-lg">
          烘烤蛋糕操作時的溫度、 時間和濕度等因素，<br />
          影響著蛋糕的口感、以及蛋糕外觀的好與壞。<br />
        </p>
        <p class="paragraph-content-2 fs-6 m-0 lh-lg">
          製作過程唯有不斷地嘗試，<br />
          每次調配不同的參數，<br />
          觀察其對食材的影響，不斷地調整，<br />
          才能製烘烤出品質上乘的蛋糕。
        </p>
      </div>
    </div>
    <div
      class="
        hold-materials
        d-flex
        justify-content-between
        align-items-center
        flex-wrap
        pt-38
      "
      :class="{ active: isMaterialsAniPlay }"
    >
      <div class="p-12 order-2 order-xl-1">
        <h3 class="paragraph-title text-primary fs-4 fw-bold tracking-2 mb-5">
          食材的堅持
        </h3>
        <p class="paragraph-content-1 fs-6 lh-lg">
          選用頂級丹麥低筋麵粉，<br />
          保存期限僅短短半年。經過一道道程序，<br />
          精選、磨粉、篩粉、包裝再加上長時間運送，<br />
          大約剩3~4個月有效期限。<br />
        </p>
        <p class="paragraph-content-2 fs-6 lh-lg">
          天然無添加，<br />
          食材選用是我們不妥協的地方。
        </p>
        <div class="about-material d-flex justify-content-end mt-12">
          <a
            href="javascript:;"
            class="
              text-decoration-none
              duration-600
              d-flex
              align-items-center
              p-1
            "
          >
            <h4 class="fs-6 lh-1 m-0">關於更多食材</h4>
            <span class="material-icons ms-1"> trending_flat </span>
          </a>
        </div>
      </div>
      <div class="about-flour-img order-1 order-xl-2">
        <img
          class="img-fluid"
          src="@/assets/images/image-flour-2.jpg"
          alt="flour"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, watch } from 'vue';
import { useGetScrollY } from '@/methods';

export default {
  name: 'AboutCake',
  setup() {
    const { scrollY } = useGetScrollY();
    const isHeatAniPlay = ref(false);
    const isMaterialsAniPlay = ref(false);

    watch(scrollY, () => {
      if (scrollY.value >= 1150 && scrollY.value <= 2700) {
        isHeatAniPlay.value = true;
      } else isHeatAniPlay.value = false;
      if (scrollY.value >= 2000) {
        isMaterialsAniPlay.value = true;
      } else isMaterialsAniPlay.value = false;
    });

    return { isHeatAniPlay, isMaterialsAniPlay };
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~@/assets/scss/custom/variables';

.paragraph-title,
.paragraph-content-1,
.paragraph-content-2 {
  opacity: 0;
  transform: translateY(100px);
}
.about-cake-img,
.about-flour-img {
  max-width: 700px;
}
.handle-heat,
.hold-materials {
  &.active {
    .paragraph-title,
    .paragraph-content-1,
    .paragraph-content-2 {
      animation: handle-heat-ani 0.5s forwards;
    }
    .paragraph-title {
      animation-delay: 0.3s;
    }
    .paragraph-content-1 {
      animation-delay: 0.8s;
    }
    .paragraph-content-2 {
      animation-delay: 1.3s;
    }
  }
}

@keyframes handle-heat-ani {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-cake-img,
.about-flour-img {
  position: relative;
  transition: 0.5s;
  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    background-color: tint-color($danger, 10%);
    position: absolute;
    transition: 0.5s;
    clip-path: polygon(50px 0%, 50px 5px, 5px 5px, 5px 50px, 0% 50px, 0% 0%);
  }
  &::before {
    left: 20px;
    top: 20px;
  }
  &::after {
    right: 20px;
    bottom: 20px;
    transform: rotate(180deg);
  }
  &:hover {
    transform: scale(1.03);
    &::before {
      left: 10px;
      top: 10px;
    }
    &::after {
      right: 10px;
      bottom: 10px;
    }
  }
}
.about-material {
  > a {
    margin-right: 5px;
    color: transparent;
    background: url(~@/assets/images/red-black.png) no-repeat;
    background-position: right -5px top 0;
    background-clip: text;
    &:hover {
      margin-right: 0;
      background-position: right -155px top 0;
    }
  }
}
</style>
