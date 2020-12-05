<template>
  <div class="cart-wrapper">
    <ItemHeader title="购物车" icon-right="more"/>
    <div class="cart-content">
      <van-checkbox-group v-model="checkArr" @change="checkItemFun" ref="checkboxGroup">
        <van-swipe-cell :right-width="50" v-for="(item, index) in list" :key="index"><!--van-swipe-cell可以右滑删除按钮-->
          <div class="good-item">
            <van-checkbox :name="item.cartItemId"/><!--选择按钮-->
            <div class="good-img">
              <img :src="prefix(item.goodsCoverImg)" alt="">
            </div>
            <div class="good-text">
              <div class="good-title">
                <span>{{ item.goodsName }}</span>
                <span>x{{ item.goodsCount }}</span>
              </div>
              <div class="good-btn">
                <div class="money">¥{{ item.sellingPrice }}</div>
                <!--商品+1-1按钮 vant进步器-->
                <van-stepper
                  integer
                  :min="1"
                  :value="item.goodsCount"
                  :name="item.cartItemId"
                  async-change
                  @change="onChange"
                />
              </div>
            </div>
          </div>
          <template #right>
            <van-button
              slot="right"
              square
              icon="delete"
              type="danger"
              class="delete-button"
              @click="deleteGood(item.cartItemId)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
      <!--      <van-button type="info" @click="toggleAll" v-model="checkAll">全选</van-button>-->
    </div>
    <van-submit-bar :price="9999999999" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkAll" @click="toggleAll">全选</van-checkbox>
      <!--      <template #tip>-->
      <!--        你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>-->
      <!--      </template>-->
    </van-submit-bar>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import {Toast} from 'vant';
  import {deleteCartItem, getCart} from '@/service/cart';

  @Component({
    components: {ItemHeader}
  })
  export default class Cart extends Vue {
    list = []; // 购物车商品列表
    checkArr = [];// 购物车商品的 id 数组，用于多选
    checkAll = false;

    mounted() {
      this.init();
    }


    async init() {
      // 加载中禁止点击
      Toast.loading({message: '加载中...', forbidClick: true});
      // 获取购物车商品数据
      const {data} = await getCart({pageNumber: 1});
      this.list = data;
      Toast.clear();
    }

    //进步器的异步触发方法
    onChange(value: any, clickItem: { name: number }) {
      //value是按钮显示的值，clickItem是整个按钮的信息
      // 注意此时修改 value 后会再次触发 change 事件
      //解决二次触发：
      if ((this.list.filter(i => (i as any).cartItemId === clickItem.name)[0] as any).goodsCount === value) return;
      Toast.loading({forbidClick: true});
      setTimeout(() => {
        Toast.clear();
        this.list.forEach(i => {
          if (clickItem.name === (i as any).cartItemId) {
            (i as any).goodsCount = value;
          }
        });
      }, 500);
    }

    //复选框
    checkItemFun(id: number) {
      //牛逼!它会把选中的商品的id加到数组里
      if (this.checkArr.length === this.list.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    }

    toggleAll() {
      if (this.checkArr.length !== this.list.length) {
        (this.$refs.checkboxGroup as any).toggleAll(true);
      } else {
        (this.$refs.checkboxGroup as any).toggleAll();
      }
    }
    async deleteGood(id: number){
      const { data } = await deleteCartItem(id)
      this.$store.dispatch('updateCart')
      this.init()
    }
    //订单提交
    onSubmit() {
      console.log(1);
    }

    onClickEditAddress() {
      console.log(1);
    }

  }
</script>
<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";

  .cart-wrapper {
    .cart-content {
      margin: 50px 0 100px 0;
      padding-left: 10px;

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

      .delete-button {
        width: 50px;
        height: 100%;
      }
    }

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
          > span{
            &:nth-child(1) {
              flex-grow: 1;
              flex-shrink: 0;
            }
            &:nth-child(2) {

              max-width: 90%;
              .fjcc();
              justify-content: flex-start;
              overflow: hidden;
              .van-submit-bar__price--integer{
                flex-grow: 1;
                .ellipsisSingle;
              }
            }
          }
        }
      }
    }
  }
</style>