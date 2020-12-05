<template>
  <div class="cart-empty">
    <van-icon name="smile-comment-o" />
    <div class="title">车车空啦！</div>
    <van-button color="#1baeae" type="primary" @click="goTo" block>去首页</van-button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class CartEmpty extends Vue {
    goTo() {
      this.$router.push({path: 'home'});
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";
  .cart-empty {
    width: 50%;
    margin: 200px auto 0;
    text-align: center;

    .van-icon-smile-comment-o {
      font-size: 50px;
    }

    .title {
      font-size: 16px;
      margin-bottom: 20px;
      color: #aaa;
    }
  }
</style>