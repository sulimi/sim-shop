<template>
  <div class="home-wrapper">
    <HomeHeader :class="{'active':headerScroll}" :is-login="isLogin"/>
<!--    <ListScroll>-->
      <main>
        <SwipeHome :swipeImgs="swipeImgs"/>
        <HomeNavList/>
        <HomeModule :moduleList="newGoodses" title="新品上线"/>
        <HomeModule :moduleList="hotGoodses" title="热门商品"/>
        <HomeModule :moduleList="recommendGoodses" title="最新推荐"/>
        <div class="bottom">到底啦~</div>
      </main>
<!--    </ListScroll>-->
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import HomeHeader from '@/views/home/HomeHeader.vue';
  import SwipeHome from '@/views/home/SwipeHome.vue';
  import {getLocal} from '@/assets/ts/utils';
  import {Toast} from 'vant';
  import {getHome} from '@/service/home';
  import HomeNavList from '@/views/home/HomeNavList.vue';
  import HomeModule from '@/views/home/HomeModule.vue';
  import ListScroll from '@/components/ListScroll.vue';
  import {getCart} from '@/service/cart';

  @Component({
    components: {
      ListScroll,
      HomeModule,
      HomeNavList,
      SwipeHome,
      HomeHeader
    },
  })
  export default class Home extends Vue {
    headerScroll = false;
    swipeImgs = [];
    newGoodses = [];
    hotGoodses = [];
    recommendGoodses = [];

    isLogin = false;

    async mounted() {
      window.addEventListener('scroll', this.pageScroll);
      const token = getLocal('token');//为什么要拿这个呢，又不是登录（哦，判断右上角是登录还是头像）
      if (token) {
       try {
         this.isLogin = true;
         const {data: list}=await getCart()
         this.$store.state.cartCount = list.length;
         this.$store.commit('saveCartCount');
       }catch (e) {
         Toast.fail(e.message)
       }
      }
      Toast.loading({
        message: '加载中',
        forbidClick: true
      });
      const {data} = await getHome({});
      const {carousels, newGoodses, hotGoodses, recommendGoodses} = data;
      this.swipeImgs = carousels;
      this.newGoodses = newGoodses;
      this.hotGoodses = hotGoodses;
      this.recommendGoodses = recommendGoodses;
      Toast.clear(); // 数据请求结束，清楚弹窗
    }


    pageScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop > 100 ? this.headerScroll = true : this.headerScroll = false;
    }
  }
</script>
<style lang="less" scoped>
  @import "~@/assets/style/header.less";

  .home-wrapper {
    ::v-deep.home-header {
      transition: all 1s;

      &.active {
        background: @primary;

        .header-btn {
          color: #fff;

          .icon {
            fill: #fff;
          }
        }
      }
    }

    main {
      margin-bottom: 80px;

      .bottom {
        font-size: 12px;
        color: #aaa;
        width: 100%;
        text-align: center;
        padding-top: 26px;
      }
    }
  }
</style>
