<template>
  <section class="container py-25">
    <div class="d-flex justify-content-between align-items-center flex-wrap">
      <div class="about-cake-img">
        <img
          class="img-fluid"
          src="@/assets/images/image-cake-2.jpg"
          alt="cake"
        />
      </div>
      <div class="p-12">
        <h3 class="fs-4">火侯的掌握</h3>
        <p class="fs-6 py-5 lh-xl">
          烘烤蛋糕操作時的溫度、<br />
          時間和濕度等因素，<br />
          影響著蛋糕的口感、以及蛋糕外觀的好與壞。<br />
          製作過程唯有不斷地嘗試，<br />
          調配不同的參數，<br />
          並觀察其對食材的影響，不斷地調整，<br />
          才能製烘烤出品質上乘的蛋糕。
        </p>
      </div>
    </div>
    <div
      class="d-flex justify-content-between align-items-center flex-wrap pt-38"
    >
      <div class="p-12 order-2 order-xl-1">
        <h3 class="fs-4">食材的堅持</h3>
        <p class="fs-6 py-5 lh-xl">
          選用頂級阿爾卑斯山低筋麵粉，<br />
          保存期限僅短短半年。經過一道道程序，<br />
          精選、磨粉、篩粉、包裝再加上長時間運送，<br />
          大約剩3~4個月有效期限。<br />
          天然無添加，食材選用絕不妥協。
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
            <h4 class="fs-6 lh-1 m-0">關於食材</h4>
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
export default {};
</script>

<style lang="scss" scoped>
.about-cake-img {
  max-width: 700px;
}
.about-flour-img {
  max-width: 750px;
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
