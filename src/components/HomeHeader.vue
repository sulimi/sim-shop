<template>
  <header class="home-header">
    <router-link to="/category">
      <Icon name="show"/>
    </router-link>
    <div class="center-header">
      <slot/>
    </div>
    <router-link to="/user">
      <Icon name="user"/>
      <!--      <span>登录</span>-->
    </router-link>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon}
  })
  export default class HomeHeader extends Vue {

  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/header";

  .home-header {
    .header;
    .center-header{
      .wh(74%, 80%);
      .fjbt(row,flex-start);
      margin: 10px 0;
      color: #232326;
      background: rgba(255, 255, 255, .7);
      border-radius: 20px;
    }
  }
</style>