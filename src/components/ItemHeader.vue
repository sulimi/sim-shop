<template>
  <header class="item-header header">
    <div class="btn-icon" @click="backFun">
      <Icon name="left"/>
    </div>
    <div class="item-header-title" v-if="title">{{title}}</div>
    <slot v-else/>
    <div class="btn-icon">
      <Icon :name="iconRight"/>
    </div>
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
    @Prop() iconRight!: string;
    @Prop() routerName!: string;

    backFun() {
      if (!this.routerName) return
      this.$router.push({path: this.routerName});
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/header";

  .item-header {
    .header;
  }
</style>