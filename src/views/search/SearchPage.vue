<template>
  <div class="product-wrapper">
    <div class="product-header">
      <SearchPageHead/>
      <van-tabs type="card" color="#1baeae" @click="changeTab">
        <van-tab title="推荐" name=""/>
        <van-tab title="新品" name="new"/>
        <van-tab title="价格" name="price"/>
      </van-tabs>
    </div>
    <SearchPageList @refresh="$store.commit('onRefresh')"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import SearchPageHead from '@/views/search/SearchPageHead.vue';
  import SearchPageList from '@/views/search/SearchPageList.vue';

  @Component({
    components: {SearchPageList, SearchPageHead}
  })
  export default class SearchPage extends Vue {
    created() {
      const {categoryName}=this.$route.query
      const initKeyword=categoryName?categoryName:'手机'
      this.$store.commit('changeKeyword', initKeyword);
      this.$store.commit('onRefresh')
      this.$store.dispatch('init')
    }

    changeTab(name: string, title: string) {
      this.$store.state.orderBy = name;
      this.$store.commit('onRefresh');
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin.less";

  .product-header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: #fff;
  }
</style>