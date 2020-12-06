<template>
  <div class="pay-detail-wrapper">
    <ItemHeader title="订单详情" router-name="mypay" icon-right="more"/>

    <div class="detail-state">
      <div class="status-item">
        <span class="text">订单状态：</span>
        <span class="num">{{ list.orderStatusString }}</span>
      </div>
      <div class="status-item">
        <span class="text">订单编号：</span>
        <span class="num">{{ list.orderNo }}</span>
      </div>
      <div class="status-item">
        <span class="text">下单时间：</span>
        <span class="num">{{ list.createTime }}</span>
      </div>
    </div>

    <div class="detail-money">
      <div class="money-item">
        <span class="text">商品金额：</span>
        <span class="type">¥ {{ list.totalPrice }}</span>
      </div>
      <div class="money-item">
        <span class="text">配送方式：</span>
        <span class="type">普通快递</span>
      </div>
    </div>
    <VanCardItem :list="list.newBeeMallOrderItemVOS"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import {Toast} from 'vant';
  import {getOrderDetail} from '@/service/submit';
  import VanCardItem from '@/views/myPay/VanCardItem.vue';

  @Component({
    components: {VanCardItem, ItemHeader}
  })
  export default class PayDetail extends Vue {
    list = {};
    showPay = false;

    mounted() {
      this.init();
    }

    async init() {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      const {id} = this.$route.query;
      const {data} = await getOrderDetail(id);
      this.list = data;
      Toast.clear();
    }
  }
</script>

<style lang="less" scoped>
  .pay-detail-wrapper {
    padding-top: 40px;
    height: 100vh;
    background: #f9f9f9;

    .detail-state {
      background: #fff;
      padding: 20px;
      font-size: 15px;

      .status-item {
        text-align: left;
        margin-bottom: 10px;

        .text {
          font-size: 13px;
          color: #999;
        }

        .num {
          font-size: 14px;
        }
      }
    }

    .detail-money {
      background: #fff;
      margin: 20px 0;
      padding: 20px;
      font-size: 15px;
      .money-item{
        text-align: left;
        margin-bottom: 10px;
        .text{
          font-size: 13px;
          color: #999;
        }
        .type{
          font-size: 14px;
        }
      }
    }
  }
</style>