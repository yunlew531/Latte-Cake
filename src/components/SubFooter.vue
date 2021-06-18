<template>
  <section class="subfooter-panel">
    <div class="container px-25 py-25">
      <ul class="row gx-8 list-unstyled">
        <li class="col-6">
          <a
            href="javascript:;"
            class="
              link-item
              text-reset text-decoration-none
              bg-white
              d-flex
              align-items-center
              border border-secondary
              p-1
              rounded
            "
          >
            <div class="raw-material-img"></div>
            <div class="ps-5 flex-grow-1">
              <h3 class="fs-5 m-0">關於食材</h3>
              <p class="m-0">About Raw Materials</p>
            </div>
            <span class="material-icons fs-5 text-danger pe-2">
              play_circle_outline
            </span>
          </a>
        </li>
        <li class="col-6">
          <a
            href="javascript:;"
            class="
              link-item
              text-reset text-decoration-none
              bg-white
              d-flex
              align-items-center
              border border-secondary
              p-1
              rounded
            "
          >
            <div class="shop-img"></div>
            <div class="ps-5 flex-grow-1">
              <h3 class="fs-5 m-0">關於本店</h3>
              <p class="m-0">About Shop</p>
            </div>
            <span class="material-icons fs-5 text-danger pe-2">
              play_circle_outline
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '~@/assets/scss/custom/variables';

.subfooter-panel {
  background-color: $white;
  background-size: cover;
  box-shadow: $box-shadow-lg-inset;
}
.raw-material-img,
.shop-img {
  width: 100px;
  height: 100px;
  transition: 0.2s;
  background-size: cover;
  background-position: center;
}
.raw-material-img {
  background-image: url(~@/assets/images/photo-1509440159596-0249088772ff.jpg);
}
.shop-img {
  background-image: url(~@/assets/images/street-cafe-4472312_1920.jpg);
}
.link-item {
  h3,
  p {
    transition: 0.2s;
  }
  p {
    color: $black-300;
  }
  transition: 0.2s;
  box-shadow: $box-shadow;
  &:hover {
    h3,
    p {
      color: $danger;
    }
    .raw-material-img,
    .shop-img {
      filter: brightness(0.8);
    }
    box-shadow: $box-shadow-sm;
  }
}
</style>
