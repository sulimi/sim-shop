<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <router-link tag="li" class="nav-list-item" to="home">
        <Icon name="home"/>
        <span>首页</span></router-link>
      <router-link tag="li" class="nav-list-item" to="category">
        <Icon name="category"/>
        <span>分类</span></router-link>
      <router-link tag="li" class="nav-list-item" to="cart">
        <Icon name="cart"/>
        <span>购物车</span></router-link>
      <router-link tag="li" class="nav-list-item" to="user">
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
  @import "../common/style/mixin";

  .nav-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 5px 0;
    background: #fff;

    .nav-list {
      border: 1px solid red;
      .fjbt();

      .nav-list-item {
        .fjcc(column);
        /*width: 33.33%;*/
        /*margin: 0 auto;*/
        flex:1;
        /*flex-grow: 1;*/
        .icon {
          width: 2em;
          height: 2em;
        }

        &.active {
          color: @primary;
          .icon{
            fill:@primary;
          }
        }

        span {
          font-size: 12px;
          padding-top: 2px;
        }

      }
    }
  }
</style>
