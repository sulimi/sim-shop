<template>
  <div class="category-wrapper">
    <ItemHeader router-name="/home">
      <SearchOne>
        <Icon name="search"/>
        <span>全场50元起步</span>
      </SearchOne>
    </ItemHeader>

    <!--    滑动-->
    <main class="category-content">
      <ListScroll class="menu-list">
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
      <ListScroll class="category-list">
        <div class="list-wrapper">
          <div class="list-item-wrapper" v-for="item in categoryList" :key="item.categoryId">
            <div class="list-item" v-for="i in item.secondLevelCategoryVOS" :key="i.categoryId"
                 >
              <template v-if="clickIndexId===i.parentId">
                <div class="item-title">{{i.categoryName}}</div>
                <div class="item">
                  <router-link to="/" class="i" v-for="ii in i.thirdLevelCategoryVOS" :key="ii.categoryId">
                    <Icon name="todo"/>
                    <span>{{ii.categoryName}}</span>
                  </router-link>
                </div>
              </template>
            </div>
          </div>
        </div>
      </ListScroll>
    </main>

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
    border: 1px solid red;
    height: 100%;
    overflow: hidden;
    ::v-deep.item-header {
      .center-header {
        background: #F7F7F7;
      }
    }

    .category-content {
      border: 1px solid red;
      padding-top: 40px;
      display: flex;
      height: 100%;

      .menu-list {
        background: #F8F8F8;
        width: 28%;
        height: 100%;
        overflow: hidden;
        flex-shrink: 0;

        ul {
          width: 100%;
          background: #F8F8F8;

          li {
            width: 100%;
            height: 56px;
            text-align: center;
            line-height: 56px;
            font-size: 14px;
            cursor: pointer;

            &.active {
              color: @primary;
              background: #fff;
            }
          }
        }
      }

      .category-list {
        background: #fff;
        height: 100%;
        flex-grow: 1;
        padding: 0 10px;

        .list-wrapper {
          width: 100%;

          .list-item-wrapper {
            width: 100%;

            .list-item {
              .fjcc(column);

              .item-title {
                font-size: 17px;
                font-weight: 500;
                padding: 20px 0;
                width: 100%;
              }

              .item {
                display: flex;
                flex-wrap: wrap;
                width: 100%;

                .i {
                  .fjcc(column);
                  width: 33.3333%;
                  margin-bottom: 10px;
                  text-align: center;
                  font-size: 12px;

                  .icon {
                    .wh(30px, 30px);
                    fill: @primary;
                  }
                }
              }
            }
          }
        }
      }
    }

  }
</style>