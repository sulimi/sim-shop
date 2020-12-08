<template>
  <div class="cart-wrapper">
    <ItemHeader title="购物车" icon-right="more"/>
    <div class="cart-content">
      <van-checkbox-group v-model="checkIdArr" @change="checkItemFun" ref="checkboxGroup">
        <van-swipe-cell :right-width="50" v-for="(item, index) in list"
                        :key="index"><!--van-swipe-cell可以右滑删除按钮-->
          <CartGoodItem :itemObj="{item,list,init}"/>
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


    <SubmitBtn v-if="list.length" :checkObj="{checkAll,checkItemArr,checkIdArr,list,$refs}"/>
    <CartEmpty v-else/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import {Toast} from 'vant';
  import {deleteCartItem, getCart} from '@/service/cart';
  import CartEmpty from '@/views/cart/CartEmpty.vue';
  import SubmitBtn from '@/views/cart/SubmitBtn.vue';
  import CartGoodItem from '@/views/cart/CartGoodItem.vue';
  import {setLocal} from '@/assets/ts/utils';

  @Component({
    components: {CartGoodItem, SubmitBtn, CartEmpty, ItemHeader}
  })
  export default class Cart extends Vue {
    list = []; // 购物车商品列表
    checkIdArr = [];// 购物车商品的 id 数组，用于多选
    checkAll = false;

    mounted() {
      this.init();
      setLocal('checkIdArr', '');
    }


    async init() {
      // 加载中禁止点击
      Toast.loading({message: '加载中...', forbidClick: true});
      // 获取购物车商品数据
      try {
        const {data} = await getCart({pageNumber: 1});
        this.list = data.reverse();
        this.$store.state.cartCount = this.list.length;
        this.$store.commit('saveCartCount');
      } catch (e) {
        return;
      }
      Toast.clear();
    }


    get checkItemArr() {
      return this.list.filter(i => (this.checkIdArr as any).includes((i as any).cartItemId));
    }

    checkItemFun(arr: any) {
      //牛逼!它会把选中的商品的id加到数组里!
      this.checkAll = this.checkIdArr.length === this.list.length;
    }

    async deleteGood(id: number) {
      const {data} = await deleteCartItem(id);
      await this.$store.dispatch('updateCart');
      await this.init();
    }
  }
</script>
<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";

  .cart-wrapper {
    .cart-content {
      margin: 50px 0 100px 0;
      padding-left: 10px;

      .delete-button {
        width: 50px;
        height: 100%;
      }
    }
  }
</style>