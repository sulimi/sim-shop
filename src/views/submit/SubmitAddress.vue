<template>
  <div class="submit-address">
    <div class="address-wrap" v-if="address" @click="goTo">
      <div class="name">
        <span class="me">{{address.userName}}</span>
        <span class="number">{{address.userPhone}}</span>
      </div>
      <div class="address">
        {{`${address.provinceName} ${address.cityName} ${address.regionName} ${address.detailAddress}`}}
      </div>
      <van-icon class="arrow" name="arrow"/>
    </div>
    <div class="address-wrap" @click="goTo" v-else>
      <div class="name">
        <span class="none">无地址，去添加</span>
      </div>
      <van-icon class="arrow" name="arrow"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import {getAddressList, getDefaultAddress} from '@/service/address';
  import {Toast} from 'vant';

  @Component
  export default class SubmitAddress extends Vue {
    address = '';

    async mounted() {
      const {data} = await getDefaultAddress();
      const {data:value}=await getAddressList()
      if (!data) {
        // this.$router.push({path: 'addressmanage'});
        Toast.fail('请添加收货地址');
        return;
      }
    }

    goTo() {
      this.$router.push({path: 'addressmanage?submit=submit'});
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";

  .submit-address {
    .address-wrap {
      margin-bottom: 20px;
      background: #fff;
      position: relative;
      text-align: left;
      margin-top: 40px;
      font-size: 14px;
      padding: 16px;
      color: #222333;

      .name, .address {
        margin: 10px 0;
      }

      .name {
        .me {
          font-style: italic;
          font-weight: bold;
        }

        .number {
          padding-left: 10px;
          color: @primary;
          font-weight: bold;
        }

        .none {
          color: #aaa;
          font-size: 12px;
        }
      }

      .arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
      }

      &::before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 2px;
        background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background-size: 80px;
      }
    }
  }
</style>