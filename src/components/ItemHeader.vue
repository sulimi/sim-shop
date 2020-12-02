<template>
  <header class="item-header">
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
  @import "~@/common/style/mixin";

  .item-header {
    position: fixed;
    top: 0;
    left: 0;
    .fjbt();
    .wh(100%, 40px);
    line-height: 40px;
    padding: 0 10px;
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;

    .icon {
      width: 1.1em;
      height: 1.1em;
    }
  }
</style>