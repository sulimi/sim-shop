<template>
  <header class="item-header header">
    <Icon name="left" @click="backFun"/>
    <div class="item-header-title" v-if="title">{{title}}</div>
    <slot v-else/>
    <Icon name="more"/>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon}
  })
  export default class ItemHeader extends Vue {
    @Prop() title!: string;

    backFun() {
      this.$router.go(-1);
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/header";

  .item-header {
    .header
  }
</style>