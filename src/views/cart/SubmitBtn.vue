<template>
  <van-submit-bar :price="moneyCount*100"
                  button-text="提交订单" @submit="onSubmit">
    <van-checkbox v-model="checkObj.checkAll" @click="toggleAll">全选</van-checkbox>
    <!--      <template #tip>-->
    <!--        你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>-->
    <!--      </template>-->
  </van-submit-bar>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import {Toast} from 'vant';

  @Component
  export default class SubmitBtn extends Vue {
    @Prop() checkObj: any;

    get moneyCount() {
      return this.checkObj.checkItemArr.reduce((sum: any, item: any) => {
        return sum + (item as any).sellingPrice * (item as any).goodsCount;
      }, 0);
    }

    //订单提交
    onSubmit() {
      if (this.checkObj.checkIdArr.length === 0) {
        Toast.fail('请选择购买商品');
        return;
      }
      this.$router.push(`/submitpage?checkIdArr=${JSON.stringify(this.checkObj.checkIdArr)}`);
    }

    //全选
    toggleAll() {
      if (this.checkObj.checkIdArr.length !== this.checkObj.list.length) {
        (this.checkObj.$refs.checkboxGroup as any).toggleAll(true);
      } else {
        (this.checkObj.$refs.checkboxGroup as any).toggleAll();
      }
    }

    //地址
    onClickEditAddress() {
      // console.log(1);
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";

  .van-submit-bar {
    overflow: hidden;
    margin-bottom: 50px;

    .van-submit-bar__bar {
      display: flex;
      justify-content: space-between;

      .van-submit-bar__text {
        .fjcc();
        justify-content: flex-end;
        flex: 1;
        overflow: hidden;
        margin-left: 10px;

        > span {
          &:nth-child(1) {
            flex-grow: 1;
            flex-shrink: 0;
          }

          &:nth-child(2) {

            max-width: 90%;
            .fjcc();
            justify-content: flex-start;
            overflow: hidden;

            .van-submit-bar__price--integer {
              flex-grow: 1;
              .ellipsisSingle;
            }
          }
        }
      }
    }
  }
</style>