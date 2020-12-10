<template>
  <van-swipe class="home-swipe" :autoplay="5000" indicator-color="#1baeae">
    <van-swipe-item v-for="item in swipeImgs" :key="item.carouselUrl?item.carouselUrl:item">
      <img :src="item.carouselUrl?item.carouselUrl:prefix(item)" alt="" @click="goTo(item.carouselUrl?item.carouselUrl:item)">
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
      // window.open(url);
    }
  }
</script>

<style lang="less" scoped>
  .home-swipe{
    width: 100vw;
    .van-swipe__track{
      width: 100%;
      .van-swipe-item {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }

</style>