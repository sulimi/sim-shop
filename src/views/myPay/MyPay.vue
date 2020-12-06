<template>
  <div class="my-pay">
    <ItemHeader title="我的订单" icon-right="more" router-name="user"/>
    <van-tabs @change="onChangeTab" :color="'#1baeae'" :title-active-color="'#1baeae'" class="pay-tab"
              v-model="status">
      <van-tab title="全部" name=''></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="待确认" name="1"></van-tab>
      <van-tab title="待发货" name="2"></van-tab>
      <van-tab title="已发货" name="3"></van-tab>
      <van-tab title="交易完成" name="4"></van-tab>
    </van-tabs>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功" class="pay-list-wrapper">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        @offset="300"
      >
        <div class="pay-list" v-for="item in list" :key="item.createTime">
          <div class="item-header">
            <span>订单时间：{{item.createTime}}</span>
            <span>{{item.orderStatusString}}</span>
          </div>
          <van-card
            v-for="(i, index) in item.newBeeMallOrderItemVOS"
            :key="index"
            :num="i.goodsCount"
            :price="i.sellingPrice"
            desc="全场包邮"
            :title="i.goodsName"
            :thumb="prefix(i.goodsCoverImg)"
          />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import {Toast} from 'vant';
  import {getOrderDetail, getOrderList} from '@/service/submit';

  @Component({
    components: {ItemHeader}
  })
  export default class MyPay extends Vue {
    status = '';
    loading = false;
    finished = false;
    refreshing = false;
    list = [];
    page = 1;

    mounted() {
      this.loadData();
    }

    async loadData() {
      // 获取订单列表
      //page是要传给后台第几页的订单数据，默认从第一页开始
      const {data, data: {list}} = await getOrderList({pageNumber: this.page, status: this.status});
      this.list = this.list.concat(list);
      console.log(this.list);

      // this.totalPage = data.totalPage
      // this.loading = false;
      // if (this.page >= data.totalPage) this.finished = true
    }

    onChangeTab() {
      //
    }

    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.refreshing = false;
      }, 1000);
    }

    onLoad() {
      //
      this.loading = false;
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin";

  .my-pay {
    margin-top: 40px;

    .pay-list-wrapper {
      background: #f9f9f9;

      .van-pull-refresh__track {
        .van-list {
          margin-top: -10px;
          background: #f9f9f9;

          .pay-list {
            background-color: #fff;
            margin: 20px 10px;

            .item-header {
              .fjbt();
              padding: 10px 10px 4px 10px;
              font-size: 12px;
            }

            .van-card {
              background-color: #fff;

              .van-card__header {

                .van-card__content {
                  div {
                    text-align: left;

                    .van-ellipsis {
                      font-size: 10px;
                      padding: 4px 0;
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
          }
        }
      }
    }
  }
</style>