<template>
  <van-swipe class="home-swipe" :autoplay="5000" indicator-color="#1baeae">
    <van-swipe-item v-for="item in swipeImgs" :key="item.carouselUrl?item.carouselUrl:item">
      <img :src="item.carouselUrl?item.carouselUrl:item" alt="" @click="goTo(item.carouselUrl?item.carouselUrl:'none')">
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class SwipeHome extends Vue {
    @Prop() swipeImgs!: any;

    // {
    //   carouselUrl: "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner-mate40.png"
    //   redirectUrl: "https://juejin.im/book/6844733826191589390"}

    goTo(url: string) {
      //TODO  跳到一个指定路由
      if (url === 'nont') return;
      window.open(url);
    }
  }
</script>

<style lang="less" scoped>
  .home-swipe .van-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>