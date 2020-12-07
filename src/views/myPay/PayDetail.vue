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
      <van-button v-if="list.orderStatus == 0" style="margin-bottom: 10px" color="#1baeae" block @click="showPayFn">
        去支付
      </van-button>
      <van-button v-if="!(list.orderStatus < 0 || list.orderStatus == 4)" block @click="noPay(list.orderNo)">
        取消订单
      </van-button>
      <van-button v-if="isNoPay" block disabled>订单已取消</van-button>
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

    <van-popup
      v-model="showPay"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-button color="#1989fa" block @click="payFun(list.orderNo,1)">支付宝支付</van-button>
      <van-button color="#4fc08d" block @click="payFun(list.orderNo,2)">微信支付</van-button>
    </van-popup>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import {Dialog, Toast} from 'vant';
  import {confirmOrder, getOrderDetail, payOrder} from '@/service/submit';
  import VanCardItem from '@/views/myPay/VanCardItem.vue';
  import {getUserInfo} from '@/service/user';

  @Component({
    components: {VanCardItem, ItemHeader}
  })
  export default class PayDetail extends Vue {
    list = {};
    showPay = false;
    isNoPay = false;
    noPayArr = [] as number[];
    userName=''

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
      const {data: user}=await getUserInfo();
      this.userName=user.loginName
      console.log(this.userName);
      this.noPayArr = JSON.parse(window.localStorage.getItem('noPayArr') || '[]');
      const _noPayArr = [...this.noPayArr];
      if (_noPayArr.indexOf((id as any)) >= 0) {
        this.isNoPay = true;
      }
      Toast.clear();
    }

    async payFun(id: number, type: number) {
      Toast.loading;
      await payOrder({orderNo: id, payType: type});
    }

    showPayFn() {
      this.showPay = true;
    }

    noPay(id: number) {
      Dialog.confirm({
        title: '是否确认订单？',
      }).then(() => {
        confirmOrder(id).then((res: any) => {
          if (res.resultCode == 200) {
            Toast('取消成功');
            this.init();
            this.isNoPay = true;
            this.noPayArr.push(id);
            window.localStorage.setItem('noPayArr', JSON.stringify(this.noPayArr));
          }
        });
      }).catch(() => {
        return;
      });
    }

    // async noPay(id: number) {
    //   try {
    //     await Dialog.confirm({
    //       title: '是否确认订单？',
    //     });
    //     const {resultCode} = await confirmOrder(id) as any;
    //     Toast('取消成功');
    //     this.init();
    //   } catch (e) {
    //     return;
    //   }
    // }

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

      .money-item {
        text-align: left;
        margin-bottom: 10px;

        .text {
          font-size: 13px;
          color: #999;
        }

        .type {
          font-size: 14px;
        }
      }
    }
  }
</style>