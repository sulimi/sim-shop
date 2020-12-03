<template>
  <div class="category-wrapper">
    <ItemHeader>
      <SearchOne>
        <Icon name="search"/>
        <span>全场50元起步</span>
      </SearchOne>
    </ItemHeader>

    <!--    滑动-->
    <ListScroll>
      <ul>
        <li v-for="item in categoryList" :key="item.categoryId"
            :class="{'active' : clickIndexId === item.categoryId}"
            @click="onClickMenu(item.categoryId)"
            @touchstart="onClickMenu(item.categoryId)"
        >
          {{item.categoryName}}
        </li>
      </ul>
    </ListScroll>

  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import ItemHeader from '@/components/ItemHeader.vue';
  import SearchOne from '@/components/SearchOne.vue';
  import Icon from '@/components/Icon.vue';
  import {getCategory} from '@/service/category';
  import ListScroll from '@/components/ListScroll.vue';

  @Component({
    components: {ListScroll, Icon, SearchOne, ItemHeader}
  })
  export default class Category extends Vue {
    categoryList = [];
    clickIndexId = 15;

    async mounted() {
      const {data} = await getCategory();
      this.categoryList = data;
    }

    onClickMenu(id: number) {
      this.clickIndexId = id;
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/style/mixin";

  .category-wrapper {
    ::v-deep.item-header {
      .center-header {
        background: #F7F7F7;
      }
    }

    .scroll-wrapper {
      margin-top: 40px;
      background: #F8F8F8;
      width: 28%;
      height: 100%;
      overflow: hidden;

      ul {
        width: 100%;
        background: #F8F8F8;

        li {
          width: 100%;
          height: 56px;
          text-align: center;
          line-height: 56px;
          font-size: 14px;

          &.active {
            color: @primary;
            background: #fff;
          }
        }
      }
    }
  }
</style>