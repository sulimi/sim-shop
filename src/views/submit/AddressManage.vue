<template>
  <div class="address-manage-wrapper">
    <ItemHeader icon-right="more" title="地址管理"/>
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

<style lang="scss" scoped>

</style>