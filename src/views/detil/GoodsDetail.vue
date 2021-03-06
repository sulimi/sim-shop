<template>
  <div class="good-detail">
    <ItemHeader title="商品详情" icon-right="more"/>
    <div class="detail-content">
      <SwipeHome :swipe-imgs="goodsItemData.goodsCarouselList"/>
      <div class="detail-text">
        <div class="text-title">
          {{ goodsItemData.goodsName }}
        </div>
        <div class="text-express">免邮费 顺丰快递</div>
        <div class="text-num">
          <span>¥{{ goodsItemData.sellingPrice }}</span>
        </div>
      </div>
      <div class="detail-list">
        <ul @click="onClickIcon">
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div class="detail-list-content-img" v-html="goodsItemData.goodsDetailContent"/>
      </div>
    </div>

    <van-goods-action>
      <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickIcon"/>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" @click="onClickIcon"/>
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" @click="onClickIcon"/>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="count" @click="goTo"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="addCartFun(true)"/>
      <van-goods-action-button type="danger" text="立即购买" @click="goToBay"/>
    </van-goods-action>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import {getDetail} from '@/service/category';
  import SwipeHome from '@/views/home/SwipeHome.vue';
  import {Toast} from 'vant';
  import {addCart, addCartItemCount, getCart} from '@/service/cart';

  @Component({
    components: {SwipeHome, ItemHeader}
  })
  export default class GoodsDetail extends Vue {
    goodsItemData = [] as any;
    goodsCount = 0;
    cartItemId = 0;

    mounted() {
      this.$store.commit('fetchCartCount');
      Toast.setDefaultOptions({duration: 500});
      this.dataInit();
      this.cartItemIdInit();
    }

    get count() {
      return this.$store.state.cartCount;
    }

    async dataInit() {
      try {
        const {id} = this.$route.params;
        const {data} = await getDetail(id);
        this.goodsItemData = data;
      } catch (e) {
        return;
      }
    }

    async cartItemIdInit() {
      try {
        const {data: cartList} = await getCart({pageNumber: 1});
        const cartItem = cartList.filter((i: any) => i.goodsId === this.goodsItemData.goodsId)[0];
        this.goodsCount = cartItem ? this.goodsCount = cartItem.goodsCount : 0;
        this.cartItemId = cartItem.cartItemId;
      } catch (e) {
        return;
      }
    }

    onClickIcon() {
      Toast('未开发');
    }

    goTo() {
      this.$router.push({path: '/cart'});
    }

    async firstBay(value: boolean) {
      try {
        const {data, resultCode} = await addCart({
          goodsCount: 1,
          goodsId: (this.goodsItemData as any).goodsId
        }) as any;
        if (value) Toast.success('添加成功');
        await this.$store.dispatch('updateCart');
        await this.cartItemIdInit();
      } catch (e) {
        return;
      }
    }

    async addCartFun(value: boolean) {
      this.goodsCount += 1;
      if (this.goodsCount === 1) {
        //第一次加入购物车
        await this.firstBay(value);
      } else {
        //第二次加入就只加数量
        try {
          await addCartItemCount({
            cartItemId: this.cartItemId,
            goodsCount: this.goodsCount
          });
          Toast.success(`加购数量${this.goodsCount}`);
        } catch (e) {
          return;
        }
      }
    }

    async goToBay() {
      await this.addCartFun(false);
      await this.$router.push('/cart');
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";

  .good-detail {
    width: 100vw;
    overflow: hidden;

    .detail-content {
      margin-top: 40px;

      .detail-text {
        padding: 0 10px;

        .text-title {
          font-size: 18px;
          text-align: left;
          color: #333;
        }

        .text-express {
          font-size: 14px;
          text-align: left;
          color: #999;
          padding: 5px 0;
        }

        .text-num {
          .fjbt();

          span {
            color: #F63515;
            font-size: 22px;
          }
        }
      }

      .detail-list {
        width: 100%;

        ul {
          .fjbt();
          margin: 10px 0;

          li {
            flex: 1;
            padding: 5px 0;
            text-align: center;
            font-size: 15px;
            border-right: 1px solid #999;

            &:last-child {
              border-right: none;
            }
          }
        }

        .detail-list-content-img {
          ::v-deep img {
            width: 100%;
          }
        }
      }
    }

    .van-goods-action-button--warning {
      background: linear-gradient(to right, #6bd8d8, @primary)
    }

    .van-goods-action-button--danger {
      background: linear-gradient(to right, #0dc3c3, #098888)
    }
  }
</style>