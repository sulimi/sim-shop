<template>
  <div>
    <van-card
      v-for="(i, index) in list"
      :key="index"
      :num="i.goodsCount"
      :price="i.sellingPrice"
      desc="全场包邮"
      :title="i.goodsName"
      :thumb="prefix(i.goodsCoverImg)"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class VanCardItem extends Vue {
    @Prop() list: any;
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin";

  .van-card {
    background-color: #fff;

    .van-card__header {

      .van-card__content {
        div {
          text-align: left;

          .van-card__title {
            font-size: 14px;
          }

          .van-ellipsis {
            font-size: 12px;
            padding-top: 4px;
          }
        }

        .van-card__bottom {
          .fjbt();

          .van-card__price {
            color: red;
          }
        }
      }
    }
  }
</style>