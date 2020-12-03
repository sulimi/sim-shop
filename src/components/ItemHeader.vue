<template>
  <header class="item-header header" @click="backFun">
    <div class="btn-icon">
      <Icon name="left" @click="backFun" @touchstart="backFun"/>
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
      this.$router.push({path: this.routerName});
      console.log(1);
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/header";

  .item-header {
    .header;
  }
</style>