<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="router-view"/>
    </transition>
    <nav-bar v-if="isShowNav"/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import NavBar from '@/components/NavBar.vue';
  import {Route} from 'vue-router/types/router';

  @Component({
    components: {NavBar}
  })
  export default class App extends Vue {
    routeList = ['/', '/home', '/category', '/cart', '/user'];
    transitionName = 'slide-left';
    @Watch('$route', {immediate: false, deep: true})
    onRouteChange(newVal: Route, oldVal: Route) {
      // 有主级到次级
      if (newVal.meta.index > oldVal.meta.index) {
        this.transitionName = 'slide-left'; // 向左滑动
      } else if (newVal.meta.index < oldVal.meta.index) {
        // 由次级到主级
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = '';   //同级无过渡效果
      }
    }

    get isShowNav(){
      return this.routeList.indexOf(this.$route.path) > -1;
    }
  }
</script>

<style lang="less">
  @import "~@/assets/style/mixin";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 14px;

    .router-view{
      width: 100%;
      height: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: 0 auto;
      -webkit-overflow-scrolling: touch;//这是？
    }

    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active{
      height: 100%;
      will-change: transform;
      transition: all 500ms;
      position: absolute;
      backface-visibility: hidden;
    }
    .slide-right-enter{
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
    .slide-right-leave-active{
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    .slide-left-enter{
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    .slide-left-leave-active{
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
  }
</style>