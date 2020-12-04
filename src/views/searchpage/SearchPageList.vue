<template>
  <van-pull-refresh v-model="$store.state.searchRefreshing" class="search-list-refresh">
    {{$store.state.searchResult.length}}
    <van-list
      v-model="$store.state.searchLoading"
      :finished="$store.state.searchFinished"
      finished-text="没有更多了"
      @load="$store.commit('onLoad')"
      @offset="300"
    >
      <div class="list-item" v-for="(item,index) in $store.state.searchResult" :key="index"
           @click="productDetail(item)">
        <img :src="prefix(item.goodsCoverImg)" alt=""/>
        <div class="item-text">
          <p class="item-name"><span>{{item.goodsName}}</span></p>
          <p class="subtitle">{{item.goodsIntro}}</p>
          <span class="price">￥ {{item.sellingPrice}}</span>
        </div>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class SearchPageList extends Vue {
    @Prop() keyword!: string;

    productDetail(item: any) {
      this.$router.push({path: `product/${item.goodsId}`});
    }

  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin";

  .search-list-refresh {
    margin-top: 80px;

    .list-item {
      .fjbt();
      width: 100%;
      height: 160px;
      padding: 10px 0;
      border-bottom: 1px solid #dcdcdc;

      img {
        width: 140px;
        padding: 10px;
      }

      .item-text {
        width: 56%;
        height: 120px;
        padding: 5px;
        text-align: left;

        .item-name {
          width: 100%;
          color: #333;
          .ellipsisSingle
        }

        .subtitle {
          width: 100%;
          font-size: 13px;
          color: #999;
          overflow: hidden;
        }

        .price {
          color: @primary;
          font-size: 16px;
        }
      }
    }
  }
</style>