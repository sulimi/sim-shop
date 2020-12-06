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
      <van-button class="pay-btn" color="#1baeae" type="primary" block @click="createOrder" v-if="address">生成订单
      </van-button>
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
  import GoodList from '@/views/submit/GoodList.vue';
  import SubmitAddress from '@/views/submit/SubmitAddress.vue';
  import {getLocal, setLocal} from '@/assets/ts/utils';
  import {getAddressDetail, getAddressList, getDefaultAddress} from '@/service/address';
  import {createOrder} from '@/service/submit';

  @Component({
    components: {SubmitAddress, GoodList, ItemHeader}
  })
  export default class SubmitPage extends Vue {
    cartList = [];
    address = '';
    orderNo = '';
    addressId = '';

    mounted() {
      this.init();
    }

    async init() {
      Toast.loading({message: '加载中...', forbidClick: true});
      // 获取查询参数内的 id
      //保存提交订单的商品信息到本地，解决选择地址返回时页面空白
      const {checkIdArr, addressId} = this.$route.query;
      const _checkIdArr = checkIdArr ? JSON.parse((checkIdArr as any)) : JSON.parse(getLocal('checkIdArr') as any);
      setLocal('checkIdArr', JSON.stringify(_checkIdArr));
      try {
        //找到
        const {data: list} = await getByCartItemIds({cartItemIds: _checkIdArr.join(',')});
        this.cartList = list;


        //地址：
        this.addressId = addressId as any;
        const {data: a} = await getAddressList();
        const isAddressDeleted = a.map((i: any) => i.addressId).indexOf(parseInt(addressId as string));
        if (isAddressDeleted < 0) {
          this.addressId=''
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
      }, 0);
    }

    async createOrder() {
      const params = {
        addressId: (this.address as any).addressId,
        cartItemIds: this.cartList.map(item => (item as any).cartItemId)
      };
      const {data} = await createOrder(params);
      setLocal('cartItemIds', '');
      this.orderNo = data;
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