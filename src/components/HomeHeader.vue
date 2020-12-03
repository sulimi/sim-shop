<template>
  <header class="home-header">
    <router-link class="header-btn" to="/category">
      <Icon name="show"/>
    </router-link>
    <div class="center-header">
      <slot/>
    </div>
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

  @Component({
    components: {Icon}
  })
  export default class HomeHeader extends Vue {
    @Prop() isLogin!: boolean;
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/header";
  .home-header {
    .header;
    border-bottom: none;
    .wh(100%, 50px);
    background: transparent;
    .center-header {
      .wh(74%, 80%);
      .fjbt(row, flex-start);
      margin: 10px 0;
      color: #232326;
      background: rgba(255, 255, 255, .7);
      border-radius: 20px;
    }
    .header-btn {
      color: @primary;

      .icon {
        fill: @primary;
      }
    }
  }
</style>