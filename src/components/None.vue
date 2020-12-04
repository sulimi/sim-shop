<template>
  <div class="none">
    <slot/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class None extends Vue {

  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin";
.none{
  width: 100%;
  .fjcc();
  color: #aaa;
  font-size: 12px;
  padding: 16px;
}
</style>