<template>
  <header class="item-header header">
    <div class="btn-icon" @click="backFun">
      <Icon name="left"/>
    </div>
    <div class="item-header-title" v-if="title">{{title}}</div>
    <slot v-else/>
    <div class="btn-icon" @click="onClickIcon">
      <Icon :name="iconRight" />
    </div>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';
  import {Toast} from 'vant';

  @Component({
    components: {Icon}
  })
  export default class ItemHeader extends Vue {
    @Prop() title!: string;
    @Prop() iconRight!: string;
    @Prop() routerName!: string;
    onClickIcon() {
      Toast.setDefaultOptions({ duration: 500 });
      Toast('未开发');
    }
    backFun() {
      if (!this.routerName){
        this.$router.go(-1)
      }
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