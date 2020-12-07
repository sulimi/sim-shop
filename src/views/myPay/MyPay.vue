<template>
  <div class="my-pay">
    <ItemHeader title="我的订单" icon-right="more" router-name="user"/>
    <van-tabs @change="onChangeTab" :color="'#1baeae'" :title-active-color="'#1baeae'" class="pay-tab"
              v-model="type">
      <van-tab title="全部" name=''></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="已付款" name="1"></van-tab>
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
        <div class="pay-list" v-for="(item,index) in list" :key="index" @click="goToDetail(item.orderNo)">
          <div class="item-header">
            <span>订单时间：{{item.createTime}}</span>
            <span>{{typeFun(item)}}</span>
          </div>
          <VanCardItem :list="item.newBeeMallOrderItemVOS"/>
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
  import VanCardItem from '@/views/myPay/VanCardItem.vue';

  @Component({
    components: {VanCardItem, ItemHeader}
  })
  export default class MyPay extends Vue {
    type = ''; //查看账单状态类型,默认是全部查看
    loading = false;
    finished = false;
    refreshing = false;
    list = [];
    page = 1;
    totalPage = 1;

    mounted() {
      this.loadData();
    }

    // get cancelPay(){
    //   return [...JSON.parse(window.localStorage.getItem('noPayArr') || '[]')].indexOf()
    // }

    async loadData() {
      // 获取订单列表
      //page是要传给后台第几页的订单数据，默认从第一页开始
      const {data, data: {list}} = await getOrderList({pageNumber: this.page, status: this.type});
      this.list = this.list.concat(list);
      this.totalPage = data.totalPage;
      this.loading = false;
      if (this.page >= data.totalPage) this.finished = true;
    }

    onChangeTab(name: string) {
      this.type = name;
      //切换一次就要刷新
      this.onRefresh();
    }

    onRefresh() {
      this.refreshing = true;
      this.finished = false;
      this.loading = true;
      this.page = 1;
      //加载
      this.onLoad();
    }

    onLoad() {
      if (!this.refreshing && this.page < this.totalPage) {
        this.page = this.page + 1;
      }
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      this.loadData();
    }
    typeFun(item: any){
      const noPayArr=[...JSON.parse(window.localStorage.getItem('noPayArr') || '[]')]
      if (noPayArr.indexOf(item.orderNo)>=0){
        return '订单已取消'
      }
      return item.orderStatusString
    }
    goToDetail(value: number) {
      this.$router.push(`/paydetail?id=${value}`);
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin";

  .my-pay {
    background: #f9f9f9;
    height: 100vh;

    .pay-tab {
      background-color: #fff;
      position: fixed;
      margin-top: 39px;
      left: 0;
      z-index: 1000;
      width: 100%;
    }

    .pay-list-wrapper {


      .van-pull-refresh__track {
        .van-list {
          margin-top: 100px;
          background: #f9f9f9;

          .pay-list {
            background-color: #fff;
            margin: 20px 10px;

            .item-header {
              .fjbt();
              padding: 10px 10px 4px 10px;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>