<template>
  <div class="cart-wrapper">
    <ItemHeader title="购物车" icon-right="more"/>
    <div class="cart-content">
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
      </van-swipe-cell>


    </div>


  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import {Toast} from 'vant';
  import {getCart} from '@/service/cart';

  @Component({
    components: {ItemHeader}
  })
  export default class Cart extends Vue {
    list = []; // 购物车商品列表
    result = [];// 购物车商品的 id 数组
    mounted() {
      this.init();
    }

    async init() {
      // 加载中禁止点击
      Toast.loading({message: '加载中...', forbidClick: true});
      // 获取购物车商品数据
      const {data} = await getCart({pageNumber: 1});
      this.list = data;
      this.result = data.map((item: { cartItemId: number }) => item.cartItemId);
      Toast.clear();
    }

    //进步器的异步触发方法
    onChange(value: any, clickItem: {name: number}) {
      //value是按钮显示的值，clickItem是整个按钮的信息
      Toast.loading({ forbidClick: true });
      setTimeout(() => {
        Toast.clear();
        // 注意此时修改 value 后会再次触发 change 事件
        this.list.forEach(item => {
          if(clickItem.name=== (item as any).cartItemId){
            (item as any).goodsCount=value
          }
        })

      }, 500);
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";
.cart-wrapper{
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
}
</style>