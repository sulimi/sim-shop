<template>
  <div class="my-pay">
    <ItemHeader title="我的订单" icon-right="more" router-name="user"/>
    <van-tabs @change="onChangeTab" :color="'#1baeae'" :title-active-color="'#1baeae'" class="order-tab" v-model="status">
      <van-tab title="全部" name=''></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="待确认" name="1"></van-tab>
      <van-tab title="待发货" name="2"></van-tab>
      <van-tab title="已发货" name="3"></van-tab>
      <van-tab title="交易完成" name="4"></van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  @Component({
    components: {ItemHeader}
  })
  export default class MyPay extends Vue {
    status=''
    onChangeTab(){
      //
    }
  }
</script>

<style lang="less" scoped>
.my-pay{
  margin-top: 40px;
}
</style>