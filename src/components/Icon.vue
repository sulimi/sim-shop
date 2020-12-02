<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#icon-'+name"></use>
  </svg>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Icon extends Vue {
    @Prop() name!: string;
  }
</script>

<style lang="less" scoped>
  .icon{
    width: 1em;
    height: 1em;
  }
</style>