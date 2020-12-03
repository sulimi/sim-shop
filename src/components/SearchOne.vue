<template>
  <div class="center-header">
    <slot/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class SearchOne extends Vue {

  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/header.less";
  .center-header {
    .wh(74%, 70%);
    .fjbt(row, flex-start);
    margin: 10px 0;
    background: rgba(255, 255, 255, .7);
    border-radius: 20px;
    font-size: 12px;
    color: #666;
    padding: 0 10px;
  }
</style>