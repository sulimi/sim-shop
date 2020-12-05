<template>
  <div class="submit-wrapper">
    <ItemHeader title="提交订单" icon-right="more"/>


    <div class="address-wrap">
      <div class="name">
        <span class="me">我是昵称</span>
        <span class="number">15758394732</span>
      </div>
      <div class="address">
        浙江省 杭州市 西湖区 西湖底23号
      </div>
      <van-icon class="arrow" name="arrow"/>
    </div>


    <div class="good-message">
      <div class="good-item" v-for="item in cartList" :key="item.cartItemId">
        <div class="good-img">
          <img :src='prefix(item.goodsCoverImg)' alt="">
        </div>
        <div class="good-text">
          <div class="good-title">
            <span>{{item.goodsName}}</span>
            <span>x{{item.goodsCount}}</span>
          </div>
          <div class="good-money">
            <div class="price">¥{{item.sellingPrice}}</div>
          </div>
        </div>
      </div>
    </div>


    <div class="yes-btn">
      <div class="price">
        <span>商品金额：</span>
        <span>¥{{moneyPay}}</span>
      </div>
      <van-button class="pay-btn" color="#1baeae" type="primary" block>生成订单</van-button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import {Toast} from 'vant';
  import {getLocal, setLocal} from '@/assets/ts/utils';
  import {getByCartItemIds} from '@/service/cart';

  @Component({
    components: {ItemHeader}
  })
  export default class SubmitPage extends Vue {
    cartList= []
    mounted() {
      this.init()

      console.log(JSON.parse((this.$route.query.checkIdArr as any)).join(','))
    }
    async init() {
      Toast.loading({ message: '加载中...', forbidClick: true });
      // 获取查询参数内的 id
      const { checkIdArr } = this.$route.query
      // id 会本地存储，如果查询字符串 id 优先获取，若没有,则获取本地存储的 ids
      // const _checkIdArr = checkIdArr ? JSON.parse(checkIdArr as any) : JSON.parse(getLocal('checkIdArr')||'[]')
      // setLocal('checkIdArr', JSON.stringify(_checkIdArr))

      //找到
      const { data: list } = await getByCartItemIds({ cartItemIds: JSON.parse((this.$route.query.checkIdArr as any)).join(',') })
      this.cartList = list
      Toast.clear()
    }
    get moneyPay(){
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
    .address-wrap{
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
      .name{
        .me{
          font-style: italic;
          font-weight: bold;
        }
        .number{
          padding-left: 10px;
          color: @primary;
          font-weight: bold;
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
    .good-message{
      width: 100%;
      margin-bottom: 120px;
      .good-item {
        width: 100%;
        padding: 10px;
        background: #fff;
        display: flex;
        .good-img {
          img {
            .wh(100px, 100px)
          }
        }
        .good-text {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          padding: 20px;
          overflow: hidden;
          .good-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            span:nth-child(1){
              .ellipsisSingle;
            }
            span:nth-child(2){
              flex-shrink: 0;
            }
          }
          .good-money {
            display: flex;
            justify-content: space-between;
            .price {
              font-size: 16px;
              color: red;
              line-height: 28px;
            }
          }
        }
      }
    }
    .yes-btn{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #fff;
      padding: 10px 0 50px 0;
      border-top: 1px solid #e9e9e9;
      >div {
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