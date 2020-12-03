<template>
  <div class="category-wrapper">
    <ItemHeader>
      <SearchOne>
        <Icon name="search"/>
        <span>全场50元起步</span>
      </SearchOne>
    </ItemHeader>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import SearchOne from '@/components/SearchOne.vue';
  import Icon from '@/components/Icon.vue';
  import {getCategory} from '@/service/category';

  @Component({
    components: {Icon, SearchOne, ItemHeader}
  })
  export default class Category extends Vue {
    categoryList = [];

    async mounted() {
      const {data} = await getCategory();
      this.categoryList = data;
    }
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