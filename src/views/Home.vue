<template>
  <div class="home-wrapper">
    <HomeHeader>
      <span class="shop-name">XX商城</span>
      <span class="border"> | </span>
      <router-link class="text-search" tag="span" to="/">屯年货啦！</router-link>
    </HomeHeader>
    <main>
      <router-link to="/login">登录</router-link>
    </main>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import HomeHeader from '@/components/HomeHeader.vue';

  @Component({
    components: {
      HomeHeader
    },
  })
  export default class Home extends Vue {
  }
</script>
<style lang="less" scoped>
  @import "~@/assets/style/header";

  .home-wrapper {
    ::v-deep.home-header {
      .center-header {
        .shop-name {
          display: inline-block;
          padding: 0 6px 0 10px;
          color: @primary;
          font-size: 20px;
          font-weight: bold;
        }

        .border {
          display: inline-block;
          font-size: 20px;
          color: #999;
          margin-bottom: 2px;
        }

        .text-search {
          font-size: 12px;
          color: #666;
          line-height: 21px;
          padding-left: 10px;
        }
      }
    }

    main {
      margin-top: 100px;
    }
  }
</style>
