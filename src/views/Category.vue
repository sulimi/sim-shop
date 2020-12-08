<template>
  <div class="category-wrapper">
    <ItemHeader router-name="/">
      <SearchOne>
        <Icon name="search"/>
        <span>全场50元起步</span>
      </SearchOne>
    </ItemHeader>


    <!--    滑动-->

    <main ref="categorycontent" class="category-content">
      <div class="menu-list">
        <ul>
          <li v-for="item in categoryList" :key="item.categoryId"
              :class="{'active' : clickIndexId === item.categoryId}"
              @click="onClickMenu(item.categoryId)"
              @touchstart="onClickMenu(item.categoryId)"
          >
            {{item.categoryName}}
          </li>
        </ul>
      </div>
      <div class="category-list">
        <div class="list-wrapper">
          <div class="list-item-wrapper" v-for="item in categoryList" :key="item.categoryId">
            <div class="list-item" v-for="i in item.secondLevelCategoryVOS" :key="i.categoryId">
              <template v-if="clickIndexId===i.parentId">
                <div class="item-title">{{i.categoryName}}</div>
                <div class="item">
                  <div class="i" v-for="ii in i.thirdLevelCategoryVOS" :key="ii.categoryId" @click="goTo(ii)">
                    <Icon name="todo"/>
                    <span>{{ii.categoryName}}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
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
      const heightV = document.documentElement.clientHeight - 100;
      // (this.$refs.categorycontent as any).setAttribute('style', `height:${heightV}px`);
      (this.$refs.categorycontent as any).style.height = heightV + 'px';
    }


    onClickMenu(id: number) {
      this.clickIndexId = id;
    }

    goTo(ii: any) {
      this.$router.push(`/searchpage?categoryName=${ii.categoryName}`);
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

    .category-content {
      margin-top: 40px;
      display: flex;
      height: 100%;
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .menu-list {
        background: #F8F8F8;
        width: 30%;
        height: 100%;
        overflow: auto;
        flex-shrink: 0;

        &::-webkit-scrollbar {
          display: none;
        }

        ul {
          &::-webkit-scrollbar {
            display: none;
          }

          width: 100%;
          background: #F8F8F8;

          li {
            width: 100%;
            height: 56px;
            text-align: center;
            line-height: 56px;
            font-size: 14px;
            cursor: pointer;
            transition: all 80ms;

            &.active {
              color: @primary;
              background: #fff;
              font-size: 15px;
              font-weight: bold;
            }
          }
        }
      }

      .category-list {
        background: #fff;
        flex-grow: 1;
        padding: 0 10px;
        height: 100%;
        overflow: auto;

        &::-webkit-scrollbar {
          display: none;
        }

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