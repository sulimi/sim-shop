<template>
  <header class="item-header header">
    <div class="btn-icon" @click="backFun">
      <Icon :name="leftIcon"/>
    </div>
    <div class="item-header-title" v-if="title">{{title}}</div>
    <slot v-else/>
    <div class="btn-icon" @click="onClickIcon">
      <Icon :name="iconRight"/>
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
    n = 0;

    get leftIcon() {
      return this.title === '购物车' || this.title === '我的' ? '' : 'left';
    }

    onClickIcon() {
      Toast.setDefaultOptions({duration: 500});
      Toast('未开发');
    }

    backFun() {

      if (!this.leftIcon) return;
      if (!this.routerName) {
        this.$router.go(-1);
      } else {
        this.$router.push({path: this.routerName});
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/header";

  .item-header {
    .header;
  }
</style>