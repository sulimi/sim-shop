<template>
  <div class="good-item">
    <van-checkbox :name="itemObj.item.cartItemId"/><!--选择按钮-->
    <div class="good-img">
      <img :src="prefix(itemObj.item.goodsCoverImg)" alt="">
    </div>
    <div class="good-text">
      <div class="good-title">
        <span>{{ itemObj.item.goodsName }}</span>
        <span>x{{ itemObj.item.goodsCount }}</span>
      </div>
      <div class="good-btn">
        <div class="money">¥{{ itemObj.item.sellingPrice }}</div>
        <!--商品+1-1按钮 vant进步器-->
        <van-stepper
          integer
          :min="1"
          :value="itemObj.item.goodsCount"
          :name="itemObj.item.cartItemId"
          async-change
          @change="onChangeGoodsCount"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import {addCartItemCount} from '@/service/cart';

  @Component
  export default class CartGoodItem extends Vue {
    @Prop() itemObj: any;

    //进步器的异步触发方法
    async onChangeGoodsCount(value: any, clickItem: { name: number }) {
      //value是按钮显示的值，clickItem是整个按钮的信息
      // 注意此时修改 value 后会再次触发 change 事件
      //解决二次触发：
      if ((this.itemObj.list.filter((i: any) => i.cartItemId === clickItem.name)[0] as any).goodsCount === value) return;
      try {
        await addCartItemCount({
          cartItemId: clickItem.name,
          goodsCount: value
        });
      } catch (e) {
        return; //解决错误时二次触发刷新：
      }
      this.itemObj.init();
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";

  .good-item {
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
      /*flex-grow: 1;*/
      /*flex-shrink: 1;*/
      /*flex-basis: 0;*/
      flex: 1;
      padding: 20px;

      .good-title {
        display: flex;
        justify-content: space-between;
      }

      .good-btn {
        display: flex;
        justify-content: space-between;

        .money {
          font-size: 16px;
          color: red;
          line-height: 28px;
        }

        .van-icon-delete {
          font-size: 20px;
          margin-top: 4px;
        }
      }
    }
  }
</style>