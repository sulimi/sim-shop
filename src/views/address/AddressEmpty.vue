<template>
  <div class="address-empty">
    <van-icon name="smile-comment-o" />
    <div class="title">还没有地址呢，去添加一个吧~</div>
    <van-button type="primary" color="#1baeae" block @click="onAdd">新增地址</van-button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class AddressEmpty extends Vue {
    onAdd() {
      this.$router.push('/addaddress?type=add');
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";
  .address-empty {
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