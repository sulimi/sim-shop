<template>
  <header class="home-header">
    <router-link class="header-btn" to="/category">
      <Icon name="show"/>
    </router-link>
    <SearchOne>
      <span class="shop-name">XX商城</span>
      <span class="border"> | </span>
      <router-link class="text-search" tag="span" to="/category">屯年货啦！</router-link>
    </SearchOne>
    <router-link class="header-btn" to="/user">
      <Icon name="user" v-if="isLogin"/>
      <span v-else>登录</span>
    </router-link>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';
  import SearchOne from '@/components/SearchOne.vue';

  @Component({
    components: {SearchOne, Icon}
  })
  export default class HomeHeader extends Vue {
    @Prop() isLogin!: boolean;
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/header.less";

  .home-header {
    .header;
    border-bottom: none;
    .wh(100%, 50px);
    background: transparent;

    .shop-name {
      display: inline-block;
      padding-right: 6px;
      color: @primary;
      font-size: 20px;
      font-weight: bold;
    }

    .border {
      display: inline-block;
      font-size: 20px;
      color: #999;
      margin-bottom: 2px;
    }

    .text-search {
      padding-left: 10px;
    }

    .header-btn {
      color: @primary;

      .icon {
        fill: @primary;
      }
    }
  }
</style>