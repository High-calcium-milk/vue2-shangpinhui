<template>
  <swiper class="swiper-no-swiping" ref="mySwiper" :options="swiperOptions">
    <swiper-slide v-for="item in list" :key="item.id">
      <img :src="item.imgUrl" title="image" />
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
export default {
  name: "GlobalBanner",
  props: ["list"],
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        loop: true,
        // loopAdditionalSlides: 3,
        autoplay: {
          disableOnInteraction: false,
        },
        // Some Swiper option/callback...
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
};
</script>

<style>
</style>