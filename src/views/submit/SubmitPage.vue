<template>
  <div class="submit-wrapper">
    <ItemHeader title="提交订单" icon-right="more" router-name="cart"/>
    <SubmitAddress :address="address"/>
    <GoodList :cart-list="cartList"/>
    <div class="yes-btn">
      <div class="price">
        <span>商品金额：</span>
        <span>¥{{moneyPay}}</span>
      </div>
      <van-button class="pay-btn" color="#1baeae" type="primary" block @click="submitPay" v-if="address">提交并付款
      </van-button>
      <van-button disabled class="pay-btn" color="#1baeae" type="primary" block v-else>提交并付款</van-button>
    </div>
    <van-popup
      :close-on-click-overlay="false"
      v-model="showPay"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
      @close="closeFun()"
    >
      <van-button color="#1989fa" block @click="payFun(1)">支付宝支付</van-button>
      <van-button color="#4fc08d" block @click="payFun(2)">微信支付</van-button>
    </van-popup>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import {Toast} from 'vant';
  import {getByCartItemIds, getCart} from '@/service/cart';
  import GoodList from '@/views/submit/GoodList.vue';
  import SubmitAddress from '@/views/submit/SubmitAddress.vue';
  import {getLocal, setLocal} from '@/assets/ts/utils';
  import {getAddressDetail, getAddressList, getDefaultAddress} from '@/service/address';
  import {createOrder, payOrder} from '@/service/submit';
  import {getDetail} from '@/service/category';

  @Component({
    components: {SubmitAddress, GoodList, ItemHeader}
  })
  export default class SubmitPage extends Vue {
    showPay = false;
    cartList = [];
    address = '';
    orderNo = ''; //订单编号
    addressId = '';

    mounted() {
      this.init();
    }

    async init() {
      Toast.loading({message: '加载中...', forbidClick: true});
      // 获取查询参数内的 id
      //保存提交订单的商品信息到本地，解决选择地址返回时页面空白
      const {addressId} = this.$route.query;
      try {
        //找到
        const _checkIdArr = JSON.parse(getLocal('checkIdArr') as any);
        const {data} = await getByCartItemIds({cartItemIds: _checkIdArr.join(',')});
        this.cartList = data;

        //地址：
        this.addressId = addressId as any;
        const {data: a} = await getAddressList();
        const isAddressDeleted = a.map((i: any) => i.addressId).indexOf(parseInt(addressId as string));
        if (isAddressDeleted < 0) {
          this.addressId = '';
        }
        const {data: address} = this.addressId ? await getAddressDetail(addressId as any) : await getDefaultAddress();
        this.address = address;
        if (!address) {
          this.$emit('update:isHaveAddress', false);
          Toast.fail('请添加收货地址');
          return;
        }
      } catch (e) {
        return;
      }
      Toast.clear();
    }


    get moneyPay() {
      return this.cartList.reduce((sum: any, item: any) => {
        return sum + (item as any).sellingPrice * (item as any).goodsCount;
      }, 0)
    }

    async submitPay() {
      //提交未支付状态
      this.showPay = true;
      const params = {
        addressId: (this.address as any).addressId,
        cartItemIds: this.cartList.map(item => (item as any).cartItemId)
      };
      const {data} = await createOrder(params);
      setLocal('checkIdArr', '');
      this.orderNo = data;
      const {data: num} = await getCart({pageNumber: 1});
      this.$store.state.cartCount = num.length;
      this.$store.commit('saveCartCount');
    }

    async payFun(type: number) {
      Toast.loading;
      try {
        await payOrder({orderNo: this.orderNo, payType: type});
        Toast.success('付款成功');
        setTimeout(() => {
          this.$router.push('/mypay');
        }, 500);
      } catch (e) {
        return;
      }
    }

    closeFun() {
      Toast.fail('未付款订单');
      setTimeout(() => {
        this.$router.push('/mypay');
      }, 500);
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

    .van-popup--bottom {
      .fjcc(column);
      padding: 0 16px;

      button {
        margin-top: 6px;
      }
    }
  }
</style>