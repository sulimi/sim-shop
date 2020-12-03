<template>
  <header class="home-header">
    <router-link class="header-btn" to="/category">
      <Icon name="show"/>
    </router-link>
    <SearchOne>
      <slot/>
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

    .header-btn {
      color: @primary;

      .icon {
        fill: @primary;
      }
    }
  }
</style>