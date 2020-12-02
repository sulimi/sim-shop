<template>
  <div class="cart-wrapper">
    <ItemHeader title="购物车"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  @Component({
    components: {ItemHeader}
  })
  export default class Cart extends Vue {

  }
</script>

<style lang="scss" scoped>

</style>