<template>
  <header class="home-header">
    <router-link to="/category">
      <Icon name="show"/>
    </router-link>
    <slot/>
    <router-link to="/user">
      <Icon name="user"/>
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
  @import "~@/common/style/header";

  .home-header {
    .header
  }
</style>