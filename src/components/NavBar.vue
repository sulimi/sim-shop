<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <router-link tag="li" class="nav-list-item" active-class="active" to="/home">
        <Icon name="home"/>
        <span>首页</span></router-link>
      <router-link tag="li" class="nav-list-item" active-class="active" to="/category">
        <Icon name="category"/>
        <span>分类</span></router-link>
      <router-link tag="li" class="nav-list-item cart-wrap" active-class="active" to="/cart">
        <div class="cart-count" v-if="$store.state.cartCount>0">{{$store.state.cartCount}}</div>
        <Icon name="cart"/>
        <span>购物车</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" active-class="active" to="/user">
        <Icon name="user"/>
        <span>我的</span></router-link>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon}
  })
  export default class HelloWorld extends Vue {
  }
</script>
<style scoped lang="less">
  @import "~@/assets/style/mixin";

  .nav-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 5px 0;
    background: #fff;

    .nav-list {
      .fjbt();

      .nav-list-item {
        .fjcc(column);
        /*width: 33.33%;*/
        /*margin: 0 auto;*/
        /*flex-grow: 1;*//*四个效果一样*/
        flex: 1;

        .icon {
          width: 2em;
          height: 2em;
          fill: #aaa;
        }

        &.active {
          color: @primary;

          .icon {
            fill: @primary;
          }
        }

        span {
          font-size: 12px;
          padding-top: 2px;
        }

        &.cart-wrap {
          position: relative;

          .cart-count {
            position: absolute;
            background: red;
            color: #fff;
            top: -2px;
            right: 15%;
            padding: 0 4px;
            text-align: left;
            max-width: 100%;
            .ellipsisSingle;
            border-radius: 20px;
            font-weight: bold;
          }

        }
      }
    }
  }
</style>
