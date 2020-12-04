<template>
  <div class="module-item">
    <header class="module-item-title">{{title}}</header>
    <div class="module-item-content">
      <router-link :to="'/goodsdetail/'+item.goodsId" class="content-item" v-for="item in moduleList" :key="item.goodsId">
        <img :src="prefix(item.goodsCoverImg)" alt="">
        <div class="item-message">
          <div class="text">{{ item.goodsName }}</div>
          <div class="num">¥ {{ item.sellingPrice }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type ModuleList = {
    goodsCoverImg: string;
    goodsId: number;
    goodsIntro: string;
    goodsName: string;
    sellingPrice: number;
    tag: string;
  }
  @Component
  export default class HomeModule extends Vue {
    @Prop() moduleList!: ModuleList;
    @Prop() title!: string;
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";

  .module-item {
    .module-item-title {
      background: #f9f9f9;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: @primary;
      font-size: 16px;
      font-weight: 500;
    }

    .module-item-content {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .content-item {
        width: 50%;
        border-bottom: 1PX solid #e9e9e9;
        padding: 10px 10px;

        &:nth-child(2n + 1) {
          border-right: 1PX solid #e9e9e9;
        }

        img {
          display: block;
          width: 120px;
          margin: 0 auto;
        }

        .item-message {
          text-align: center;
          font-size: 14px;
          padding: 10px 0;

          .text {
            color: #222333;
          }

          .num {
            color: @primary;
          }
        }
      }
    }
  }
</style>