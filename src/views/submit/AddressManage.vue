<template>
  <div class="address-manage-wrapper">
    <ItemHeader icon-right="more" title="地址管理"/>
    <div class="address-item">
新增地址
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';

  @Component({
    components: {ItemHeader}
  })
  export default class AddressManage extends Vue {

  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";
  .address-item {
    margin-top: 40px;

  }
</style>