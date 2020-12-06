<template>
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
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Prop} from 'vue-property-decorator';

  @Component
  export default class GoodList extends Vue {
@Prop() cartList: any
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";
  .good-message {
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

          span:nth-child(1) {
            .ellipsisSingle;
          }

          span:nth-child(2) {
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
</style>