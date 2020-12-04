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
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5"/>
      <van-goods-action-button type="warning" text="加入购物车"/>
      <van-goods-action-button type="danger" text="立即购买"/>
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

  @Component({
    components: {SwipeHome, ItemHeader}
  })
  export default class GoodsDetail extends Vue {
    goodsItemData = [];

    async mounted() {
      Toast.setDefaultOptions({duration: 500});
      const {id} = this.$route.params;
      const {data} = await getDetail(id);
      this.goodsItemData = data;
    }

    onClickIcon() {
      Toast('未开发');
    }

    onClickButton() {
      Toast('点击按钮');
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin";

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