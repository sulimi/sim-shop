<template>
  <div class="category-wrapper">
    <ItemHeader>
      <SearchOne>
        <Icon name="search"/>
        <span>全场50元起步</span>
      </SearchOne>
    </ItemHeader>
    <header class="category-header wrap">
      <i class="nbicon nbfanhui"></i>
      <div class="header-search">
        <i class="nbicon nbSearch"></i>
        <router-link tag="span" class="search-title" to="./product-list?from=category">全场50元起步</router-link>
      </div>
      <i class="nbicon nbmore"></i>
    </header>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import SearchOne from '@/components/SearchOne.vue';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon, SearchOne, ItemHeader}
  })
  export default class Category extends Vue {

  }
</script>

<style lang="less" scoped>
  .category-wrapper {
    ::v-deep.item-header {
      .center-header {
        background: #F7F7F7;
      }
    }
  }
</style>