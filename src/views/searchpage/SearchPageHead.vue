<template>
  <header class="search-header">
    <div class="icon-left" @click="goBack">
      <Icon name="left"/>
    </div>
    <div class="header-search">
      <Icon name="search"/>
      <input
        type="text"
        class="search-input"
        :value="$store.state.keyword"
        @input="onInputFun($event.target.value)"
      />
    </div>
    <span class="search-btn" @click="$store.commit('onRefresh')">搜索</span>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon}
  })
  export default class SearchPageHead extends Vue {
    onInputFun(value: string) {
      this.$store.commit('changeKeyword', value);
      this.$store.commit('onRefresh')
    }

    goBack() {
      this.$router.go(-1);
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin";

  .search-header {
    .fjbt();
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: #656771;
    z-index: 10000;

    .icon-left {
      height: 100%;
      .fjcc();

      .icon {
        margin: 0 20px 0 10px;
        fill: #666;
      }
    }

    .header-search {
      .fjbt();
      flex-grow: 1;
      /*width: 70%;*/
      height: 30px;
      line-height: 30px;
      color: #666;
      background: #F7F7F7;
      overflow: hidden;
      .borderRadius(20px);

      .icon {
        margin: 0 10px;
        fill: #666;
      }

      .search-input {
        flex-grow: 1;
        height: 100%;
        font-size: 12px;
        background: inherit;
      }
    }

    .search-btn {
      height: 28px;
      line-height: 28px;
      padding: 0 5px;
      color: #fff;
      background: @primary;
      .borderRadius(5px);
      margin-right: 16px;
      margin-left: 20px;
    }
  }
</style>