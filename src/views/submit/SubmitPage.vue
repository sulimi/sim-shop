<template>
  <div class="submit-wrapper">
    <ItemHeader title="提交订单" icon-right="more"/>
    <SubmitAddress/>
    <GoodList :cart-list="cartList"/>
    <div class="yes-btn">
      <div class="price">
        <span>商品金额：</span>
        <span>¥{{moneyPay}}</span>
      </div>
      <van-button class="pay-btn" color="#1baeae" type="primary" block v-if="address">生成订单</van-button>
      <van-button disabled class="pay-btn" color="#1baeae" type="primary" block v-else>生成订单</van-button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import {Toast} from 'vant';
  import {getByCartItemIds} from '@/service/cart';
  import {getDefaultAddress} from '@/service/address';
  import GoodList from '@/views/submit/GoodList.vue';
  import SubmitAddress from '@/views/submit/SubmitAddress.vue';

  @Component({
    components: {SubmitAddress, GoodList, ItemHeader}
  })
  export default class SubmitPage extends Vue {
    cartList = [];
    address = '';

    mounted() {
      this.init();
    }

    async init() {
      Toast.loading({message: '加载中...', forbidClick: true});
      // 获取查询参数内的 id
      const {checkIdArr} = this.$route.query;
      //找到
      const {data: list} = await getByCartItemIds({cartItemIds: JSON.parse((checkIdArr as any)).join(',')});
      this.cartList = list;
      const {data: address} = await getDefaultAddress();
      this.address = address;
      Toast.clear();
    }


    get moneyPay() {
      return this.cartList.reduce((sum: any, item: any) => {
        return sum + (item as any).sellingPrice * (item as any).goodsCount;
      }, 0);
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";

  .submit-wrapper {
    background: #f9f9f9;

    .yes-btn {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #fff;
      padding: 10px 0 50px 0;
      border-top: 1px solid #e9e9e9;

      > div {
        display: flex;
        justify-content: space-between;
        padding: 0 5%;
        margin: 10px 0;
        font-size: 14px;

        span:nth-child(2) {
          color: red;
          font-size: 18px;
        }
      }

      .pay-btn {
        position: fixed;
        bottom: 7px;
        right: 0;
        left: 0;
        width: 90%;
        margin: 0 auto;
      }
    }
  }
</style>